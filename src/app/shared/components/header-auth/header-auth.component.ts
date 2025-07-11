import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-auth',
  imports: [RouterLink],
  templateUrl: './header-auth.component.html',
  styleUrl: './header-auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderAuthComponent {}
