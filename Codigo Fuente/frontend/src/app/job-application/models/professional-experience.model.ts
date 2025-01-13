import { Country } from '@app/job-application/models/country.model';
import { Province } from '@app/job-application/models/province.model';

export interface ProfessionalExperience {
    id?: number;
    institution: string;
    jobTitle: string;
    administrativeUnit: string;
    institutionType: string;
    contractingModality: string;
    leaveReason: string;
    startDate: Date;
    endDate: Date;
    country: Country;
    province: Province;
}
