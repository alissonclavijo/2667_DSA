export enum EducationLevel {
    GRADUATE_MASTERS = 'GRADUATE_MASTERS',
    GRADUATE_DIPLOMA = 'GRADUATE_DIPLOMA',
    GRADUATE_SPECIALIZATION = 'GRADUATE_SPECIALIZATION',
    GRADUATE_DOCTORATE = 'GRADUATE_DOCTORATE',
    BASIC_EDUCATION = 'BASIC_EDUCATION',
    UNIVERSITY_STUDENT = 'UNIVERSITY_STUDENT',
    PRIMARY_EDUCATION = 'PRIMARY_EDUCATION',
    SECONDARY_EDUCATION = 'SECONDARY_EDUCATION',
    BACCALAUREATE = 'BACCALAUREATE',
    WITHOUT_INSTITUTION = 'WITHOUT_INSTITUTION',
    HIGHER_TECHNICIAN = 'HIGHER_TECHNICIAN',
    TECHNOLOGY_DEGREE = 'TECHNOLOGY_DEGREE',
}

export const EducationLevelLabels: { [key in EducationLevel]: string } = {
    [EducationLevel.GRADUATE_MASTERS]: 'Cuarto nivel - Maestría',
    [EducationLevel.GRADUATE_DIPLOMA]: 'Cuarto nivel - Diplomado',
    [EducationLevel.GRADUATE_SPECIALIZATION]: 'Cuarto nivel - Especialidad',
    [EducationLevel.GRADUATE_DOCTORATE]: 'Cuarto nivel - Doctorado',
    [EducationLevel.BASIC_EDUCATION]: 'Educación básica',
    [EducationLevel.UNIVERSITY_STUDENT]: 'Estudiante universitario',
    [EducationLevel.PRIMARY_EDUCATION]: 'Primaria',
    [EducationLevel.SECONDARY_EDUCATION]: 'Secundaria',
    [EducationLevel.BACCALAUREATE]: 'Bachillerato',
    [EducationLevel.WITHOUT_INSTITUTION]: 'Sin institución',
    [EducationLevel.HIGHER_TECHNICIAN]: 'Técnico superior',
    [EducationLevel.TECHNOLOGY_DEGREE]: 'Tecnología',
};

export const EducationLevelLabelValues: {
    label: string;
    value: EducationLevel;
}[] = Object.values(EducationLevel).map((value) => ({
    label: EducationLevelLabels[value],
    value,
}));
