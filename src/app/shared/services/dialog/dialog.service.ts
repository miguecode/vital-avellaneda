import {
  Injectable,
  inject,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  ComponentRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { NavigationStart, Router } from '@angular/router';

export interface DialogConfig {
  title: string;
  message: string;
  confirmText?: string;
  confirmTextColor?: string;
  confirmTextBgColor?: string;
  confirmTextBgColorHover?: string;
  confirmTextBgColorActive?: string;
  cancelText?: string;
  icon?: string;
  iconColor?: string;
  iconBgColor?: string;
  showInput?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  textareaRows?: number;
  inputMaxLength?: number;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private router = inject(Router);

  private dialogResult$ = new Subject<boolean | string>();
  private dialogComponentRef: ComponentRef<DialogComponent> | null = null;

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.destroyDialog();
      }
    });
  }

  open(config: DialogConfig) {
    this.dialogComponentRef = createComponent(DialogComponent, {
      environmentInjector: this.injector,
    });

    this.dialogComponentRef.instance.config = config;

    const sub = this.dialogComponentRef.instance.closed.subscribe((result) => {
      this.dialogResult$.next(result);
      this.dialogResult$.complete();
      this.destroyDialog();
      sub.unsubscribe();
    });

    this.appRef.attachView(this.dialogComponentRef.hostView);
    document.body.appendChild(this.dialogComponentRef.location.nativeElement);

    return this.dialogResult$.asObservable();
  }

  private destroyDialog(): void {
    if (this.dialogComponentRef) {
      this.appRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.destroy();
      this.dialogComponentRef = null;
    }
    this.dialogResult$ = new Subject<boolean | string>();
  }
}