import { FormGroup, Validators } from '@angular/forms';

export class FormUtils {
    static ngClassInvalidField(group: FormGroup, fieldName: string, extraClasses: { [key: string]: boolean } = {}) {
        if (!group || !group.get(fieldName)) {
            return {
                ...extraClasses
            };
        }

        const field = group.get(fieldName)!;
        const isInvalid = field.invalid && (field.touched || field.dirty);

        return {
            'p-invalid': isInvalid,
            'invalid': isInvalid,
            'touched': group.get(fieldName)!.touched,
            'dirty': group.get(fieldName)!.dirty,
            ...extraClasses
        };
    }

    static isRequiredField(formGroup: FormGroup, fieldName: string) {
        const field = formGroup.get(fieldName);

        if (!field || !field.validator) {
            return false;
        }

        return field.hasValidator(Validators.required);
    }
}
