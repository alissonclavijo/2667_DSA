package ec.edu.espe.applicantservice.service.impl;

import ec.edu.espe.applicantservice.config.KeycloakAuthenticatedUser;
import ec.edu.espe.applicantservice.dto.ApplicantDto;
import ec.edu.espe.applicantservice.entity.Applicant;
import ec.edu.espe.applicantservice.repository.ApplicantRepository;
import ec.edu.espe.applicantservice.service.ApplicantService;
import ec.edu.espe.applicantservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ApplicantServiceImpl implements ApplicantService {
    private final ApplicantRepository applicantRepository;
    private final AuthService authService;
    private final ModelMapper modelMapper;

    @Override
    public ApplicantDto getAuthenticatedApplicant() {
        KeycloakAuthenticatedUser keycloakAuthenticatedUser = authService.getAuthenticatedUser();
        Applicant applicant = applicantRepository
                .findFirstByKeycloakUid(keycloakAuthenticatedUser.getId()).orElse(null);

        if (applicant == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se ha encontrado el postulante");
        }

        return modelMapper.map(applicant, ApplicantDto.class);
    }
}
