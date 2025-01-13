export enum IdentificationType {
    CI = 'CI',
    PASSPORT = 'PASSPORT',
}

export const IdentificationTypeLabels: { [key in IdentificationType]: string; } = {
    [IdentificationType.CI]: 'Cédula de identidad',
    [IdentificationType.PASSPORT]: 'Pasaporte',
}

export const IdentificationTypeLabelValues: {
    label: string;
    value: IdentificationType
}[] = Object.values(IdentificationType).map((value) => ({ label: IdentificationTypeLabels[value], value }));
