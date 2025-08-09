import {
  Injectable,
  inject,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  ComponentRef,
  Type,
  EventEmitter,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

export interface IDialog {
  config: any;
  closed: EventEmitter<any>;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private router = inject(Router);

  private dialogComponentRef: ComponentRef<IDialog> | null = null;

  constructor() {
    console.log('dialog service!');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.destroyDialog();
      }
    });
  }

  openGeneric<T extends IDialog, R>(component: Type<T>, config: T['config']): Observable<R> {
    const dialogResult$ = new Subject<R>();

    this.dialogComponentRef = createComponent(component, {
      environmentInjector: this.injector,
    });

    this.dialogComponentRef.instance.config = config;

    const sub = this.dialogComponentRef.instance.closed.subscribe((result: R) => {
      dialogResult$.next(result);
      dialogResult$.complete();
      this.destroyDialog();
      sub.unsubscribe();
    });

    this.appRef.attachView(this.dialogComponentRef.hostView);
    document.body.appendChild(this.dialogComponentRef.location.nativeElement);

    return dialogResult$.asObservable();
  }

  private destroyDialog(): void {
    if (this.dialogComponentRef) {
      this.appRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.destroy();
      this.dialogComponentRef = null;
    }
  }
}