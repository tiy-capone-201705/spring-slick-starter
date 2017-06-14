import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export interface Participant {
  id: string;
  name: string;
}

export interface Message {
  participantId: string;
  text: string;
  when: Date;
}

export interface NamedMessage extends Message {
  participantName: string;
}

export class SlickDataSubscriptions {
  constructor(private socket: SocketIOClient.Socket) {}

  get messages(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('chat message', ({ id, msg }) => {
        const message: Message = {
          participantId: id,
          text: msg,
          when: new Date()
        };
        observer.next(message);
      });
    });
  }

  get entrances(): Observable<Participant> {
    return new Observable<Participant>(observer => {
      this.socket.on('user joined', id => {
        const participant: Participant = {
          id,
          name: null
        };
        observer.next(participant);
      });
    });
  }

  get namings(): Observable<Participant> {
    return new Observable<Participant>(observer => {
      this.socket.on('user named', ({id, name}) => {
        const participant: Participant = {
          id,
          name
        };
        observer.next(participant);
      });
    });
  }

  get exits(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('user left', id => {
        observer.next(id);
      });
    });
  }
}

@Injectable()
export class SlickDataService {
  private socket: SocketIOClient.Socket;
  private name: string;

  get isConnected(): boolean {
    return this.socket && this.socket.connected;
  }

  connect(name: string, server: string): SlickDataSubscriptions {
    if (!this.socket) {
      this.socket = io.connect(server);
    }
    this.setName(name);
    return new SlickDataSubscriptions(this.socket);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  setName(name: string): void {
    this.name = name;
    if (this.socket) {
      this.socket.emit('user named', name);
    }
  }

  sendMessage(message: string): void {
    if (this.socket) {
      this.setName(this.name);
      this.socket.emit('chat message', message);
    }
  }

  subscriptions(): SlickDataSubscriptions {
    if (this.socket) {
      return new SlickDataSubscriptions(this.socket);
    }
  }
}
