import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public button_text = 'Tabular';
  constructor(private router: Router) {
    const retrigger$ = interval(30000);
    retrigger$.subscribe(val => this.toggleTabular());
  }
  // Toggle to tabular
  toggleTabular() {
    if (this.button_text === 'Chart') {
      this.button_text = 'Tabular';
      this.router.navigate(['/fi']);
    } else {
      this.button_text = 'Chart';
      this.router.navigate(['/hr']);
    }
  }
}

