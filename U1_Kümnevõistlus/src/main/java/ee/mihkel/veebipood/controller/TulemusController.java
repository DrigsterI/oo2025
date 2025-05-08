package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.ScoreType;
import ee.mihkel.veebipood.entity.Tulemus;
import ee.mihkel.veebipood.repository.TulemusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class TulemusController {

    @Autowired
    TulemusRepository tulemusRepository;

    @GetMapping("tulemused")
    public List<Tulemus> getTulemus() {
        return tulemusRepository.findAll();
    }

    @GetMapping("tulemusedPaged")
    public Page<Tulemus> getTulemusPages(Pageable pageable) {
        return tulemusRepository.findAll(pageable);
    }

    @PostMapping("tulemused")
    public List<Tulemus> addTulemus(@RequestBody Tulemus tulemus) {
        if (tulemus.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (tulemus.getSportlane() == null) {
            throw new RuntimeException("ERROR_SPORTLANE_CANT_BE_NULL");
        }
        if (tulemus.getPunktid() <= 0) {
            throw new RuntimeException("ERROR_PUNKTIND_MUST_BE_POSITIVE");
        }
        tulemusRepository.save(tulemus);
        return tulemusRepository.findAll();
    }

    @DeleteMapping("tulemused/{id}")
    public List<Tulemus> deleteTulemus(@PathVariable Long id) {
        tulemusRepository.deleteById(id);
        return tulemusRepository.findAll();
    }

    @PutMapping("tulemused")
    public List<Tulemus> editTulemus(@RequestBody Tulemus tulemus) {
        if (tulemus.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if (tulemus.getSportlane() == null) {
            throw new RuntimeException("ERROR_SPORTLANE_CANT_BE_NULL");
        }
        if (tulemus.getPunktid() <= 0) {
            throw new RuntimeException("ERROR_PUNKTIND_MUST_BE_POSITIVE");
        }
        tulemusRepository.save(tulemus);
        return tulemusRepository.findAll();
    }

    @GetMapping("tulemused/{id}")
    public Tulemus getTulemus(@PathVariable Long id) {
        return tulemusRepository.findById(id).orElseThrow();
    }

    @PatchMapping("tulemused/{id}")
    public List<Tulemus> editTulemusValue(@PathVariable Long id, String field, String value) {
        if (id == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        Tulemus tulemus = tulemusRepository.findById(id).orElseThrow();
        switch (field) {
            case "tupp" -> {
                ScoreType tupp = Enum.valueOf(ScoreType.class, value);

                tulemus.setTupp(tupp);
            }
            case "punktid" -> {
                int punktid = Integer.parseInt(value);
                if (punktid <= 0) {
                    throw new RuntimeException("ERROR_PUNKTIND_MUST_BE_POSITIVE");
                }
                tulemus.setPunktid(punktid);
            }
        }
        tulemusRepository.save(tulemus);
        return tulemusRepository.findAll();
    }
}