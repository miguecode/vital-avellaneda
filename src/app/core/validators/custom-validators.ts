import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  // Names or Lastnames: minLength to maxLength characters
  static name(minLength: number = 2, maxLength: number = 30): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      const valid = new RegExp(`^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{${minLength},${maxLength}}$`).test(value);
      return valid ? null : { invalidName: true };
    }
  }

  // Only digits, minLength to maxLength characters
  static dni(minLength: number = 7, maxLength: number = 9): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      const valid = new RegExp(`^\\d{${minLength},${maxLength}}$`).test(value);
      return valid ? null : { invalidDni: true };
    };
  }

  // Secure password: minLength to maxLength characters, at least one letter and one number
  static password(minLength: number = 8, maxLength: number = 50): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = new RegExp(`^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{${minLength},${maxLength}}$`).test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  // Age: minAge to maxAge years
  static age(minAge: number = 18, maxAge: number = 150): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
  
      const birth = new Date(value);
      const today = new Date();
  
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      const d = today.getDate() - birth.getDate();
  
      // Adjust by month/day if not yet this year
      if (m < 0 || (m === 0 && d < 0)) age--;

      if (age < minAge) return { tooYoung: true };
      
      if (age > maxAge) return { tooOld: true };
  
      return null;
    };
  }
  
  // Phone: only numbers, minLength to maxLength digits
  static phoneOptional(minLength: number = 8, maxLength: number = 15): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = new RegExp(`^\\d{${minLength},${maxLength}}$`).test(control.value);
      return valid ? null : { invalidPhone: true };
    };
  }
}