export enum PublicationStatus {
    PUBLISHED = 'PUBLISHED',
    ACCEPTED = 'ACCEPTED'
}

export const PublicationStatusLabels = {
    [PublicationStatus.PUBLISHED]: 'Publicado',
    [PublicationStatus.ACCEPTED]: 'Aceptado'
}

export const PublicationStatusLabelValues: {
    label: string;
    value: PublicationStatus
}[] = Object.values(PublicationStatus).map((value) => ({ label: PublicationStatusLabels[value], value }));
