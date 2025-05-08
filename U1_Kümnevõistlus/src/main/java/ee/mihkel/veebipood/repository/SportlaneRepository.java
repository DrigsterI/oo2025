package ee.mihkel.veebipood.repository;

import ee.mihkel.veebipood.entity.Sportlane;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SportlaneRepository extends JpaRepository<Sportlane, Long> {

}
