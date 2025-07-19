import { ChangeDetectionStrategy, Component, inject, signal, HostListener, ElementRef } from '@angular/core';
import { AuthFacade } from '../../../features/auth/auth.facade';
import { SvgIconComponent } from '../../icons/svg-icon.component';
import { UserRoles as R } from '../../../core/enums';
import { ICON_PATHS } from '../../icons/icon-paths';
import { Router } from '@angular/router';

interface MenuItem {
  icon: keyof typeof ICON_PATHS;
  text: string;
  action?: () => void;
}

@Component({
  selector: 'app-user-submenu',
  imports: [SvgIconComponent],
  templateUrl: './user-submenu.component.html',
  styleUrl: './user-submenu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSubmenuComponent {
  private authFacade = inject(AuthFacade);
  private elementRef = inject(ElementRef);
  private router = inject(Router);
  
  readonly user = this.authFacade.user;
  readonly name = this.user()?.firstName;
  readonly role = this.user()?.role === R.PATIENT ? 'Paciente' : 'Especialista';
  
  // Signal to control the dropdown state
  readonly isDropdownOpen = signal(false);
  // Signal to control the dropdown visibility
  readonly isDropdownVisible = signal(false);

  readonly menuItems: MenuItem[] = [
    {
      icon: 'user',
      text: 'Mi perfil',
      action: () => this.handleProfileClick()
    },
    {
      icon: 'appointment',
      text: 'Mis turnos',
      action: () => this.handleAppointmentsClick()
    },
    {
      icon: 'configuration',
      text: 'Configuración',
      action: () => this.handleSettingsClick()
    }
  ];

  // Method to toggle the dropdown
  toggleDropdown(event: Event): void {
    event.stopPropagation(); // Prevent the event from propagating to the document
    
    if (this.isDropdownOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  // Method to open the dropdown
  openDropdown(): void {
    this.isDropdownVisible.set(true);
    // Small delay so the DOM updates before applying the animation
    setTimeout(() => {
      this.isDropdownOpen.set(true);
    }, 10);
  }

  // Method to close the dropdown
  closeDropdown(): void {
    this.isDropdownOpen.set(false);
    // Wait for the exit animation to finish before hiding the element
    setTimeout(() => {
      this.isDropdownVisible.set(false);
    }, 280); // Exit animation duration
  }

  // HostListener to detect clicks outside the component
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Only close if the dropdown is open and the click was outside the component
    if (this.isDropdownOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  private handleProfileClick(): void {
    this.closeDropdown();
  }

  private handleAppointmentsClick(): void {
    this.closeDropdown();
  }

  private handleSettingsClick(): void {
    this.closeDropdown();
  }

  async handleLogoutClick(): Promise<void> {
    await this.authFacade.logout();
    // this.closeDropdown();
    this.router.navigate(['/auth/login']);
  }
}