package ec.edu.espe.applicantservice.controller;

import ec.edu.espe.applicantservice.dto.*;
import ec.edu.espe.applicantservice.service.ApplicantService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1.0/applicant")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class ApplicantController {
    private final ApplicantService applicantService;

    @GetMapping("/me")
    public ApplicantDto getApplicant() {
        return applicantService.getAuthenticatedApplicant();
    }

    @PostMapping("/{applicantId}/personal-information")
    public void savePersonalInformation(
            @PathVariable Long applicantId,
            @RequestBody PersonalInformationDto personalInformation) {}

    @PostMapping("/{applicantId}/academic-background")
    public void saveAcademicBackground(
            @PathVariable Long applicantId,
            @RequestBody List<AcademicBackgroundDto> academicBackground) {}

    @PostMapping("/{applicantId}/professional-experience")
    public void saveProfessionalExperience(
            @PathVariable Long applicantId,
            @RequestBody List<ProfessionalExperienceDto> professionalExperience) {}

    @PostMapping("/{applicantId}/publications")
    public void savePublications(
            @PathVariable Long applicantId,
            @RequestBody List<PublicationDto> publications) {}

    @PostMapping("/{applicantId}/languages")
    public void saveLanguages(
            @PathVariable Long applicantId,
            @RequestBody List<LanguageDto> languages) {}
}
