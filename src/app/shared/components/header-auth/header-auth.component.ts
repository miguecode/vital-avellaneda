import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from "../../icons/svg-icon.component";

@Component({
  selector: 'app-header-auth',
  imports: [RouterLink, SvgIconComponent],
  templateUrl: './header-auth.component.html',
  styleUrl: './header-auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderAuthComponent {}
