import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { IDialog } from '../../services/dialog/dialog.service';
import { SvgIconComponent } from '../../icons/svg-icon.component';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

@Component({
  selector: 'app-dialog',
  imports: [SvgIconComponent, NgClass, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements AfterViewInit, OnDestroy, IDialog {
  @Input() config!: DialogConfig;
  @Output() closed = new EventEmitter<boolean | string>();

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  inputValue = signal('');

  private readonly handleClose = () => this.onClose(false);

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

  onClose(result: boolean | string): void {
    this.dialog.nativeElement.classList.add('closing');

    setTimeout(() => {
      this.dialog.nativeElement.close();
      this.closed.emit(result);
    }, 85); // -> Closing Animation Duration!
  }
}