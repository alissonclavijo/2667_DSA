import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@app/core/utils';
import { PublicationStatus, PublicationStatusLabels, PublicationStatusLabelValues, PublicationType, PublicationTypeLabels, PublicationTypeLabelValues } from '@app/job-application/enums';
import { ParticipationType, ParticipationTypeLabels, ParticipationTypeLabelValues } from '@app/job-application/enums/participation-type.enum';
import { Publication } from '@app/job-application/models';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CommonModule } from '@angular/common';
import { FormFieldErrorsComponent } from '@app/job-application/components/form-field-errors';

interface PublicationEntry extends Publication {
    _index?: number;
}

interface PublicationFormDialogData {
    onSubmit?: (academicBackground: PublicationEntry, ref: DynamicDialogRef, update: boolean) => void;
    formData?: PublicationEntry;
}

@Component({
    templateUrl: './publication-form.component.html',
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
        ToggleButtonModule,
    ],
})
export class PublicationFormComponent {
    publicationForm = new FormGroup({
        type: new FormControl<PublicationType | undefined>(undefined, [Validators.required]),
        title: new FormControl<string | undefined>(undefined, [Validators.required]),
        publisher: new FormControl<string | undefined>(undefined, [Validators.required]),
        code: new FormControl<string | undefined>(undefined, [Validators.required]),
        participationType: new FormControl<ParticipationType | undefined>(undefined, [Validators.required]),
        language: new FormControl<string | undefined>(undefined, [Validators.required]),
        status: new FormControl<PublicationStatus | undefined>(undefined, [Validators.required]),
        publicationDate: new FormControl<Date | undefined>(undefined, [Validators.required]),
        publicationVolumeNumber: new FormControl<string | undefined>(undefined, [Validators.required]),
        pairReview: new FormControl<boolean | undefined>(undefined, [Validators.required]),
    });

    dialogData: PublicationFormDialogData = {};

    constructor(
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig
    ) {
        this.dialogData = dialogConfig.data;
    }

    ngOnInit() {
        if (this.dialogData.formData) {
            this.publicationForm.patchValue(this.dialogData.formData);
        }
    }

    submit() {
        this.publicationForm.markAllAsTouched();

        if (this.publicationForm.invalid) {
            return;
        }

        const publication: PublicationEntry = {
            _index: this.dialogData.formData?._index,
            id: this.dialogData.formData?.id,
            title: this.publicationForm.value.title!,
            type: this.publicationForm.value.type!,
            publisher: this.publicationForm.value.publisher!,
            code: this.publicationForm.value.code!,
            participationType: this.publicationForm.value.participationType!,
            language: this.publicationForm.value.language!,
            status: this.publicationForm.value.status!,
            publicationDate: this.publicationForm.value.publicationDate!,
            publicationVolumeNumber: this.publicationForm.value.publicationVolumeNumber!,
            pairReview: this.publicationForm.value.pairReview!,
        }

        if (this.dialogData.onSubmit) {
            this.dialogData.onSubmit(publication, this.dialogRef, !!this.dialogData.formData);
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

    closeDialog() {
        this.dialogRef.close();
    }

    publicationTypeLabel(publicationType: PublicationType): string {
        return PublicationTypeLabels[publicationType];
    }

    publicationStatusLabel(publicationStatus: PublicationStatus): string {
        return PublicationStatusLabels[publicationStatus];
    }

    participationTypeLabel(participationType: ParticipationType): string {
        return ParticipationTypeLabels[participationType];
    }

    get publicationStatusOptions() {
        return PublicationStatusLabelValues;
    }

    get publicationTypeOptions() {
        return PublicationTypeLabelValues;
    }

    get participationTypeOptions() {
        return ParticipationTypeLabelValues;
    }
}
