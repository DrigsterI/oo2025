package me.drigster.sonad.controller;

import me.drigster.sonad.entity.Sonastik;
import me.drigster.sonad.repository.SonastikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class SonastikudController {

    @Autowired
    SonastikRepository sonastikRepository;

    @GetMapping("sonastikud")
    public List<Sonastik> getSonastikstikud() {
        return sonastikRepository.findAll();
    }

    @PostMapping("sonastikud")
    public List<Sonastik> addSonastik(@RequestBody Sonastik sonastik) {
        if (sonastik.getName().trim().isEmpty()) {
            throw new RuntimeException("ERROR_NAME_CANT_BE_EMPTY");
        }
        sonastikRepository.save(sonastik);
        return sonastikRepository.findAll();
    }

    @DeleteMapping("sonastikud/{id}")
    public List<Sonastik> deleteSonastik(@PathVariable Long id) {
        sonastikRepository.deleteById(id);
        return sonastikRepository.findAll();
    }

    @GetMapping("sonastikud/{id}")
    public Sonastik getSonastik(@PathVariable Long id) {
        return sonastikRepository.findById(id).orElseThrow();
    }
}