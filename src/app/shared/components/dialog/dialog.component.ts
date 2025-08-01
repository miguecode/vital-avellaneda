import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { DialogConfig } from '../../services/dialog/dialog.service';
import { SvgIconComponent } from '../../icons/svg-icon.component';

@Component({
  selector: 'app-dialog',
  imports: [SvgIconComponent],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  @Input() config!: DialogConfig;
  @Output() closed = new EventEmitter<boolean>();

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  ngAfterViewInit(): void {
    this.dialog.nativeElement.showModal();
    this.dialog.nativeElement.addEventListener('close', () => this.onClose(false));
  }

  ngOnDestroy(): void {
    this.dialog.nativeElement.removeEventListener('close', () => this.onClose(false));
  }

  onClose(result: boolean): void {
    this.dialog.nativeElement.close();
    this.closed.emit(result);
  }
}