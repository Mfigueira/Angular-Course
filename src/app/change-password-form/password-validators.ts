import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {

    static invalidOldPassword(control: AbstractControl): Promise<ValidationErrors|null> {
        return new Promise((resolve, reject) =>
            setTimeout(() => {
                if (control.value !== "123") {
                    resolve( { invalidOldPassword: true });
                } else {
                    resolve(null);
                }
            }, 2000)
        );
    }

    static matchedPasswords(control: AbstractControl): ValidationErrors|null {
        let newP = control.get('newPassword');
        let confirm = control.get('confirmPassword');

        return newP && confirm && newP.value !== confirm.value ? { matchedPasswords: true } : null;
    }

}