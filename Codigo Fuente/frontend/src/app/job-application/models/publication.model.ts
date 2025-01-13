import { PublicationStatus, PublicationType } from '@app/job-application/enums';
import { ParticipationType } from '@app/job-application/enums/participation-type.enum';

export interface Publication {
    id?: number;
    type: PublicationType;
    title: string;
    publisher: string;
    code: string;
    participationType: ParticipationType;
    language: string;
    status: PublicationStatus;
    publicationDate: Date;
    publicationVolumeNumber: string;
    pairReview: boolean;
}
