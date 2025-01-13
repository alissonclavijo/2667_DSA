export enum PublicationType {
    ARTICLES = 'articles',
    BOOKS = 'books',
    BROCHURES = 'brochures',
    POLYGRAPHED = 'polygraphed',
    MAGAZINES = 'magazines'
}

export const PublicationTypeLabels = {
    [PublicationType.ARTICLES]: 'Artículos',
    [PublicationType.BOOKS]: 'Libros',
    [PublicationType.BROCHURES]: 'Folletos',
    [PublicationType.POLYGRAPHED]: 'Poligrafiados',
    [PublicationType.MAGAZINES]: 'Revistas'
};

export const PublicationTypeLabelValues: {
    label: string;
    value: PublicationType
}[] = Object.values(PublicationType).map((value) => ({ label: PublicationTypeLabels[value], value }));
