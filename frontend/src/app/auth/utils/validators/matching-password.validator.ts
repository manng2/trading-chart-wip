import { FormGroup, ValidatorFn } from "@angular/forms";

export function matchingPasswordValidator(formGroup: FormGroup): ValidatorFn {
  return () => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password !== confirmPassword ? { notMatching: true } : null;
  };
}