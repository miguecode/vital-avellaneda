import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { AuthFacade } from '../../../auth/auth.facade';
import { UserBase } from '../../../../core/models';
import { SplashComponent } from "../../../../shared/components/splash/splash.component";
import { TitleDescriptionComponent } from "../../../../shared/components/title-description/title-description.component";
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";
import { RouterLink } from '@angular/router';
import { UserEditFormComponent } from "../../components/user-edit-form/user-edit-form.component";

@Component({
  selector: 'app-user-edit-page',
  imports: [SplashComponent, TitleDescriptionComponent, SvgIconComponent, RouterLink, UserEditFormComponent],
  templateUrl: './user-edit-page.component.html',
  styleUrl: './user-edit-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditPageComponent {
  private readonly authFacade = inject(AuthFacade);
  readonly user: Signal<UserBase | null> = this.authFacade.user;
  readonly isCheckingAuth: Signal<boolean> = this.authFacade.isCheckingAuth;
}
