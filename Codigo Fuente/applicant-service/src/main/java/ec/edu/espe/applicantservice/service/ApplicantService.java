package ec.edu.espe.applicantservice.service;

import ec.edu.espe.applicantservice.dto.ApplicantDto;
import ec.edu.espe.applicantservice.entity.Applicant;

public interface ApplicantService {
    ApplicantDto getAuthenticatedApplicant();
}
