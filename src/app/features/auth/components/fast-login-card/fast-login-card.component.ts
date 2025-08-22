import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FirebaseUserService } from '../../../../services/firebase/firebase-user.service';
import { AuthFacade } from '../../auth.facade';
import { UserBase } from '../../../../core/models';
import { MockUserCacheService } from '../../services/mock-user-cache.service';
import { MOCK_USERS } from '../../mocks/mock-users';
import { CloudinaryService } from '../../../../services/cloudinary/cloudinary.service';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";

@Component({
  selector: 'app-fast-login-card',
  imports: [SvgIconComponent],
  templateUrl: './fast-login-card.component.html',
  styleUrl: './fast-login-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FastLoginCardComponent {
  private userService = inject(FirebaseUserService);
  private cache = inject(MockUserCacheService);
  authFacade = inject(AuthFacade);
  private readonly cloudinaryService = inject(CloudinaryService);

  users = signal<(UserBase & { password: string })[]>([]);
  showUsers = signal(false);

  readonly defaultProfilePictureUrl = this.cloudinaryService.defaultProfilePictureUrl;

  constructor() {
    if (this.cache.loaded()) {
      this.users = this.cache.users;
      this.showUsers.set(true);
    } else {
      this.loadMockUsers();
    }
  }

  async loadMockUsers() {
    console.log('Load Mock Users Started');
    const userPromises = MOCK_USERS.map(async (mock) => {
      const user = await this.userService.getUserById(mock.mockId);
      return user ? { ...user, password: mock.mockPassword } : null;
    });
    const users = (await Promise.all(userPromises)).filter(
      Boolean
    ) as (UserBase & { password: string })[];

    this.users.set(users);
    this.cache.setUsers(users);
    if (this.users().length > 0) this.showUsers.set(true);
  }

  async fastLogin(user: UserBase & { password: string }) {
    console.log('Fast Login User Started with data: ', {
      Email: user.email,
      Password: user.password,
    });
    await this.authFacade.login(user.email, user.password);
  }

  getProfilePictureUrl(user: UserBase): string {
    if (user && user.profilePictureUrl) {
      return this.cloudinaryService.getTransformedUrl(user.profilePictureUrl, 'w_60,h_60,c_fill,g_face,f_webp');
    }
    return this.defaultProfilePictureUrl;
  }
}