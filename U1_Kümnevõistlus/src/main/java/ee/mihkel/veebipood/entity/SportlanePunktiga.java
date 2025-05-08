package ee.mihkel.veebipood.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SportlanePunktiga extends Sportlane {
    private int punktid;

    public SportlanePunktiga(Sportlane sportlane, int punktid) {
        super(sportlane.getId(), sportlane.getNimi(), sportlane.getRiik(), sportlane.getVanus());
        this.punktid = punktid;
    }
}
