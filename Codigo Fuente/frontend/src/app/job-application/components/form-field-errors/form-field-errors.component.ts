import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

interface CustomError {
    name: string;
    message: string;
    params?: { [key: string]: any };
}

@Component({
    imports: [CommonModule],
    selector: 'app-form-field-errors',
    templateUrl: 'form-field-errors.component.html'
})
export class FormFieldErrorsComponent implements OnInit {
    readonly field = input<AbstractControl | null>();
    readonly errors = input<CustomError[] | null>([]);

    defaultErrors: CustomError[] = [
        { name: 'required', message: 'Este campo es requerido' },
        { name: 'minlength', message: 'Debe tener al menos {minlength} caracteres' },
        { name: 'maxlength', message: 'No debe tener más de {maxlength} caracteres' },
        { name: 'email', message: 'Debe ser un correo electrónico válido' },
        { name: 'pattern', message: 'El campo tiene un formato incorrecto' },
        { name: 'passwordMismatch', message: 'Las contraseñas no coinciden' }
    ]

    allErrors: CustomError[] = [];

    ngOnInit() {
        const errors = this.errors();

        if (errors !== null) {
            for (const error of errors) {
                const { name, message } = error;
                const defaultErrorMatch = this.defaultErrors.find(error => error.name === name);

                if (defaultErrorMatch) {
                    defaultErrorMatch.message = message;
                    defaultErrorMatch.params = error.params ?? {};
                }
            }
        }

        this.allErrors.push(...this.defaultErrors);

        for (const error of errors ?? []) {
            if (!this.allErrors.some(e => e.name === error.name)) {
                this.allErrors.push(error);
            }
        }
    }

    parseErrorMessage(error: CustomError): string {
        let { name, message, params } = error;
        params = params ?? {};

        const placeholders = {
            'minlength': (e: any) => e.minlength?.requiredLength ?? '',
            'maxlength': (e: any) => e.maxlength?.requiredLength ?? ''
        }

        for (const [key, value] of Object.entries(params)) {
            const placeholder = `{${key}}`;

            if (message.includes(placeholder)) {
                message = message.replace(placeholder, value);
            }
        }

        for (const [placeholder, value] of Object.entries(placeholders)) {
            const errors = this.field()!.errors ?? {};

            if (message.includes(`{${placeholder}}`) && (placeholder in errors)) {
                message = message.replace(`{${placeholder}}`, value(errors));
            }
        }

        return message;
    }
}
