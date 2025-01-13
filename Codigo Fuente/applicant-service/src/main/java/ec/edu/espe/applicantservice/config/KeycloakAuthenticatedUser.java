package ec.edu.espe.applicantservice.config;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KeycloakAuthenticatedUser {
    private String id;
    private String username;
    private String email;
    private boolean emailVerified;
    private List<String> roles;
}
