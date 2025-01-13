package ec.edu.espe.applicantservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KeycloakUserDto {
    private String id;
    private String username;
    private String email;
    private boolean enabled;
    private boolean emailVerified;
    private String firstName;
    private String lastName;
}
