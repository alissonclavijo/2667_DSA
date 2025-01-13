export const environment = {
    api: {
        applicantService: {
            url: 'http://localhost:8050',
            host: 'localhost:8050',
        },
    },
    keycloak: {
        config: {
            url: 'http://localhost:8040',
            realm: 'EspeRealm',
            clientId: 'EspeClient',
        }
    }
};
