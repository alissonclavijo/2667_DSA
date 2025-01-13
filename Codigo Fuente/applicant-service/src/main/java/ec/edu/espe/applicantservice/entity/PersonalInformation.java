package ec.edu.espe.applicantservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ec.edu.espe.applicantservice.enums.BloodType;
import ec.edu.espe.applicantservice.enums.ContactRelationship;
import ec.edu.espe.applicantservice.enums.IdentificationType;
import ec.edu.espe.applicantservice.enums.Sex;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "UZPTINFOPERSONAL")
@Entity
public class PersonalInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UZPTINFOPERSONAL_ID")
    private Long id;

    @Column(name = "UZPTINFOPERSONAL_FOTO")
    private byte[] photo;

    @Column(name = "UZPTINFOPERSONAL_NUMERO_IDEN")
    private String identificationNumber;

    @Column(name = "UZPTINFOPERSONAL_TIPO_IDENTI")
    private IdentificationType identificationType;

    @Column(name = "UZPTINFOPERSONAL_PRIMER_NOMB")
    private String firstName;

    @Column(name = "UZPTINFOPERSONAL_SEGUNDO_NOM")
    private String middleName;

    @Column(name = "UZPTINFOPERSONAL_APELLIDO_PA")
    private String lastName;

    @Column(name = "UZPTINFOPERSONAL_APELLIDO_MA")
    private String secondLastName;

    @Column(name = "UZPTINFOPERSONAL_FECHA_NACIM")
    private LocalDate birthDate;

    @Column(name = "UZPTINFOPERSONAL_SEXO")
    private Sex sex;

    @Column(name = "UZPTINFOPERSONAL_GENERO")
    private String genreReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_TIPO_SANGRE")
    private BloodType bloodType;

    @Column(name = "UZPTINFOPERSONAL_ESTADO_CIVI")
    private String civilStatusReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_NACIONALIDA")
    private String nationalityReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_TIEMPO_RESI")
    private int residenceYears;

    @Column(name = "UZPTINFOPERSONAL_ETNIA")
    private String ethnicityReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_GRUPO_ETNIC")
    private String ethnicGroupReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_EMAIL")
    private String email;

    @Column(name = "UZPTINFOPERSONAL_EMAIL_ALTER")
    private String secondaryEmail;

    @Column(name = "UZPTINFOPERSONAL_CAPACIESP")
    private boolean hasDisability;

    @Column(name = "UZPTINFOPERSONAL_PORCENTAJEDIS")
    private int disabilityPercentage;

    @Column(name = "UZPTINFOPERSONAL_TIPODISCAP")
    private String disabilityTypeReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_CARNET_MSP")
    private String mspIdentificationNumber;

    @Column(name = "UZPTINFOPERSONAL_ENFERCATAS")
    private boolean hasCatastrophicDisease;

    @Column(name = "UZPTINFOPERSONAL_CON_PAISCOD")
    private String contactCountryReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_CON_PROVCOD")
    private String contactProvinceReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_CON_CANTONCOD")
    private String contactCantonReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_CON_PARRCOD")
    private String contactParishReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_CON_CALLE")
    private String contactMainStreet;

    @Column(name = "UZPTINFOPERSONAL_CON_CALLE2")
    private String contactSecondaryStreet;

    @Column(name = "UZPTINFOPERSONAL_CON_NUMERO")
    private String contactAddressNumber;

    @Column(name = "UZPTINFOPERSONAL_CON_REF")
    private String contactAddressReference;

    @Column(name = "UZPTINFOPERSONAL_CON_TELEFONO")
    private String contactPhone;

    @Column(name = "UZPTINFOPERSONAL_CON_CELULAR")
    private String contactCellPhone;

    @Column(name = "UZPTINFOPERSONAL_CON_TELFTRAB")
    private String contactWorkPhone;

    @Column(name = "UZPTINFOPERSONAL_CON_TELFTEXT")
    private String contactWorkPhoneExtension;

    @Column(name = "UZPTINFOPERSONAL_CONE_NOMBRES")
    private String emergencyContactName;

    @Column(name = "UZPTINFOPERSONAL_CONE_TIPODOC")
    private IdentificationType emergencyContactIdentificationType;

    @Column(name = "UZPTINFOPERSONAL_CONE_NUMDOC")
    private String emergencyContactIdentificationNumber;

    @Column(name = "UZPTINFOPERSONAL_CONE_PARENT")
    private ContactRelationship emergencyContactRelationship;

    @Column(name = "UZPTINFOPERSONAL_CONE_PROVCOD")
    private String emergencyContactProvinceReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_CONE_CANTCOD")
    private String emergencyContactCantonReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_CONE_PARRCOD")
    private String emergencyContactParishReferenceCode;

    @Column(name = "UZPTINFOPERSONAL_CONE_CALLE")
    private String emergencyContactMainStreet;

    @Column(name = "UZPTINFOPERSONAL_CONE_CALLE2")
    private String emergencyContactSecondaryStreet;

    @Column(name = "UZPTINFOPERSONAL_CONE_NUMERO")
    private String emergencyContactAddressNumber;

    @Column(name = "UZPTINFOPERSONAL_CONE_REF")
    private String emergencyContactAddressReference;

    @Column(name = "UZPTINFOPERSONAL_CONE_TELEFONO")
    private String emergencyContactPhone;

    @Column(name = "UZPTINFOPERSONAL_CONE_CELULAR")
    private String emergencyContactCellPhone;

    @Column(name = "UZPTINFOPERSONAL_CREATEDAT")
    private LocalDateTime createdAt;

    @Column(name = "UZPTINFOPERSONAL_MODIFIEDAT")
    private LocalDateTime modifiedAt;

    @Column(name = "UZPTINFOPERSONAL_CREATEDBY")
    private String createdBy;

    @Column(name = "UZPTINFOPERSONAL_MODIFIEDBY")
    private String modifiedBy;

    @ManyToOne
    @JoinColumn(name = "UZPTTIPOENFCATAS_ID")
    private CatastrophicDisease catastrophicDisease;

    @OneToOne
    @JoinColumn(name = "UZPTPOSTULANTE_ID")
    @JsonIgnore
    private Applicant applicant;
}
