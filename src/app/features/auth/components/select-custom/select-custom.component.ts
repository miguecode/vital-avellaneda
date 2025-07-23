import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  Optional,
  Self,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  ReactiveFormsModule,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'app-select-custom',
  imports: [ReactiveFormsModule],
  templateUrl: './select-custom.component.html',
  styleUrl: './select-custom.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SelectCustomComponent implements ControlValueAccessor, OnChanges {
  @Input() options: string[] = [];
  @Input() label: string = 'Campo';
  @Input() name: string = '';
  @Input() labelMap?: Map<string, string>;
  @Input() placeholder: string = 'Seleccionar...';
  @Input() showValue?: boolean = false;

  value = signal('');
  initialValue: string | null = null;
  hasChanged: boolean = false;
  isDisabled = false;
  control: NgControl | null = null;

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.control = this.ngControl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.control && this.control.control) {
      const currentValue = this.control.control.value;
      if (currentValue !== undefined && currentValue !== null) {
        this.value.set(currentValue);
      }
    }
  }

  // Control Value Accessor
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value.set(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onSelectChange(event: Event) {
    if (!this.hasChanged) this.initialValue = this.labelMap?.get(this.value()) ?? null;
    this.hasChanged = true;

    const selectedValue = (event.target as HTMLSelectElement).value;
    this.value.set(selectedValue);
    this.onChange(selectedValue);
    this.onTouched();
  }

  get showErrors(): boolean {
    return !!(this.control?.control?.invalid && (this.control?.control?.touched || this.control?.control?.dirty));
  }

  get errorMessage(): string | null {
    const errors = this.control?.control?.errors;
    if (!errors) return null;
    if (errors['required']) return 'Este campo es obligatorio.';
    return null;
  }
}
