package ec.edu.espe.applicantservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantDto {
    interface SavePersonalInformation {}
    interface SaveAcademicBackground {}
    interface SaveProfessionalExperience {}
    interface SaveLanguages {}
    interface SavePublications {}

    @NotNull
    private Long id;

    private String identificationNumber;

    @JsonIgnore
    private String keycloakUid;
    private String email;

    private PersonalInformationDto personalInformation;
    private List<AcademicBackgroundDto> academicBackground;
    private List<ProfessionalExperienceDto> professionalExperience;
    private List<LanguageDto> languages;
    private List<PublicationDto> publications;
}
