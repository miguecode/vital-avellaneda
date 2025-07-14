import { Component } from '@angular/core';

@Component({
  selector: 'app-splash',
  template: `
    <div class="splash-backdrop">
      <div class="splash-content">
        <img src="/logos/logo-big.webp" alt="Logo" width="270" />
      </div>
    </div>
  `,
  styleUrls: ['./splash.component.css'],
})
export class SplashComponent {}
