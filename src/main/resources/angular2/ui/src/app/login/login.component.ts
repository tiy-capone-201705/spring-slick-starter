import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { SlickDataService } from '../slick-data/slick-data.service';

@Component({
  selector: 'slick-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  server = 'http://localhost:10000/ws';
  name: string;
  error: string;

  constructor(private slickData: SlickDataService, private router: Router) {}

  do() {
    this.error = 'Connecting...';
    console.log('this.name: ', this.name)
    console.log('this.server: ', this.server)
    this.slickData.connect(this.name, this.server)
      .then(() => {
        this.router.navigate([ //this is the $state.go
          'messages',
          this.name,
          this.server
        ]);
      })
      .catch(e => {
        console.log(e);
        this.error = 'Cannot connect to that server.';
      });
  }
}
