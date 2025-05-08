package ee.mihkel.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Tulemus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private ScoreType tupp;
    private float punktid;

    @ManyToOne
    private Sportlane sportlane;

    public Parameters getParameters() {
        switch (tupp) {
            case M100_JOOKS -> {
                return new Parameters(25.4347f, 18f, 1.81f, DataType.SECONDS);
            }
            case KAUGUSHUPE -> {
                return new Parameters(0.14354f, 220f, 1.4f, DataType.CENTIMETERS);
            }
            case KUULITOUGE -> {
                return new Parameters(51.39f, 1.5f, 1.05f, DataType.METERS);
            }
            case KORGUSHUPE -> {
                return new Parameters(0.8465f, 75f, 1.42f, DataType.CENTIMETERS);
            }
            case M400_JOOKS -> {
                return new Parameters(1.53775f, 82f,1.81f, DataType.SECONDS);
            }
            case M110_TOKKEJOOKS -> {
                return new Parameters(5.74352f, 28.5f, 1.92f, DataType.SECONDS);
            }
            case KETTAHEIDE -> {
                return new Parameters(12.91f, 4f, 1.1f, DataType.METERS);
            }
            case TEIVASHUPE -> {
                return new Parameters(0.2797f, 100f, 1.35f, DataType.CENTIMETERS);
            }
            case ODAVISE -> {
                return new Parameters(10.14f, 7f, 1.08f, DataType.METERS);
            }
            case M1500_JOOKS -> {
                return new Parameters(0.03768f, 480f, 1.85f, DataType.SECONDS);
            }
            default -> {
                throw new IllegalStateException("Unexpected value: " + tupp);
            }
        }
    }
}
/*
0 - 100m jooks
1 - kaugushüpe
2 - kuulitõuge
3 - kõrgushüpe
4 - 400m jooks
5 - 110m tõkkejooks
6 - kettaheide
7 - teivashüpe
8 - odavise
9 - 500m jooks
 */