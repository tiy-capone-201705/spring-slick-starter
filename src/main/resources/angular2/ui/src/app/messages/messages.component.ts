import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NamedMessage, Participant, Message, SlickDataService, SlickDataSubscriptions } from '../slick-data/slick-data.service';

@Component({
  selector: 'slick-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  userName = '';
  server = '';
  users: Participant[] = [];
  messages: Message[] = [];

  constructor(
    private dataService: SlickDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userName = params.userName;
      this.server = params.server;

      let subscriptions: SlickDataSubscriptions;
      if (!this.dataService.isConnected) {
        subscriptions = this.dataService
          .connect(this.userName, this.server);
      } else {
        subscriptions = this.dataService.subscriptions();
      }

      subscriptions.entrances.subscribe(u => {
        this.users.push(u);
      });
      subscriptions.exits.subscribe(id => {
        const i = this.users.findIndex(u => u.id === id);
        if (i >= 0) {
          this.users.splice(i, 1);
        }
      });
      subscriptions.namings.subscribe(u => {
        const user = this.users.find(user => user.id === u.id);
        if (user) {
          user.name = u.name;
        } else {
          this.users.push(u);
        }
        for (let message of this.messages) {
          if (message.participantId === u.id) {
            (message as NamedMessage).participantName = u.name;
          }
        }
      });
      subscriptions.messages.subscribe(m => {
        console.log('got message');
        let user = this.users.find(user => user.id === m.participantId);
        if (!user) {
          user = { id: m.participantId, name: null };
          this.users.push(user);
        }
        (m as NamedMessage).participantName = user.name;
        this.messages.push(m);
      });
    });
  }

  sendMessage(message) {
    this.dataService.sendMessage(message);
  }
}
