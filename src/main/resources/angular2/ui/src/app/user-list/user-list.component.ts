import { Component, Input, OnInit } from '@angular/core';

import { SlickDataService, Participant } from '../slick-data/slick-data.service';

@Component({
  selector: 'slick-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input()
  users: Participant[];

  constructor(private dataService: SlickDataService) {}

  ngOnInit(): void {
    this.dataService
      .getInitialLoadOfParticipants()
      .then(participants => {
        console.log('participants: ', participants)
        this.users = participants
      });
  }
}
