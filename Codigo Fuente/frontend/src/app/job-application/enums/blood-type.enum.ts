export enum BloodType {
    A_POSITIVE = 'A_POSITIVE',
    A_NEGATIVE = 'A_NEGATIVE',
    B_POSITIVE = 'B_POSITIVE',
    B_NEGATIVE = 'B_NEGATIVE',
    O_POSITIVE = 'O_POSITIVE',
    O_NEGATIVE = 'O_NEGATIVE',
    AB_POSITIVE = 'AB_POSITIVE',
    AB_NEGATIVE = 'AB_NEGATIVE',
}

export const BloodTypeLabels: { [key in BloodType]: string; } = {
    [BloodType.A_POSITIVE]: 'A+',
    [BloodType.A_NEGATIVE]: 'A-',
    [BloodType.B_POSITIVE]: 'B+',
    [BloodType.B_NEGATIVE]: 'B-',
    [BloodType.O_POSITIVE]: 'O+',
    [BloodType.O_NEGATIVE]: 'O-',
    [BloodType.AB_POSITIVE]: 'AB+',
    [BloodType.AB_NEGATIVE]: 'AB-',
}

export const BloodTypeLabelValues: {
    label: string;
    value: BloodType
}[] = Object.values(BloodType).map((value) => ({ label: BloodTypeLabels[value], value }));
