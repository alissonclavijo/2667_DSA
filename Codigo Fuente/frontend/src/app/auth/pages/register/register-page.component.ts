import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/auth/services/auth.service';
import { delay, lastValueFrom, of } from 'rxjs';
import { FormFieldErrorsComponent } from '@app/job-application/components/form-field-errors';
import { FormUtils } from '@app/core/utils';
import { IdentificationType, IdentificationTypeLabelValues } from '@app/job-application/enums';

import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FluidModule } from 'primeng/fluid';
import { ToastModule } from 'primeng/toast';
import { AuthApplicant } from '@app/auth/models/auth-applicant.model';
import { MessageService } from 'primeng/api';

const passwordMismatchValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('passwordConfirmation');
    return password?.value == confirmPassword?.value ? null : { 'passwordMismatch': true };
};

@Component({
    standalone: true,
    templateUrl: 'register-page.component.html',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        FormFieldErrorsComponent,
        SelectModule,
        InputTextModule,
        PasswordModule,
        FluidModule,
        ToastModule,
    ],
})
export class RegisterPageComponent implements OnInit {
    form = new FormGroup({
        identificationType: new FormControl<IdentificationType | undefined>(undefined, [Validators.required]),
        identificationNumber: new FormControl<string>('', [Validators.required]),
        firstName: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
        middleName: new FormControl<string>(''),
        lastName: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
        secondLastName: new FormControl<string>(''),
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
        passwordConfirmation: new FormControl<string>('', [Validators.required, passwordMismatchValidator],),
    });
    error = '';
    submitting = false;
    ngClassInvalidField = FormUtils.ngClassInvalidField;
    isRequiredField = FormUtils.isRequiredField;
    identificationTypeSelectOptions = IdentificationTypeLabelValues;

    constructor(
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit() {}

    async register() {
        const {
            identificationType,
            identificationNumber,
            firstName,
            middleName,
            lastName,
            secondLastName,
            email,
            password,
            passwordConfirmation
        } = this.form.value;

        this.form.markAllAsTouched();
        this.form.updateValueAndValidity();

        for (const control in this.form.controls) {
            this.form.get(control)?.updateValueAndValidity();
        }

        if (this.form.invalid) {
            return;
        }

        const authApplicant: AuthApplicant = {
            identificationType: this.form.value.identificationType!,
            identificationNumber: this.form.value.identificationNumber!,
            firstName: this.form.value.firstName!,
            middleName: this.form.value.middleName!,
            lastName: this.form.value.lastName!,
            secondLastName: this.form.value.secondLastName!,
            email: this.form.value.email!,
            password: this.form.value.password!,
            passwordConfirmation: this.form.value.passwordConfirmation!,
        }

        this.submitting = true;
        this.authService.register(authApplicant)
            .pipe(delay(1000))
            .subscribe(
                () => {
                    this.form.reset();
                    this.router.navigate(['/auth/login']);
                    this.messageService.add({severity:'success', summary:'Registro exitoso', detail:'Ya puede iniciar sesión'});
                },
                (error) => {
                    this.error = error.error.message;
                    this.messageService.add({severity:'error', summary:'Error', detail:this.error});
                },
                () => {
                    this.submitting = false;
                }
            );
    }
}
