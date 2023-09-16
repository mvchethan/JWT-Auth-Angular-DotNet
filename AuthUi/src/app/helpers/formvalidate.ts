import { FormControl, FormGroup } from "@angular/forms";

export default class ValidateForm {
    static validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsDirty({ onlySelf: true })
            } else if (console instanceof FormGroup) {
                this.validateAllFormFields(formGroup);
            }
        });
    }
}
