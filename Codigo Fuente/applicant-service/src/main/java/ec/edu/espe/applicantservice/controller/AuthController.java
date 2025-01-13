package ec.edu.espe.applicantservice.controller;

import ec.edu.espe.applicantservice.dto.AuthApplicantDto;
import ec.edu.espe.applicantservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1.0/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public void register(@RequestBody AuthApplicantDto authApplicantDto) {
        authService.register(authApplicantDto);
    }
}
