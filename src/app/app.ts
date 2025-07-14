import { Component, inject, computed, signal, effect } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { AuthFacade } from './features/auth/auth.facade';
import { SplashComponent } from './shared/components/splash/splash.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SplashComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'vital-avellaneda';
  private authFacade = inject(AuthFacade);
  private router = inject(Router);

  // Reactive signal for the current URL
  private currentUrl = signal(this.router.url);

  constructor() {
    this.authFacade.checkAuthStatus();

    // Listen for navigation changes and update the signal
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.urlAfterRedirects);
    });

    // Hide the global splash when it is no longer needed
    effect(() => {
      if (!this.showSplash()) {
        const splash = document.getElementById('global-splash');
        if (splash) splash.style.display = 'none';
      }
    });
  }

  showSplash = computed(() => {
    const url = this.currentUrl();
    const isChecking = this.authFacade.isCheckingAuth();
    const isProtected = url.startsWith('/dashboard') || url.startsWith('/auth');
    const show = isChecking && (url === '/' || isProtected);
    console.log("Hola!!");
    if (isProtected) console.log("Sí, es protegida");
    console.log("De hecho, la ruta es: ", url)
    console.log("IsCheckingAuth...: ", isChecking);
    console.log("¿Splash?: ", show);
    return show;
  });
}
