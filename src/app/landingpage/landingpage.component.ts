import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { Router, ParamMap } from '@angular/router';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }
  navigateHR(){
    this.router.navigate(['/hr']);
  }
  navigateFI(){
    this.router.navigate(['/fi']);
  }
}
