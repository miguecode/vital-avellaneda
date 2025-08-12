import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { IDialog } from '../../../../shared/services/dialog/dialog.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";

export interface CompleteAppointmentData {
  details: string;
  prescriptions: string;
  anotations: string | undefined;
  height: string | number | null;
  weight: string | number | null;
}

export interface CompleteAppointmentDialogConfig {
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
}

@Component({
  selector: 'app-complete-appointment-dialog',
  templateUrl: './complete-appointment-dialog.component.html',
  styleUrls: ['./complete-appointment-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, NgClass, SvgIconComponent],
})
export class CompleteAppointmentDialogComponent implements IDialog, OnInit, AfterViewInit, OnDestroy {
  @Input() config!: CompleteAppointmentDialogConfig;
  @Output() closed = new EventEmitter<CompleteAppointmentData | null>();
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  form!: FormGroup;
  private fb = inject(FormBuilder);

  private readonly handleClose = () => this.onClose(null);

  ngOnInit(): void {
    this.form = this.fb.group({
      details: ['', [Validators.required, Validators.minLength(12)]],
      prescriptions: ['', [Validators.required, Validators.minLength(12)]],
      anotations: [''],
      height: [''],
      weight: [''],
    });
  }

  ngAfterViewInit(): void {
    const native = this.dialog.nativeElement;
    native.showModal();
    native.addEventListener('close', this.handleClose);
  }

  ngOnDestroy(): void {
    this.dialog.nativeElement.removeEventListener('close', this.handleClose);
  }

  onClose(result: CompleteAppointmentData | null): void {
    this.dialog.nativeElement.removeEventListener('close', this.handleClose);
    this.dialog.nativeElement.close();

    if (result && this.form.valid) {
      const formValue = this.form.value;
      if (formValue.anotations === '') formValue.anotations = undefined;
      if (formValue.height === '') formValue.height = null;
      if (formValue.weight === '') formValue.weight = null;
      this.closed.emit(formValue);
    } else {
      this.closed.emit(null);
    }
  }
}