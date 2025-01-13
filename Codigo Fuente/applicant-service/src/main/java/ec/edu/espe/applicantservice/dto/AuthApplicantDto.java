package ec.edu.espe.applicantservice.dto;

import ec.edu.espe.applicantservice.enums.IdentificationType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthApplicantDto {
    @NotBlank
    private String identificationNumber;

    @Builder.Default
    private IdentificationType identificationType = IdentificationType.CI;

    @NotNull
    @Email
    private String email;

    @NotNull
    @Length(min = 4)
    private String password;

    @NotNull
    @Length(min = 4)
    private String passwordConfirmation;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String middleName;

    private String secondLastName;

}
