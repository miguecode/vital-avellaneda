import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Optional,
  Self,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { SvgIconComponent } from "../../../../shared/icons/svg-icon.component";

@Component({
  selector: 'app-input-custom',
  standalone: true,
  imports: [ReactiveFormsModule, SvgIconComponent],
  templateUrl: './input-custom.component.html',
  styleUrl: './input-custom.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCustomComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'Campo';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() autocomplete: string = 'off';
  @Input() minlength?: number;
  @Input() maxlength?: number;
  @Input() min?: number | string;
  @Input() max?: number | string;
  @Input() noShowErrors?: boolean = false;

  value: any = '';
  isDisabled = false;
  control: NgControl | null = null;

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.control = this.ngControl;
  }

  writeValue(obj: any): void {
    this.value = obj;
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

  onChange = (_: any) => {};
  onTouched = () => {};

  handleInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
    this.onTouched();
  }

  get errorMessages(): string[] {
    const errors = this.control?.control?.errors;
    if (!errors) return [];

    const messages: string[] = [];
    if (errors['required']) messages.push('Este campo es obligatorio.');
    if (errors['minlength']) messages.push(`Mínimo ${errors['minlength'].requiredLength} caracteres.`);
    if (errors['maxlength']) messages.push(`Máximo ${errors['maxlength'].requiredLength} caracteres.`);
    if (errors['min']) messages.push(`Mínimo ${errors['min'].min}.`);
    if (errors['max']) messages.push(`Máximo ${errors['max'].max}.`);
    if (errors['pattern']) messages.push('Formato inválido.');
    if (errors['email']) messages.push('Correo electrónico inválido.');
    if (errors['invalidName']) messages.push('Solo letras. 2-30 caracteres.');
    if (errors['invalidDni']) messages.push('Solo números. 7-9 dígitos.');
    if (errors['invalidPassword']) messages.push('Mínimo una letra y un número.');
    if (errors['tooYoung']) messages.push('Edad inválida (mín. 18 años).');
    if (errors['tooOld']) messages.push('Edad inválida (máx. 150 años).');
    if (errors['invalidPhone']) messages.push('Solo números. 8-15 dígitos.');
    
    return messages;
  }

  get showErrors(): boolean {
    if (this.noShowErrors) return false;
    const control = this.control?.control;
    if (!control || !control.errors) return false;
    return control.touched || control.dirty;
  }
}