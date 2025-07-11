import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAuthComponent } from '../../shared/components/header-auth/header-auth.component';
import { FooterAuthComponent } from "../../shared/components/footer-auth/footer-auth.component";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, HeaderAuthComponent, FooterAuthComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {}
