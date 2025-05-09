package me.drigster.sonad.repository;

import me.drigster.sonad.entity.Sona;
import me.drigster.sonad.entity.Sonastik;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SonastikRepository extends JpaRepository<Sonastik, Long> {
}
