import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ElementRef,
  effect,
} from '@angular/core';
import { FirebaseUserService } from '../../../../services/firebase/firebase-user.service';
import { AuthFacade } from '../../auth.facade';
import { UserBase } from '../../../../core/models';
import { MockUserCacheService } from '../../services/mock-user-cache.service';
import { MOCK_USERS } from '../../mocks/mock-users';
import { CloudinaryService } from '../../../../services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-fast-login-card',
  imports: [],
  templateUrl: './fast-login-card.component.html',
  styleUrl: './fast-login-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FastLoginCardComponent {
  private userService = inject(FirebaseUserService);
  private cache = inject(MockUserCacheService);
  authFacade = inject(AuthFacade);
  private readonly cloudinaryService = inject(CloudinaryService);
  private elementRef = inject(ElementRef);

  users = signal<(UserBase & { password: string })[]>([]);
  showUsers = signal(false);

  readonly defaultProfilePictureUrl =
    this.cloudinaryService.defaultProfilePictureUrl;

  constructor() {
    if (this.cache.loaded()) {
      this.users = this.cache.users;
      this.showUsers.set(true);
    } else {
      this.loadMockUsers();
    }

    // Effect to handle image loading animations
    effect(() => {
      // Rerun when the users change
      this.users();

      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const images: NodeListOf<HTMLImageElement> =
            this.elementRef.nativeElement.querySelectorAll('.img-fade-in');
          images.forEach((image) => {
            // Only add listener if it's not already loaded
            if (image && !image.classList.contains('is-loaded')) {
              if (image.complete) {
                image.classList.add('is-loaded');
              } else {
                image.addEventListener(
                  'load',
                  () => {
                    image.classList.add('is-loaded');
                  },
                  { once: true }
                );
              }
            }
          });
        }
      });
    });
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
      return this.cloudinaryService.getTransformedUrl(
        user.profilePictureUrl,
        'w_60,h_60,c_fill,g_face,f_webp'
      );
    }
    return this.defaultProfilePictureUrl;
  }
}
