import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicBackground, Applicant, Canton, Country, Language, Parish, Province, Publication } from '@app/job-application/models';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DatePickerModule } from 'primeng/datepicker';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FluidModule } from 'primeng/fluid';
import { MessageModule } from 'primeng/message';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { IdentificationType, IdentificationTypeLabelValues } from '@app/job-application/enums/identification-type.enum';
import { BloodType, BloodTypeLabelValues } from '@app/job-application/enums/blood-type.enum';
import {
    AcademicDurationType,
    AcademicDurationTypeLabels,
    AcademicDurationTypeLabelValues,
    CatastrophicDiseaseType,
    CatastrophicDiseaseTypeLabelValues,
    CivilStatusLabels,
    CivilStatusLabelValues,
    DisabilityType,
    DisabilityTypeLabelValues,
    EducationLevel,
    EducationLevelLabels,
    EducationLevelLabelValues,
    Sex,
    SexLabelValues,
    PublicationStatus,
    PublicationStatusLabels,
    PublicationType,
    PublicationTypeLabels,
    PublicationTypeLabelValues
} from '@app/job-application/enums';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfessionalExperience } from '@app/job-application/models/professional-experience.model';
import { FormFieldErrorsComponent } from "../../components/form-field-errors/form-field-errors.component";
import { AcademicBackgroundFormComponent } from '@app/job-application/components/academic-background-form';
import { LanguageKnowledgeFormComponent } from '@app/job-application/components/language-knowledge-form';
import { FormUtils } from '@app/core/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PublicationFormComponent } from '@app/job-application/components/publication-form';
import { ParticipationType, ParticipationTypeLabels } from '@app/job-application/enums/participation-type.enum';
import { ApplicantService } from '@app/job-application/services/applicant.service';
import { lastValueFrom } from 'rxjs';

type FormGroupName = 'personalInformationForm' | 'academicBackgroundForm' | 'languageKnowledgeForm' | 'publicationForm';

interface ApplicantInfoStepperData {
    items: {
        icon: string;
        title: string;
        active: boolean;
        action: () => void;
    }[];
}

interface AcademicBackgroundEntry extends AcademicBackground {
    _index?: number;
}

interface LanguageEntry extends Language {
    _index?: number;
}

interface PublicationEntry extends Publication {
    _index?: number;
}

