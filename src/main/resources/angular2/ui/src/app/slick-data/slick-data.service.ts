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
      console.log('observer observer: ', observer)
      // console.log('id: ', id)
      // console.log('msg: ', msg)
      var headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      let subscription = this.stomp.subscribe('/topic/chats', (msg_body: string) => {
        console.log(`Received: ${msg_body}`);
        console.log('inside the message???')
        // console.log('id: ', id)
        // const msg = JSON.parse(msg_body);
        console.log('content: ')
        const msg = JSON.stringify(msg_body);
        console.log(typeof msg)
        console.log('msg.content: ', JSON.parse(JSON.parse(msg).body))
        const message: Message = {
          participantId: JSON.parse(JSON.parse(msg).body).author.nickName, //msg.author.nickName, //id,
          text: JSON.parse(JSON.parse(msg).body).content, //msg.content, //content,
          when: new Date()
        };
        console.log('message hey: ', message)
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
  
  getInitialLoadOfParticipants(): Promise<Participant[]> {
    return this.http
        .get('/api/active-users', {withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .then(list => list.map(o => ({ id: o.id, name: o.nickName })));
  }

  connect(name: string, server: string): Promise<SlickDataSubscriptions> {
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    console.log('name: ', name)
    console.log('server: ', server)

    return this.http
      .post('/login', `username=${name}&password=${name}`, {headers, withCredentials: true})
      .toPromise()
      .then(o => {
        console.log('here is a thing from the server:', o);
        if (!this.isStompConnected) {
          console.log('server: ', server)
          this.socket = new SockJS(server); // creates a new web socket that upgrades from an HTTP protocol
          this.stomp = Stomp.over(this.socket); // stomp client uses stomp server...connect to web server then make HTTP request to NginX = web server (similar to Apache)...socket is phone line that allows them to talk - I dial the number to call my friend makes ME Stomp and my friend is the Stomp Server

          return new Promise<SlickDataSubscriptions>((resolve, reject) => {
            this.stomp.connect({}, () => {
              this.isConnected = true;
              resolve(new SlickDataSubscriptions(this.stomp));
            }, () => {
              reject();
            });
          });
        }
        return new Promise<SlickDataSubscriptions>((resolve) => resolve(new SlickDataSubscriptions(this.stomp))); //promise that resolves to stomp new SlickDataSubscriptions(this.stomp);
      });

    // console.log('i am already connected....')
    // //with node version, we only needed to manage socket IO
    // //in java version, need to also manage stomp client

    // //TODO
    // // Need to integrate chatSubscribtion, joinSubscription, and departureSubscription from Curtis's

    // // this.setName(name); this is unnecessary because we no longer have emit BECAUSE security we will build will already know you
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  sendMessage(message: string): void {
    if (this.stomp) {
      console.log('message here you go: ', message)
      this.stomp.send('/api/chat', {}, message);
    }
  }

  subscriptions(): SlickDataSubscriptions {
    if (this.stomp) {
      return new SlickDataSubscriptions(this.stomp);
    }
  }
}
