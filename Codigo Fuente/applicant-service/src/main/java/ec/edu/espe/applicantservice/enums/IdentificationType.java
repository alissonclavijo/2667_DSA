package ec.edu.espe.applicantservice.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum IdentificationType {
    CI("Cédula de Identidad"),
    PASSPORT("Pasaporte"),
    RUC("Registro Único de Contribuyentes");

    private final String description;
}
