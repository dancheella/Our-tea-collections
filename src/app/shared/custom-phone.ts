import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomPhone {
  static phoneValidator(control: AbstractControl): ValidationErrors | null {
    const result = /^\+?\d{11}$/.test(control.value);
    return result ? null : {phone: {value: control.value}};
  }
}
