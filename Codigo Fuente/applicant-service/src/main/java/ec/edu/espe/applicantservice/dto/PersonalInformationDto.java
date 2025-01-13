package ec.edu.espe.applicantservice.dto;

import ec.edu.espe.applicantservice.enums.BloodType;
import ec.edu.espe.applicantservice.enums.IdentificationType;
import ec.edu.espe.applicantservice.enums.Sex;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonalInformationDto {
    private Long id;
    private String identificationNumber;
    private IdentificationType identificationType;
    private String firstName;
    private String middleName;
    private String lastName;
    private String secondLastName;
    private LocalDate birthDate;
    private Sex sex;
    private String genreReferenceCode;
    private BloodType bloodType;
    private String civilStatusReferenceCode;
    private String nationalityReferenceCode;
    private int residenceYears;
    private String ethnicityReferenceCode;
    private String ethnicGroupReferenceCode;
    private String email;
    private String secondaryEmail;
    private Boolean hasDisability;
    private int disabilityPercentage;
    private String disabilityTypeReferenceCode;
    private String mspIdentificationNumber;
    private boolean hasCatastrophicDisease;
    private String contactCountryReferenceCode;
    private String contactProvinceReferenceCode;
    private String contactCantonReferenceCode;
    private String contactParishReferenceCode;
    private String contactMainStreet;
    private String contactSecondaryStreet;
    private String contactAddressNumber;
    private String contactAddressReference;
    private String contactPhone;
    private String contactCellPhone;
    private String contactWorkPhone;
    private String contactWorkPhoneExtension;
    private String emergencyContactName;
    private IdentificationType emergencyContactIdentificationType;
    private String emergencyContactIdentificationNumber;
    private String emergencyContactRelationship;
    private String emergencyContactProvinceReferenceCode;
    private String emergencyContactCantonReferenceCode;
    private String emergencyContactParishReferenceCode;
    private String emergencyContactMainStreet;
    private String emergencyContactSecondaryStreet;
    private String emergencyContactAddressNumber;
    private String emergencyContactAddressReference;
    private String emergencyContactPhone;
    private String emergencyContactCellPhone;
}
