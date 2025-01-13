export enum ParticipationType {
    AUTHOR = 'AUTHOR',
    COAUTHOR = 'COAUTHOR',
}

export const ParticipationTypeLabels = {
    [ParticipationType.AUTHOR]: 'Author',
    [ParticipationType.COAUTHOR]: 'Co-author',
}

export const ParticipationTypeLabelValues: {
    label: string;
    value: ParticipationType
}[] = Object.values(ParticipationType).map((value) => ({ label: ParticipationTypeLabels[value], value }));
