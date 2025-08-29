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
  ChangeDetectorRef,
} from '@angular/core';
import { IDialog } from '../../../../shared/services/dialog/dialog.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";
import { NgClass } from '@angular/common';
import { AllowedScore } from '../../../../core/models';

export interface RateAppointmentData {
  score: AllowedScore;
  comment: string | undefined;
}

export interface RateAppointmentDialogConfig {
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
  templateUrl: './appointment-rate.component.html',
  styleUrls: ['./appointment-rate.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, SvgIconComponent, NgClass],
})
export class RateAppointmentComponent implements IDialog, OnInit, AfterViewInit, OnDestroy {
  @Input() config!: RateAppointmentDialogConfig;
  @Output() closed = new EventEmitter<RateAppointmentData | null>();
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  form!: FormGroup;
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  stars: number[] = [1, 2, 3, 4, 5];
  hoveredStar: number = 0;
  selectedStar: number = 0;

  private readonly handleClose = () => this.onClose(null);

  ngOnInit(): void {
    this.form = this.fb.group({
      score: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: [''],
    });
  }

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

  onClose(result: RateAppointmentData | null): void {
    this.dialog.nativeElement.classList.add('closing');

    setTimeout(() => {
      this.dialog.nativeElement.close();
      if (result && this.form.valid) {
        const formValue = this.form.value;
        if (formValue.comment === '') formValue.comment = undefined;
        this.closed.emit(formValue);
      } else {
        this.closed.emit(null);
      }
    }, 85); // -> Closing Animation Duration!
  }

  selectStar(star: number): void {
    this.selectedStar = star;
    this.form.controls['score'].setValue(star);
    this.cdr.detectChanges();
  }

  hoverStar(star: number): void {
    this.hoveredStar = star;
    this.cdr.detectChanges();
  }

  resetHover(): void {
    this.hoveredStar = 0;
    this.cdr.detectChanges();
  }
}