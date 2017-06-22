import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// import * as io from 'socket.io-client';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

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
  constructor(private stomp: Stomp) {}

  get messages(): Observable<Message> {
    return new Observable<Message>(observer => {
      console.log('this.stomp: ', this.stomp)
      // console.log('id: ', id)
      // console.log('msg: ', msg)
      this.stomp.subscribe('/topic/chats', ({ id, msg }) => {
        console.log('inside the message???')
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
      this.stomp.subscribe('user joined', id => {
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
      this.stomp.subscribe('user named', ({id, name}) => {
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
      this.stomp.subscribe('user left', id => {
        observer.next(id);
      });
    });
  }
}

@Injectable()
export class SlickDataService {
  private socket: SockJS;
  private stomp: Stomp;
  private name: string;
  private isConnected: boolean;

  constructor(private http: Http) {}

  get isSockJsConnected(): boolean {
    return this.stomp && this.socket.readyState === SockJS.OPEN;
  }

  get isStompConnected(): boolean {
    return this.isConnected;
  }

  connect(name: string, server: string): Promise<SlickDataSubscriptions> {
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    console.log('name: ', name)
    console.log('server: ', server)
    return this.http
      .post(server, `username=${name}&password=${name}`, {headers, withCredentials: true})
      .map(response => {
        this.stomp = {};
        this.socket = { readyState : SockJS.OPEN };
        console.log('inside map!!!!! fuck yea')
        return new SlickDataSubscriptions(this.stomp);
      })
      .toPromise();

    // if (!this.isStompConnected) {
    //   console.log('server: ', server)
    //   this.socket = new SockJS(server); // creates a new web socket that upgrades from an HTTP protocol
    //   this.stomp = Stomp.over(this.socket); // stomp client uses stomp server...connect to web server then make HTTP request to NginX = web server (similar to Apache)...socket is phone line that allows them to talk - I dial the number to call my friend makes ME Stomp and my friend is the Stomp Server

    //   return new Promise((resolve, reject) => {
    //     this.stomp.connect({}, () => {
    //       this.isConnected = true;
    //       resolve(new SlickDataSubscriptions(this.stomp));
    //     }, () => {
    //       reject();
    //     });
    //   });
    // }

    // //with node version, we only needed to manage socket IO
    // //in java version, need to also manage stomp client

    // //TODO
    // // Need to integrate chatSubscribtion, joinSubscription, and departureSubscription from Curtis's

    // // this.setName(name); this is unnecessary because we no longer have emit BECAUSE security we will build will already know you
    // return new Promise((resolve) => resolve(new SlickDataSubscriptions(this.stomp))); //promise that resolves to stomp new SlickDataSubscriptions(this.stomp);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  sendMessage(message: string): void {
    if (this.stomp) {
      this.stomp.send('chat message', message);
    }
  }

  subscriptions(): SlickDataSubscriptions {
    if (this.stomp) {
      return new SlickDataSubscriptions(this.stomp);
    }
  }
}
