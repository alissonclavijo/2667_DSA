import { AcademicDurationType, EducationLevel } from '@app/job-application/enums';
import { Country } from './country.model';

export interface AcademicBackground {
    id?: number,
    educationLevel: EducationLevel,
    institution: string,
    obtainedTitle: string,
    durationValue?: number,
    durationType?: AcademicDurationType,
    senescytRegistrationNumber: string,
    senescytRegistrationDate: Date,
    graduationDate: Date,
    country: Country,
}
