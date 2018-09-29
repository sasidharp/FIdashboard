import { Component } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public mod: number;
  public button_text = 'Toggle';
  public toggle: string;
  constructor(private router: Router, private route: ActivatedRoute) {
    const retrigger$ = interval(10000);
    retrigger$.subscribe(val => this.togglePage(val));
  }
  // Toggle to tabular
  togglePage(val) {
    if (this.toggle === 'X') {
      this.mod = val % 2;
      if (this.mod === 0) { this.router.navigate(['/hr']); } else { this.router.navigate(['/fi']); }
    }
  }
  noToggle() {
    if (this.toggle === 'X') {
      this.toggle = ' ';
      this.button_text = 'Toggle';
    } else {
      this.toggle = 'X';
      this.button_text = 'NoToggle';
    }
  }
}


