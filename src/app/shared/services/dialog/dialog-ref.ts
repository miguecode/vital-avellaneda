import { Observable, Subject } from 'rxjs';

/**
 * A reference to a dialog opened via the DialogService.
 * It can be injected into the content component.
 */
export class DialogRef<T = any, R = any> {
  private readonly afterClosedSubject = new Subject<R | undefined>();

  /**
   * Closes the dialog.
   * @param result Optional result to return to the dialog opener.
   */
  close(result?: R): void {
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<R | undefined> {
    return this.afterClosedSubject.asObservable();
  }
}