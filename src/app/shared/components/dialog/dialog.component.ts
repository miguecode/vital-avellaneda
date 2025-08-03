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
} from '@angular/core';
import { DialogConfig } from '../../services/dialog/dialog.service';
import { SvgIconComponent } from '../../icons/svg-icon.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dialog',
  imports: [SvgIconComponent, NgClass],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  @Input() config!: DialogConfig;
  @Output() closed = new EventEmitter<boolean>();

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

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

  onClose(result: boolean): void {
    this.dialog.nativeElement.classList.add('closing');

    this.dialog.nativeElement.addEventListener(
      'animationend',
      () => {
        this.dialog.nativeElement.close();
        this.closed.emit(result);
      },
      { once: true }
    );
  }
}