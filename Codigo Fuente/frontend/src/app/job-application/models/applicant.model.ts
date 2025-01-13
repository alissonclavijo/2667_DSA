import { Language, Publication } from '@app/job-application/models';
import { AcademicBackground } from '@app/job-application/models/academic-background.model';
import { PersonalInformation } from '@app/job-application/models/personal-information.model';
import { ProfessionalExperience as ProfessionalExperience } from '@app/job-application/models/professional-experience.model';

export interface Applicant {
    id: number;
    identificationNumber: string;
    email: string;
    personalInformation: PersonalInformation;
    academicBackground: AcademicBackground[];
    professionalExperience: ProfessionalExperience[];
    languages: Language[];
    publications: Publication[];
}
