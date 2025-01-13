package ec.edu.espe.applicantservice.service.impl;

import ec.edu.espe.applicantservice.config.KeycloakAuthenticatedUser;
import ec.edu.espe.applicantservice.config.KeycloakInitializerConfigurationProperties;
import ec.edu.espe.applicantservice.dto.AuthApplicantDto;
import ec.edu.espe.applicantservice.entity.Applicant;
import ec.edu.espe.applicantservice.entity.PersonalInformation;
import ec.edu.espe.applicantservice.enums.IdentificationType;
import ec.edu.espe.applicantservice.repository.ApplicantRepository;
import ec.edu.espe.applicantservice.repository.PersonalInformationRepository;
import ec.edu.espe.applicantservice.service.AuthService;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.oauth2.jwt.Jwt;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final ApplicantRepository applicantRepository;
    private final PersonalInformationRepository personalInformationRepository;
    private final Keycloak keycloak;
    private final KeycloakInitializerConfigurationProperties keycloakInitializerConfigurationProperties;

    @Override
    @Transactional
    public void register(AuthApplicantDto authApplicant) {
        if (applicantRepository.findFirstByEmail(authApplicant.getEmail().trim()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El correo ya se encuentra registrado");
        }

        if (applicantRepository.findFirstByIdentificationNumber(authApplicant.getIdentificationNumber().trim()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La cédula ya se encuentra registrada");
        }

        try (Response response = keycloak
                    .realm(keycloakInitializerConfigurationProperties.getApplicationRealm())
                    .users()
                    .create(getUserRepresentation(authApplicant))) {

            String location = response.getHeaderString("Location");
            String userId = location.substring(location.lastIndexOf("/") + 1);

            if (response.getStatus() != 201) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Ha ocurrido un error al crear el usuario");
            }

            if (response.getStatus() == 409) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "El usuario ya se encuentra registrado");
            }

            try {
                Applicant applicant = Applicant.builder()
                        .email(authApplicant.getEmail().trim())
                        .identificationNumber(authApplicant.getIdentificationNumber().trim())
                        .keycloakUid(userId.trim())
                        .createdAt(LocalDateTime.now())
                        .createdBy("SYSTEM")
                        .build();

                Applicant savedApplicant = applicantRepository.save(applicant);
                PersonalInformation personalInformation = PersonalInformation.builder()
                        .applicant(savedApplicant)
                        .email(authApplicant.getEmail().trim())
                        .identificationNumber(authApplicant.getIdentificationNumber().trim())
                        .identificationType(IdentificationType.CI)
                        .firstName(authApplicant.getFirstName())
                        .lastName(authApplicant.getLastName())
                        .middleName(authApplicant.getMiddleName())
                        .secondLastName(authApplicant.getSecondLastName())
                        .createdAt(LocalDateTime.now())
                        .createdBy("SYSTEM")
                        .build();

                personalInformationRepository.save(personalInformation);
            } catch (Exception e) {
                keycloak.realm(keycloakInitializerConfigurationProperties.getApplicationRealm())
                        .users()
                        .delete(userId);

                e.printStackTrace();
                throw new RuntimeException("Ha ocurrido un error al crear el usuario");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Ha ocurrido un error al crear el usuario");
        }
    }

    @Override
    public KeycloakAuthenticatedUser getAuthenticatedUser() {
        final Jwt principal = (Jwt) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        Map<String, Object> customClaims = principal.getClaims();
        KeycloakAuthenticatedUser.KeycloakAuthenticatedUserBuilder userBuilder = KeycloakAuthenticatedUser.builder();

        if (customClaims.containsKey("sub")) {
            userBuilder.id(String.valueOf(customClaims.get("sub")));
        }

        if (customClaims.containsKey("preferred_username")) {
            userBuilder.username(String.valueOf(customClaims.get("preferred_username")));
        }

        if (customClaims.containsKey("email")) {
            userBuilder.email(String.valueOf(customClaims.get("email")));
        }

        if (customClaims.containsKey("email_verified")) {
            userBuilder.emailVerified(Boolean.parseBoolean(String.valueOf(customClaims.get("email_verified"))));
        }

        return userBuilder.build();
    }

    private UserRepresentation getUserRepresentation(AuthApplicantDto applicant) {
        UserRepresentation user = new UserRepresentation();
        CredentialRepresentation credential = new CredentialRepresentation();

        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(applicant.getPassword());

        user.setUsername(applicant.getEmail().trim());
        user.setEmail(applicant.getEmail().trim());
        user.setEnabled(true);
        user.setEmailVerified(true);
        user.setFirstName(applicant.getFirstName());
        user.setLastName(applicant.getLastName());
        user.setCredentials(List.of(credential));

        return user;
    }
}
