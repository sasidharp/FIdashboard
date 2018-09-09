import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public button_text = 'Tabular';
  constructor(private router: Router) {
  }
  // Toggle to tabular
  toggleTabular() {
    if (this.button_text === 'Chart') {
      this.button_text = 'Tabular';
      this.router.navigate(['/']);
    } else {
      this.button_text = 'Chart';
      this.router.navigate(['/tabular']);
    }
  }
}

