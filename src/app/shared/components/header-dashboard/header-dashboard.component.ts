import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-dashboard',
  imports: [RouterLink],
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderDashboardComponent {}
