export const environment = {
    api: {
        applicantService: {
            url: '${APPLICANT_SERVICE_URL:-http://localhost:8050}',
            host: '${APPLICANT_SERVICE_HOST:-localhost:8050}',
        },
    },
    keycloak: {
        config: {
            url: '${KEYCLOAK_URL:-http://localhost:8040}',
            realm: '${KEYCLOAK_REALM:-EspeRealm}',
            clientId: '${KEYCLOAK_CLIENT_ID:-EspeClient}',
        }
    }
};
