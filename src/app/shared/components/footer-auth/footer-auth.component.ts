import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-auth',
  imports: [RouterLink],
  templateUrl: './footer-auth.component.html',
  styleUrl: './footer-auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterAuthComponent {}
