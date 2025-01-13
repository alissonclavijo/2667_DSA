import { IdentificationType } from '@app/job-application/enums';

export interface AuthApplicant {
    identificationType: IdentificationType;
    identificationNumber: string;
    firstName: string;
    middleName: string;
    lastName: string;
    secondLastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}
