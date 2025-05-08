package ee.mihkel.veebipood.repository;

import ee.mihkel.veebipood.entity.Sportlane;
import ee.mihkel.veebipood.entity.Tulemus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TulemusRepository extends JpaRepository<Tulemus, Long> {
    List<Tulemus> findBySportlane_Id(Long sportlaneId);
}
