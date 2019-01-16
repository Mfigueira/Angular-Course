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
        let newPassword = control.get('newPassword');
        let confirmPassword = control.get('confirmPassword');
        
        if (newPassword.value !== confirmPassword.value)
            return { matchedPasswords: true };
        return null;
    }

}