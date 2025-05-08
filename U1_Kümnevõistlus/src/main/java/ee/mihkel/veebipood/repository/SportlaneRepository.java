package ee.mihkel.veebipood.repository;

import ee.mihkel.veebipood.entity.Sportlane;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SportlaneRepository extends JpaRepository<Sportlane, Long> {
    Page<Sportlane> findAll(Pageable pageable);

    Page<Sportlane> findByRiikContaining(String riik, Pageable pageable);
}
