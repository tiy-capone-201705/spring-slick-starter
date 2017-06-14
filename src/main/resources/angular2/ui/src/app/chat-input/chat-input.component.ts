import { Component, Output, Input, EventEmitter } from '@angular/core';

import { SlickDataService } from '../slick-data/slick-data.service';

@Component({
  selector: 'slick-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent {
  @Input("user-name")
  userName: string;

  @Output()
  messages = new EventEmitter<string>();

  message = '';

  do() {
    this.messages.emit(this.message);
    this.message = '';
  }
}
