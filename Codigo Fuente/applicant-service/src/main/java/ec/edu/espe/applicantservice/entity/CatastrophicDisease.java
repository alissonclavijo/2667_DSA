package ec.edu.espe.applicantservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "UZPTTIPOENFCATAS")
@Entity
public class CatastrophicDisease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UZPTTIPOENFCATAS_ID")
    private Long id;

    @Column(name = "UZPTTIPOENFCATAS_ORDEN")
    private int order;

    @Column(name = "UZPTTIPOENFCATAS_NOMBRE")
    private String name;
}
