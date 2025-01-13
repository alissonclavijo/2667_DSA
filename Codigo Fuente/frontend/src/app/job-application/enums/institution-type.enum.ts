export enum InstitutionType {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

export const InstitutionTypeLabels: { [key in InstitutionType]: string; } = {
    [InstitutionType.PUBLIC]: 'Pública',
    [InstitutionType.PRIVATE]: 'Privada',
}

export const InstitutionTypeLabelValues: {
    label: string;
    value: InstitutionType
}[] = Object.values(InstitutionType).map((value) => ({ label: InstitutionTypeLabels[value], value }));
