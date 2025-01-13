package ec.edu.espe.applicantservice.repository;

import ec.edu.espe.applicantservice.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    Optional<Applicant> findFirstByEmail(String email);
    Optional<Applicant> findFirstByIdentificationNumber(String identificationNumber);
    Optional<Applicant> findFirstByKeycloakUid(String keycloakUid);
}
