import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';

import { Language } from '@app/job-application/models';
import { FormUtils } from '@app/core/utils';
import { FormFieldErrorsComponent } from '@app/job-application/components/form-field-errors';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

interface LanguageEntry extends Language {
    _index?: number;
}

interface LanguageKnowledgeFormDialogData {
    onSubmit?: (language: LanguageEntry, ref: DynamicDialogRef, update: boolean) => void;
    formData?: LanguageEntry;
}

@Component({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormFieldErrorsComponent,
        InputTextModule,
        InputNumberModule,
        DatePickerModule,
        FluidModule,
        ButtonModule,
    ],
    templateUrl: 'language-knowledge-form.component.html'
})
export class LanguageKnowledgeFormComponent implements OnInit {
    languageKnowledgeForm = new FormGroup({
        language: new FormControl<string | undefined>(undefined, [Validators.required]),
        level: new FormControl<string | undefined>(undefined, [Validators.required]),
        certificationDate: new FormControl<Date | undefined>(undefined, [Validators.required]),
    });
    dialogData: LanguageKnowledgeFormDialogData = {};

    constructor(
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig
    ) {
        this.dialogData = dialogConfig.data;
    }

    ngOnInit() {
        if (this.dialogData.formData) {
            this.languageKnowledgeForm.patchValue(this.dialogData.formData);
        }
    }

    closeDialog() {
        this.dialogRef.close();
    }

    submit() {
        this.languageKnowledgeForm.markAllAsTouched();

        if (!this.languageKnowledgeForm.valid) {
            return;
        }

        const language: LanguageEntry = {
            id: this.dialogData.formData?.id,
            _index: this.dialogData.formData?._index,
            language: this.languageKnowledgeForm.get('language')?.value!,
            level: this.languageKnowledgeForm.get('level')?.value!,
            certificationDate: this.languageKnowledgeForm.get('certificationDate')?.value!,
        };

        if (this.dialogData.onSubmit) {
            this.dialogData.onSubmit(language, this.dialogRef, !!this.dialogData.formData);
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
