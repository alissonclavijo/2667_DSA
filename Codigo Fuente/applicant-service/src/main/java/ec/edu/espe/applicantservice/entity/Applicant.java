package ec.edu.espe.applicantservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "UZPTPOSTULANTE")
@Entity
public class Applicant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UZPTPOSTULANTE_ID")
    private Long id;

    @Column(name = "UZPTPOSTULANTE_CEDULA")
    private String identificationNumber;

    @Column(name = "UZPTPOSTULANTE_KEYCLOAK_UID")
    private String keycloakUid;

    @Column(name = "UZPTPOSTULANTE_EMAIL")
    private String email;

    @Column(name = "UZPTPOSTULANTE_CREATEDAT")
    private LocalDateTime createdAt;

    @Column(name = "UZPTPOSTULANTE_MODIFIEDAT")
    private LocalDateTime modifiedAt;

    @Column(name = "UZPTPOSTULANTE_CREATEDBY")
    private String createdBy;

    @Column(name = "UZPTPOSTULANTE_MODIFIEDBY")
    private String modifiedBy;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "applicant")
    private PersonalInformation personalInformation;
}
