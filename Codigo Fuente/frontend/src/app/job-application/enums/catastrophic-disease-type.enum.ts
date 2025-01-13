export enum CatastrophicDiseaseType {
    CONGENITAL_HEART_MALFORMATION = 'CONGENITAL_HEART_MALFORMATION',
    CANCER = 'CANCER',
    CHRONIC_RENAL_INSUFFICIENCY = 'CHRONIC_RENAL_INSUFFICIENCY',
    ORGAN_TRANSPLANT = 'ORGAN_TRANSPLANT',
    SEQUELAE_SEVERE_BURN = 'SEQUELAE_SEVERE_BURN',
    CEREBRAL_ARTERIOVENOUS_MALFORMATION = 'CEREBRAL_ARTERIOVENOUS_MALFORMATION',
    KLIPPEL_TRENAUNAY_SYNDROME = 'KLIPPEL_TRENAUNAY_SYNDROME',
    THORACIC_ABDOMINAL_ANEURYSM = 'THORACIC_ABDOMINAL_ANEURYSM',
}

export const CatastrophicDiseaseTypeLabels: { [key in CatastrophicDiseaseType]: string; } = {
    [CatastrophicDiseaseType.CONGENITAL_HEART_MALFORMATION]: 'Todo tipo de malformaciones congénitas de corazón',
    [CatastrophicDiseaseType.CANCER]: 'Todo tipo de cáncer',
    [CatastrophicDiseaseType.CHRONIC_RENAL_INSUFFICIENCY]: 'Insuficiencia renal crónica',
    [CatastrophicDiseaseType.ORGAN_TRANSPLANT]: 'Trasplante de órganos: riñón, hígado, medula ósea',
    [CatastrophicDiseaseType.SEQUELAE_SEVERE_BURN]: 'Secuelas e quemaduras graves',
    [CatastrophicDiseaseType.CEREBRAL_ARTERIOVENOUS_MALFORMATION]: 'Malformaciones arterio venosas cerebrales',
    [CatastrophicDiseaseType.KLIPPEL_TRENAUNAY_SYNDROME]: 'Síndrome de Klippel-Trenaunay',
    [CatastrophicDiseaseType.THORACIC_ABDOMINAL_ANEURYSM]: 'Aneurisma torácico abdominal',
}

export const CatastrophicDiseaseTypeLabelValues: {
    label: string;
    value: CatastrophicDiseaseType
}[] = Object.entries(CatastrophicDiseaseType).map(([key, value]) => ({ label: CatastrophicDiseaseTypeLabels[value], value }));
