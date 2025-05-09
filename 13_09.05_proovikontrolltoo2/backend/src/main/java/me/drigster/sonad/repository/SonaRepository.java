package me.drigster.sonad.repository;

import me.drigster.sonad.entity.Sona;
import me.drigster.sonad.entity.Sonastik;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SonaRepository extends JpaRepository<Sona, Long> {
    Page<Sona> findAll(Pageable pageable);
    Page<Sona> findBySonastik(Sonastik sonastik, Pageable pageable);
    Page<Sona> findByTypeContaining(String type, Pageable pageable);
    Page<Sona> findByTypeContainingAndSonastik(String type, Sonastik sonastik, Pageable pageable);
}
