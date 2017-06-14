import { Component, Input } from '@angular/core';

import { Message } from '../slick-data/slick-data.service';

@Component({
  selector: 'slick-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  @Input()
  messages: Message[] = [];
}
