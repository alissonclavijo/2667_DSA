export enum AcademicDurationType {
    SEMESTER = 'SEMESTER',
    YEAR = 'YEAR',
}

export const AcademicDurationTypeLabels: { [key in AcademicDurationType]: string; } = {
    [AcademicDurationType.SEMESTER]: 'Semestre(s)',
    [AcademicDurationType.YEAR]: 'Año(s)',
}

export const AcademicDurationTypeLabelValues: {
    label: string;
    value: AcademicDurationType
}[] = Object.values(AcademicDurationType).map((value) => ({ label: AcademicDurationTypeLabels[value], value }));
