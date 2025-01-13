export enum Sex {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export const SexLabels: { [key in Sex]: string; } = {
    [Sex.MALE]: 'Masculino',
    [Sex.FEMALE]: 'Femenino',
}

export const SexLabelValues: {
    label: string;
    value: Sex;
}[] = Object.values(Sex).map((value) => ({ label: SexLabels[value], value }));
