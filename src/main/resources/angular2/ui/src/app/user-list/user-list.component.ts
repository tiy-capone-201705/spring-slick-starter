import { Component, Input } from '@angular/core';

import { Participant } from '../slick-data/slick-data.service';

@Component({
  selector: 'slick-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Input()
  users: Participant[];
}
