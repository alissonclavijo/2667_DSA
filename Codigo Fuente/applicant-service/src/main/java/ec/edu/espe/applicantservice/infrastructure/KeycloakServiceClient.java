package ec.edu.espe.applicantservice.infrastructure;

import ec.edu.espe.applicantservice.dto.KeycloakUserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "keycloak-service")
public interface KeycloakServiceClient {
    @PostMapping("/realms/EspeRealm/protocol/openid-connect/token")
    void getToken();

    @PostMapping("/admin/realms/EspeRealm/users")
    void createUser(@RequestBody KeycloakUserDto user);
}
