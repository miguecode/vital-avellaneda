import { Injectable, signal } from '@angular/core';
import { UserBase } from '../../../core/models/user-base.model';

@Injectable({ providedIn: 'root' })
export class MockUserCacheService {
  users = signal<(UserBase & { password: string })[]>([]);
  loaded = signal(false);

  setUsers(users: (UserBase & { password: string })[]) {
    this.users.set(users);
    this.loaded.set(true);
  }
} 