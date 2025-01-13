import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldErrorsComponent } from '@app/job-application/components/form-field-errors';
import { AcademicBackground, Country } from '@app/job-application/models';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

import { FormUtils } from '@app/core/utils';
import { AcademicDurationType, AcademicDurationTypeLabelValues, EducationLevel, EducationLevelLabelValues } from '@app/job-application/enums';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

interface AcademicBackgroundEntry extends AcademicBackground {
    _index?: number;
}

interface AcademicBackgroundFormDialogData {
    onSubmit?: (academicBackground: AcademicBackground, ref: DynamicDialogRef, update: boolean) => void;
    formData?: AcademicBackgroundEntry;
}

@Component({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormFieldErrorsComponent,
        InputTextModule,
        InputNumberModule,
        DatePickerModule,
        SelectModule,
        FluidModule,
        ButtonModule,
    ],
    templateUrl: 'academic-background-form.component.html'
})
export class AcademicBackgroundFormComponent implements OnInit {
    academicBackgroundForm = new FormGroup({
        educationLevel: new FormControl<EducationLevel | undefined>(undefined, [Validators.required]),
        institution: new FormControl<string | undefined>(undefined, [Validators.required]),
        obtainedTitle: new FormControl<string | undefined>(undefined, [Validators.required]),
        durationValue: new FormControl<number | undefined>(undefined),
        durationType: new FormControl<AcademicDurationType | undefined>(undefined),
        senescytRegistrationNumber: new FormControl<string | undefined>(undefined, [Validators.required]),
        senescytRegistrationDate: new FormControl<Date | undefined>(undefined, [Validators.required]),
        country: new FormControl<Country | undefined>(undefined, [Validators.required]),
        graduationDate: new FormControl<Date | undefined>(undefined, [Validators.required]),
    });
    educationLevelSelectOptions = EducationLevelLabelValues;
    academicDurationTypeSelectOptions = AcademicDurationTypeLabelValues;
    countries: Country[] = [];
    dialogData: AcademicBackgroundFormDialogData = {};

    constructor(
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig
    ) {
        this.dialogData = dialogConfig.data;
    }

    ngOnInit() {
        if (this.dialogData.formData) {
            this.academicBackgroundForm.patchValue(this.dialogData.formData);
        }
    }

    closeDialog() {
        this.dialogRef.close();
    }

    submit() {
        if (this.academicBackgroundForm.invalid) {
            this.academicBackgroundForm.markAllAsTouched();
            return;
        }

        const academicBackground: AcademicBackgroundEntry = {
            _index: this.dialogData.formData?._index,
            id: this.dialogData.formData?.id,
            educationLevel: this.academicBackgroundForm.get('educationLevel')?.value!,
            institution: this.academicBackgroundForm.get('institution')?.value!,
            obtainedTitle: this.academicBackgroundForm.get('obtainedTitle')?.value!,
            durationValue: this.academicBackgroundForm.get('durationValue')?.value ?? undefined,
            durationType: this.academicBackgroundForm.get('durationType')?.value ?? undefined,
            senescytRegistrationNumber: this.academicBackgroundForm.get('senescytRegistrationNumber')?.value!,
            senescytRegistrationDate: this.academicBackgroundForm.get('senescytRegistrationDate')?.value!,
            country: this.academicBackgroundForm.get('country')?.value!,
            graduationDate: this.academicBackgroundForm.get('graduationDate')?.value!,
        };

        if (this.dialogData.onSubmit) {
            this.dialogData.onSubmit(academicBackground, this.dialogRef, !!this.dialogData.formData);
        } else {
            this.dialogRef.close();
        }
    }

    get ngClassInvalidField() {
        return FormUtils.ngClassInvalidField;
    }

    get isRequiredField() {
        return FormUtils.isRequiredField;
    }
}
