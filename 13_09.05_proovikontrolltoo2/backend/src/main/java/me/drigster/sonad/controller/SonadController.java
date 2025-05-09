package me.drigster.sonad.controller;

import me.drigster.sonad.entity.Sona;
import me.drigster.sonad.entity.Sonastik;
import me.drigster.sonad.repository.SonaRepository;
import me.drigster.sonad.repository.SonastikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class SonadController {

    @Autowired
    SonaRepository sonaRepository;
    @Autowired
    private SonastikRepository sonastikRepository;

    @GetMapping("sonad")
    public List<Sona> getSonad() {
        return sonaRepository.findAll(Sort.by("typeID").ascending());
    }

    @GetMapping("sonadPaged")
    public Page<Sona> getSonadPages(@RequestParam(required = false) String search, @RequestParam(required = false) String filterSonastik, Pageable pageable) {
        if(filterSonastik != null){
            Sonastik sonastik = sonastikRepository.findById(Long.parseLong(filterSonastik)).orElse(null);
            if(search != null) {
                return sonaRepository.findByTypeContainingAndSonastik(search, sonastik, pageable);
            }
            return sonaRepository.findBySonastik(sonastik, pageable);
        }
        else {
            if(search != null) {
                return sonaRepository.findByTypeContaining(search, pageable);
            }
            return sonaRepository.findAll(pageable);
        }
    }

    @PostMapping("sonad")
    public List<Sona> addSona(@RequestBody Sona sona) {
        if (sona.getTypeID() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (sona.getType().trim().isEmpty()) {
            throw new RuntimeException("ERROR_TYPE_CANT_BE_EMPTY");
        }
        if (sona.getDescription().trim().isEmpty()) {
            throw new RuntimeException("ERROR_DESCRIPTION_CANT_BE_EMPTY");
        }
        sonaRepository.save(sona);
        return sonaRepository.findAll();
    }

    @DeleteMapping("sonad/{id}")
    public List<Sona> deleteSona(@PathVariable Long id) {
        sonaRepository.deleteById(id);
        return sonaRepository.findAll();
    }

    @PutMapping("sona")
    public List<Sona> editSona(@RequestBody Sona sona) {
        if (sona.getTypeID() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if (sona.getType().trim().isEmpty()) {
            throw new RuntimeException("ERROR_TYPE_CANT_BE_EMPTY");
        }
        if (sona.getDescription().trim().isEmpty()) {
            throw new RuntimeException("ERROR_DESCRIPTION_CANT_BE_EMPTY");
        }
        sonaRepository.save(sona);
        return sonaRepository.findAll();
    }

    @PostMapping("sonadBulk")
    public List<Sona> addSonad(@RequestBody List<Sona> sonad) {
        for (Sona sona : sonad){
            try {
                sonaRepository.save(sona);
            } catch (Exception e) {
                System.out.println(e);
            }
        }
        return sonaRepository.findAll();
    }

    @GetMapping("sonad/{id}")
    public Sona getSona(@PathVariable Long id) {
        return sonaRepository.findById(id).orElseThrow();
    }

    @PatchMapping("sonad/{id}")
    public List<Sona> editSonaValue(@PathVariable Long id, @RequestParam String field, @RequestParam String value) {
        if (id == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        Sona sona = sonaRepository.findById(id).orElseThrow();
        switch (field) {
            case "type" -> {
                if (value.trim().isEmpty()) {
                    throw new RuntimeException("ERROR_TYPE_CANT_BE_EMPTY");
                }

                sona.setType(value);
            }
            case "description" -> {
                if (value.trim().isEmpty()) {
                    throw new RuntimeException("ERROR_DESCRIPTION_CANT_BE_EMPTY");
                }

                sona.setDescription(value);
            }
            case "sonastik" -> {
                Sonastik sonastik = sonastikRepository.findById(Long.parseLong(value)).orElseThrow();

                sona.setSonastik(sonastik);
            }
        }
        sonaRepository.save(sona);
        return sonaRepository.findAll();
    }
}