import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { IDialog } from '../../../../shared/services/dialog/dialog.service';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';

export interface InformData {
  label: string,
  value: string,
}

export interface AppointmentInformDialogConfig {
  title: string;
  subtitle: string;
  inform: InformData[];
  cancelText?: string;
  icon?: string;
  iconColor?: string;
  iconBgColor?: string;
}

@Component({
  selector: 'app-appointment-inform-dialog',
  templateUrl: './appointment-inform-dialog.component.html',
  styleUrls: ['./appointment-inform-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgIconComponent],
})
export class AppointmentInformDialogComponent
  implements IDialog, AfterViewInit, OnDestroy
{
  @Input() config!: AppointmentInformDialogConfig;
  @Output() closed = new EventEmitter<void>();

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  private readonly handleClose = () => this.onClose();

  ngAfterViewInit(): void {
    const native = this.dialog.nativeElement;

    native.showModal();
    native.addEventListener('close', this.handleClose);

    native.offsetHeight;

    requestAnimationFrame(() => {
      native.classList.add('showing');
    });
  }

  ngOnDestroy(): void {
    this.dialog.nativeElement.removeEventListener('close', this.handleClose);
  }

  onClose(): void {
    this.dialog.nativeElement.classList.add('closing');

    setTimeout(() => {
      this.dialog.nativeElement.close();
      this.closed.emit();
    }, 50);
  }
}
