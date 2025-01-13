package ec.edu.espe.applicantservice.service;

import ec.edu.espe.applicantservice.config.KeycloakAuthenticatedUser;
import ec.edu.espe.applicantservice.dto.AuthApplicantDto;

public interface AuthService {
    void register(AuthApplicantDto applicant);
    KeycloakAuthenticatedUser getAuthenticatedUser();
}
