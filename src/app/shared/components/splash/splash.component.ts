import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-splash',
  template: `
    <div class="splash-backdrop" [style.background]="'var(' + backgroundColor + ')'">
      <div class="splash-content">
        <img src="/logos/logo-big.webp" alt="Logo" width="270" />
        <!-- <div class="animate-spin inline-block size-6 border-3
          border-current border-t-transparent text-white rounded-full"
          role="status"
          aria-label="loading">
        </div> -->
      </div>
    </div>
  `,
  styles: [
    `
      .splash-backdrop {
        position: fixed;
        inset: 0;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      /* .splash-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5rem;
    } */
    `,
  ],
})
export class SplashComponent {
  @Input() backgroundColor: string = '--color-va-primary';
}
