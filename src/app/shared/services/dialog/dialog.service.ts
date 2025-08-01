import {
  Injectable,
  inject,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DialogComponent } from '../../components/dialog/dialog.component';

export interface DialogConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon?: string;
  iconColor?: string;
  iconBgColor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  private dialogResult$ = new Subject<boolean>();

  open(config: DialogConfig) {
    const componentRef = createComponent(DialogComponent, {
      environmentInjector: this.injector,
    });

    componentRef.instance.config = config;

    const sub = componentRef.instance.closed.subscribe((result) => {
      this.dialogResult$.next(result);
      this.dialogResult$.complete();
      this.destroyDialog(componentRef);
      sub.unsubscribe();
    });

    this.appRef.attachView(componentRef.hostView);
    document.body.appendChild(componentRef.location.nativeElement);

    return this.dialogResult$.asObservable();
  }

  private destroyDialog(componentRef: any): void {
    if (componentRef) {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }
    this.dialogResult$ = new Subject<boolean>();
  }
}