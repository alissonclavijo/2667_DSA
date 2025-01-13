export enum CivilStatus {
    SINGLE = 'SINGLE',
    MARRIED = 'MARRIED',
    DIVORCED = 'DIVORCED',
    WIDOWED = 'WIDOWED',
}

export const CivilStatusLabels: { [key in CivilStatus]: string; } = {
    [CivilStatus.SINGLE]: 'Soltero/a',
    [CivilStatus.MARRIED]: 'Casado/a',
    [CivilStatus.DIVORCED]: 'Divorciado/a',
    [CivilStatus.WIDOWED]: 'Viudo/a',
}

export const CivilStatusLabelValues: {
    label: string;
    value: CivilStatus
}[] = Object.values(CivilStatus).map((value) => ({ label: CivilStatusLabels[value], value }));
