export enum DisabilityType {
    AUDITIVE = 'AUDITIVE',
    PHYSICAL = 'PHYSICAL',
    VISUAL = 'VISUAL',
    INTELLECTUAL = 'INTELLECTUAL',
}

export const DisabilityTypeLabels: { [key in DisabilityType]: string; } = {
    [DisabilityType.AUDITIVE]: 'Auditiva',
    [DisabilityType.PHYSICAL]: 'Física',
    [DisabilityType.VISUAL]: 'Visual',
    [DisabilityType.INTELLECTUAL]: 'Intelectual',
}

export const DisabilityTypeLabelValues: {
    label: string;
    value: DisabilityType
}[] = Object.values(DisabilityType).map((value) => ({ label: DisabilityTypeLabels[value], value }));
