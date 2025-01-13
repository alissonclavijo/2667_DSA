package ec.edu.espe.applicantservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(final HttpSecurity http) throws Exception {
        http.formLogin(AbstractHttpConfigurer::disable);
        http.httpBasic(AbstractHttpConfigurer::disable);
        http.csrf(AbstractHttpConfigurer::disable);
        http.cors(Customizer.withDefaults());

        http.authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll());
        http.oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults()));

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of(
                "*"
        ));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"));
        corsConfiguration.setAllowedHeaders(List.of("*"));
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        final JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(source -> mapAuthorities(source.getClaims()));
        return converter;
    }

    private List<GrantedAuthority> mapAuthorities(final Map<String, Object> attributes) {
        /*
        {
          "exp": 1736621611,
          "iat": 1736621311,
          "jti": "12f88b20-adb4-4af1-adde-e8d5198d8e65",
          "iss": "http://localhost:8040/realms/EspeRealm",
          "aud": "account",
          "sub": "32757d99-8c68-4204-804f-a27d2a813cf1",
          "typ": "Bearer",
          "azp": "EspeClient",
          "sid": "5e9e8c09-08e2-46cd-a626-f2b25d1dbe7f",
          "acr": "1",
          "allowed-origins": [
            "http://localhost:4200"
          ],
          "realm_access": {
            "roles": [
              "offline_access",
              "uma_authorization",
              "default-roles-esperealm"
            ]
          },
          "resource_access": {
            "EspeClient": {
              "roles": [
                "admin",
                "user"
              ]
            },
            "account": {
              "roles": [
                "manage-account",
                "manage-account-links",
                "view-profile"
              ]
            }
          },
          "scope": "openid email profile",
          "email_verified": true,
          "name": "Admin Admin",
          "preferred_username": "admin",
          "given_name": "Admin",
          "family_name": "Admin",
          "email": "ksprwhite@gmail.com"
        }
        */
        final Map<String, Object> realmAccess =
                ((Map<String, Object>)attributes.getOrDefault("resource_access", Collections.emptyMap()));
        final Map<String, Object> client =
                ((Map<String, Object>)realmAccess.getOrDefault("EspeClient", Collections.emptyMap()));
        final Collection<String> roles =
                ((Collection<String>)client.getOrDefault("roles", Collections.emptyList()));
        return roles.stream()
                .map(role -> ((GrantedAuthority)new SimpleGrantedAuthority("ROLE_" + role.toUpperCase())))
                .toList();
    }
}