@Component({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormFieldErrorsComponent,
        FontAwesomeModule,
        StepperModule,
        StepsModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        ToggleButtonModule,
        IconFieldModule,
        InputIconModule,
        DividerModule,
        CommonModule,
        SelectButtonModule,
        DatePickerModule,
        KeyFilterModule,
        SelectModule,
        DialogModule,
        TableModule,
        FluidModule,
        MessageModule,
        DynamicDialogModule,
        FormFieldErrorsComponent,
        ConfirmDialogModule,
    ],
    providers: [DialogService],
    templateUrl: 'register-information-page.component.html',
    styleUrls: ['register-information-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterInformationPageComponent implements OnInit {
    personalInformationForm = new FormGroup({
        identificationType: new FormControl<IdentificationType | undefined>(undefined, [Validators.required]),
        identificationNumber: new FormControl<string | undefined>(undefined, [Validators.required]),
        firstName: new FormControl<string | undefined>(undefined, [Validators.required]),
        middleName: new FormControl<string | undefined>(undefined),
        lastName: new FormControl<string | undefined>(undefined, [Validators.required]),
        secondLastName: new FormControl<string | undefined>(undefined),
        birthDate: new FormControl<Date | undefined>(undefined, [
            Validators.required
        ]),
        sex: new FormControl<Sex | undefined>(undefined, [Validators.required]),
        civilStatus: new FormControl<string | undefined>(undefined, [Validators.required]),
        nationality: new FormControl<string | undefined>(undefined, [Validators.required]),
        residenceYears: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
        ethnicity: new FormControl<string | undefined>(undefined, [Validators.required]),
        ethnicGroup: new FormControl<string | undefined>(undefined),
        email: new FormControl<string | undefined>(undefined, [
            Validators.required,
            Validators.email
        ]),
        secondaryEmail: new FormControl<string | undefined>(undefined, Validators.email),
        bloodType: new FormControl<BloodType | undefined>(undefined, [Validators.required]),
        hasDisability: new FormControl<boolean>(false, [Validators.required]),
        disabilityType: new FormControl<DisabilityType | undefined>(undefined),
        disabilityPercentage: new FormControl<number>(0, [Validators.min(0), Validators.max(100)]),
        mspIdentificationNumber: new FormControl<string | undefined>(undefined),
        hasCatastrophicDisease: new FormControl<boolean>(false, [Validators.required]),
        catastrophicDiseaseType: new FormControl<CatastrophicDiseaseType | undefined>(undefined),
        province: new FormControl<Province | undefined>(undefined, [Validators.required]),
        canton: new FormControl<Canton | undefined>(undefined, [Validators.required]),
        parish: new FormControl<Parish | undefined>(undefined, [Validators.required]),
        mainStreet: new FormControl<string | undefined>(undefined, [Validators.required]),
        secondaryStreet: new FormControl<string | undefined>(undefined, [Validators.required]),
        addressNumber: new FormControl<string | undefined>(undefined, [Validators.required]),
        addressReference: new FormControl<string | undefined>(undefined, [Validators.required]),
        cellPhoneNumber: new FormControl<string | undefined>(undefined, [Validators.required]),
        homePhoneNumber: new FormControl<string | undefined>(undefined, [Validators.required]),
        workPhoneNumber: new FormControl<string | undefined>(undefined),
        workPhoneExtension: new FormControl<string | undefined>(undefined),
    });
    activeStep: number = 1;
    sexOptionButtons = SexLabelValues.map((entry) => ({
        ...entry,
        icon: entry.value === Sex.MALE ? 'mars' : 'venus'
    }))
    stepper: ApplicantInfoStepperData = {
        items: [
            {
                icon: 'user',
                title: 'Información personal',
                active: true,
                action: () => {}
            },
            {
                icon: 'graduation-cap',
                title: 'Formación académica',
                active: false,
                action: () => {}
            },
            {
                icon: 'briefcase',
                title: 'Experiencia laboral',
                active: false,
                action: () => {}
            },
            {
                icon: 'file',
                title: 'Capacitación',
                active: false,
                action: () => {}
            }
        ]
    };
    previousToggableFieldsValues = {
        personalInformation: {
            hasDisability: {
                disabilityType: null,
                disabilityPercentage: null,
                mspIdentificationNumber: null
            },
            hasCatastrophicDisease: {
                catastrophicDiseaseType: null
            }
        }
    }
    dialogFormsVisibility = {
        academicBackgroundForm: false,
        languageKnowledgeForm: false,
        professionalExperienceForm: false,
        publicationForm: false,
    }
    academicBackgroundEntries: AcademicBackgroundEntry[] = [];
    languageEntries: LanguageEntry[] = [];
    professionalExperienceEntries: ProfessionalExperience[] = [];
    publicationEntries: Publication[] = [];
    countries: Country[] = [];
    errors: {
        academicBackground: {
            academicBackgroundEntries: string | undefined,
            languageEntries: string | undefined,
            publicationEntries: string | undefined
        }
    } = {
        academicBackground: {
            academicBackgroundEntries: undefined,
            languageEntries: undefined,
            publicationEntries: undefined
        }
    }

    constructor(
        private dialogService: DialogService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private applicantService: ApplicantService
    ) {}

    ngOnInit() {
        setTimeout(() => this.updateDisabledFields(), 500);

        this.fetchApplicantInformation();

        this.countries.push(...[
            {
                id: '1',
                name: 'Ecuador'
            },
            {
                id: '2',
                name: 'Colombia'
            },
            {
                id: '3',
                name: 'Perú'
            },
            {
                id: '4',
                name: 'Chile'
            },
        ]);

        /*this.personalInformationForm.patchValue({
            identificationType: IdentificationType.CI,
            identificationNumber: '1234567890',
            names: 'John',
            firstLastName: 'Doe',
            secondLastName: 'Smith',
            birthDate: new Date('1990-01-01'),
            gender: Gender.MALE,
            civilStatus: 'MARRIED',
            nationality: 'Ecuadorian',
            residenceYears: 5,
            ethnicity: 'Mestizo',
            ethnicGroup: 'N/A',
            email: 'john.doe@example.com',
            secondaryEmail: 'j.doe@dummy.com',
            bloodType: BloodType.AB_NEGATIVE,
            hasDisability: false,
            disabilityType: undefined,
            disabilityPercentage: 0,
            mspIdentificationNumber: 'MSP-12345',
            hasCatastrophicDisease: false,
            catastrophicDiseaseType: undefined,
            province: { id: '1', name: 'Pichincha' },
            canton: { id: '1-1', name: 'Quito' },
            parish: { id: '1-1-1', name: 'Centro Histórico' },
            mainStreet: 'Av. Amazonas',
            secondaryStreet: 'Calle Naciones Unidas',
            addressNumber: '123',
            addressReference: 'Frente al parque',
            cellPhoneNumber: '+593987654321',
            homePhoneNumber: '+59321234567',
            workPhoneNumber: '+59322345678',
            workPhoneExtension: '101',
        });*/

        this.academicBackgroundEntries.push(...[
            {
                _index: 0,
                id: 1,
                institution: 'Universidad de las Fuerzas Armadas ESPE',
                educationLevel: EducationLevel.GRADUATE_MASTERS,
                obtainedTitle: 'Master in Computer Science',
                durationValue: 2,
                durationType: AcademicDurationType.YEAR,
                senescytRegistrationNumber: '1234567890',
                senescytRegistrationDate: new Date('2019-01-01'),
                country: { id: '1', name: 'Ecuador' },
                graduationDate: new Date('2021-01-01'),
            }
        ]);

        this.languageEntries.push(...[
            {
                _index: 0,
                id: 1,
                language: 'English',
                level: 'B2',
                certificationDate: new Date('2021-01-01'),
            }
        ]);

        this.publicationEntries.push(...[
            {
                id: 1,
                type: PublicationType.ARTICLES,
                title: 'A journal title',
                publisher: 'A publisher',
                code: '123456',
                participationType: ParticipationType.AUTHOR,
                language: 'English',
                status: PublicationStatus.ACCEPTED,
                publicationDate: new Date('2021-01-01'),
                publicationVolumeNumber: '1',
                pairReview: true,
            }
        ]);
    }

    private async fetchApplicantInformation() {
        let applicant: Applicant | null = null;

        try {
            applicant = await lastValueFrom(this.applicantService.getAuthenticatedApplicant());
        } catch (error) {
            console.error(error);
            return;
        }

        if (!applicant) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo obtener la información del solicitante'
            })

            return;
        }

        const { personalInformation, academicBackground, professionalExperience, languages, publications } = applicant;

        this.personalInformationForm.patchValue({
            ...personalInformation
        });
    }

    updateDisabledFields() {
        const groups = {
            personalInformation: {
                hasDisability: {
                    check: () => !!this.personalInformationForm.get('hasDisability')!.value,
                    fields: ['disabilityType', 'disabilityPercentage', 'mspIdentificationNumber']
                },
                hasCatastrophicDisease: {
                    check: () => !!this.personalInformationForm.get('hasCatastrophicDisease')!.value,
                    fields: ['catastrophicDiseaseType']
                }
            }
        };

        for (const entry of Object.entries(groups)) {
            const [groupName, group] = entry;

            for (const groupEntry of Object.entries(group)) {
                const [_, fieldOptions] = groupEntry;

                if (fieldOptions.check()) {
                    for (const fieldName of fieldOptions.fields) {
                        this.personalInformationForm.get(fieldName)!.enable();
                        this.personalInformationForm.get(fieldName)!.setValue((this.previousToggableFieldsValues as any)[groupName][fieldName]);
                    }
                } else {
                    for (const fieldName of fieldOptions.fields) {
                        (this.previousToggableFieldsValues as any)[groupName][fieldName] = this.personalInformationForm.get(fieldName)!.value;
                        this.personalInformationForm.get(fieldName)!.disable();
                        this.personalInformationForm.get(fieldName)!.reset();
                    }
                }
            }
        }
    }

    onStepListItemClick(step: number, activateCallback: () => void) {
        const triggerSteps = [
            this.savePersonalInformation.bind(this, activateCallback),
            this.saveAcademicBackground.bind(this, activateCallback),
            this.saveProfessionalExperience.bind(this, activateCallback)
        ]
        const allowedSteps = [
            this.personalInformationForm.valid,
            this.academicBackgroundEntries.length > 0,
        ]

        if (step === this.activeStep) {
            return;
        }

        const isNextStep = step === this.activeStep + 1;
        const trigger = triggerSteps[this.activeStep - 1];

        if (step > (this.activeStep + 1)) {
            return;
        }

        if (step < this.activeStep) {
            return activateCallback();
        }

        if (isNextStep) {
            if (trigger) {
                trigger();
            }

            return;
        }

        if (typeof allowedSteps[step - 1] !== undefined && !allowedSteps[step - 1]) {
            if (trigger) {
                trigger();
            }

            return;
        }

        if (!trigger) {
            return activateCallback();
        }

        trigger();
    }

    savePersonalInformation(callback: () => void) {
        this.personalInformationForm.markAllAsTouched();

        if (!this.personalInformationForm.valid) {
            return;
        }

        callback();
    }

    saveAcademicBackground(callback: () => void) {
        for (const entry of Object.entries(this.errors.academicBackground)) {
            const [key, _] = entry;
            (this.errors.academicBackground as any)[key] = undefined;
        }

        if (!this.academicBackgroundEntries.length) {
            this.errors.academicBackground.academicBackgroundEntries = 'Debe agregar al menos una formación académica';
        }

        if (!this.languageEntries.length) {
            this.errors.academicBackground.languageEntries = 'Debe agregar al menos un idioma';
        }

        if (!this.publicationEntries.length) {
            //this.errors.academicBackground.publicationEntries = 'Debe agregar al menos una publicación';
        }

        if (Object.values(this.errors.academicBackground).some((value) => !!value)) {
            return;
        }

        callback();
    }

    saveProfessionalExperience(callback: () => void) {
        callback();
    }

    saveEntry(
        collection: 'academicBackgroundEntries' | 'languageEntries' | 'publicationEntries',
        entry: AcademicBackgroundEntry | LanguageEntry | PublicationEntry,
        ref: DynamicDialogRef,
        update: boolean
    ) {
        const entries = this[collection];

        if (update) {
            const index = this.academicBackgroundEntries.findIndex((item) => {
                return item.id ? item.id === entry.id : entry._index === item._index;
            });

            if (index === -1) {
                ref.close();
                return;
            }

            entries[index] = entry;
            ref.close();
            return;
        }

        entry._index = entries.length;
        entries.push(entry as any);
        ref.close();
    }

    deleteEntry(collection: 'academicBackgroundEntries' | 'languageEntries' | 'professionalExperienceEntries' | 'publicationEntries', item: any) {
        this.confirmationService.confirm({
            header: 'Confirmación',
            message: '¿Está seguro que desea eliminar este registro?',
            accept: () => {
                const index = this[collection].findIndex((entry: any) => {
                    return entry.id ? entry.id === item.id : entry._index === item._index;
                });

                if (index === -1) {
                    return;
                }

                this[collection].splice(index, 1);

                this[collection].forEach((entry: any, index: number) => {
                    entry._index = index;
                });
            },
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-secondary',
            rejectLabel: 'Cancelar',
        });
    }

    showDialogForm(
        formName: 'academicBackgroundForm' | 'languageKnowledgeForm' | 'publicationForm',
        formData: any = null,
        extraData: any = {}
    ) {
        const defaultDialogConfig: DynamicDialogConfig = {
            closable: false,
            draggable: false,
            resizable: false,
            modal: true,
            style: { width: '50vw' },
            breakpoints: { '1199px': '75vw', '575px': '90vw' },
        };

        const mapper: {
            [key in 'academicBackgroundForm' | 'languageKnowledgeForm' | 'publicationForm']: {
                entries: 'academicBackgroundEntries' | 'languageEntries' | 'publicationEntries',
                parseData: (data: any) => any,
                dialog: {
                    component: any,
                    config: DynamicDialogConfig
                },
            }
        } = {
            academicBackgroundForm: {
                entries: 'academicBackgroundEntries',
                parseData: (data: AcademicBackgroundEntry) => ({
                    ...data
                }),
                dialog: {
                    component: AcademicBackgroundFormComponent,
                    config: {
                        header: `${formData ? 'Editar' : 'Agregar'} formación académica`,
                    },
                },
            },
            languageKnowledgeForm: {
                entries: 'languageEntries',
                parseData: (data: LanguageEntry) => ({
                    ...data
                }),
                dialog: {
                    component: LanguageKnowledgeFormComponent,
                    config: {
                        header: `${formData ? 'Editar' : 'Agregar'} idioma`,
                    },
                }
            },
            publicationForm: {
                entries: 'publicationEntries',
                parseData: (data: Publication) => ({
                    ...data
                }),
                dialog: {
                    component: PublicationFormComponent,
                    config: {
                        header: `${formData ? 'Editar' : 'Agregar'} publicación`
                    },
                }
            }
        }

        const context = mapper[formName];
        const config = {
            ...defaultDialogConfig,
            ...context.dialog.config,
        };

        config.data = {};

        if (formData) {
            config.data.formData = context.parseData(formData);
        }

        config.data.onSubmit = (data: any, ref: DynamicDialogRef, update: boolean) => {
            this.saveEntry(context.entries, data, ref, update);
        };

        this.dialogService.open(context.dialog.component, config);
    }

    get ngClassInvalidField() {
        return FormUtils.ngClassInvalidField;
    }

    get isRequiredField() {
        return FormUtils.isRequiredField;
    }

    participationTypeLabelOf(participationType: ParticipationType) {
        return ParticipationTypeLabels[participationType];
    }

    publicationStatusLabelOf(publicationStatus: PublicationStatus) {
        return PublicationStatusLabels[publicationStatus];
    }

    publicationTypeLabelOf(publicationType: PublicationType) {
        return PublicationTypeLabels[publicationType];
    }

    get academicDurationTypeLabels(): any {
        return AcademicDurationTypeLabels;
    }

    get civilStatusLabels(): any {
        return CivilStatusLabels;
    }

    get publicationTypeLabels(): any {
        return PublicationTypeLabels;
    }

    get educationLevelLabels(): any {
        return EducationLevelLabels;
    }

    get civilStatusSelectOptions() {
        return CivilStatusLabelValues;
    }

    get publicationTypeSelectOptions() {
        return PublicationTypeLabelValues;
    }

    get academicDurationTypeSelectOptions() {
        return AcademicDurationTypeLabelValues;
    }

    get identificationTypeSelectOptions() {
        return IdentificationTypeLabelValues;
    }

    get bloodTypeSelectOptions() {
        return BloodTypeLabelValues;
    }

    get disabilityTypeSelectOptions() {
        return DisabilityTypeLabelValues;
    }

    get catastrophicDiseaseTypeSelectOptions() {
        return CatastrophicDiseaseTypeLabelValues;
    }

    get sexSelectOptions() {
        return SexLabelValues;
    }

    get educationLevelSelectOptions() {
        return EducationLevelLabelValues;
    }
}
