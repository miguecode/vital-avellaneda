import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  signal
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-custom',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select-custom.component.html',
  styleUrl: './select-custom.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCustomComponent),
      multi: true
    }
  ]
})
export class SelectCustomComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Seleccionar...';

  value = signal('');
  isDisabled = false;

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
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.value.set(selectedValue);
    this.onChange(selectedValue);
    this.onTouched();
  }
}
