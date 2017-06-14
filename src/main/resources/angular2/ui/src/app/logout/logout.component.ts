import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SlickDataService } from '../slick-data/slick-data.service';

@Component({
  selector: 'slick-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private slickData: SlickDataService,
    private router: Router
  ) {}

  do() {
    this.slickData.disconnect();
    this.router.navigate(['login']);
  }
}
