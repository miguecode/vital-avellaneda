import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderDashboardComponent } from "../../shared/components/header-dashboard/header-dashboard.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, HeaderDashboardComponent, FooterComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {}
