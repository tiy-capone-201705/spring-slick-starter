import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { SlickDataService } from '../slick-data/slick-data.service';

@Component({
  selector: 'slick-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  server = 'http://slick.curtissimo.com:9000';
  name: string;
  error: string;

  constructor(private slickData: SlickDataService, private router: Router) {}

  do() {
    this.error = 'Connecting...';
    this.slickData.connect(this.name, this.server);
    setTimeout(() => {
      if (this.slickData.isConnected) {
        this.router.navigate([
          'messages',
          this.name,
          this.server
        ]);
      } else {
        this.error = 'Cannot connect to that server.';
      }
    }, 1000);
  }
}
