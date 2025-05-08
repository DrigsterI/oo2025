package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.*;
import ee.mihkel.veebipood.repository.SportlaneRepository;
import ee.mihkel.veebipood.repository.TulemusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class SportlaneController {

    @Autowired
    SportlaneRepository sportlaneRepository;
    @Autowired
    private TulemusRepository tulemusRepository;

    @GetMapping("sportlased")
    public List<SportlanePunktiga> getSportlane() {
        List<Sportlane> sportlased = sportlaneRepository.findAll();

        return sportlased.stream().map((sportlane) -> {
            int punktidKokku = calculatePunktid(sportlane.getId());
            return new SportlanePunktiga(sportlane, punktidKokku);
        }).collect(Collectors.toList());
    }

    @GetMapping("sportlasedPaged")
    public Page<SportlanePunktiga> getSportlanePages(Pageable pageable) {
        Page<Sportlane> sportlased = sportlaneRepository.findAll(pageable);

        return sportlased.map((sportlane) -> {
            int punktidKokku = calculatePunktid(sportlane.getId());
            return new SportlanePunktiga(sportlane, punktidKokku);
        });
    }

    @GetMapping("sportlasedFilteredPaged")
    public Page<SportlanePunktiga> getSportlanePages(@RequestParam String riik, Pageable pageable) {
        Page<Sportlane> sportlased = null;
        if(riik.trim().isEmpty()){
            sportlased = sportlaneRepository.findAll(pageable);
        }
        else{
            sportlased = sportlaneRepository.findByRiikContaining(riik, pageable);
        }

        return sportlased.map((sportlane) -> {
            int punktidKokku = calculatePunktid(sportlane.getId());
            return new SportlanePunktiga(sportlane, punktidKokku);
        });
    }

    @PostMapping("sportlased")
    public List<Sportlane> addSportlane(@RequestBody Sportlane sportlane) {
        if (sportlane.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (sportlane.getNimi().trim().isEmpty()) {
            throw new RuntimeException("ERROR_NIMI_MUST_NOT_BE_EMPTY");
        }
        if (sportlane.getRiik().trim().isEmpty()) {
            throw new RuntimeException("ERROR_RIIK_MUST_NOT_BE_EMPTY");
        }
        if (sportlane.getVanus() <= 0) {
            throw new RuntimeException("ERROR_VANUS_MUST_BE_POSITIVE");
        }
        sportlaneRepository.save(sportlane);
        return sportlaneRepository.findAll();
    }

    @DeleteMapping("sportlased/{id}")
    public List<Sportlane> deleteSportlane(@PathVariable Long id) {
        sportlaneRepository.deleteById(id);
        return sportlaneRepository.findAll();
    }

    @PutMapping("sportlased")
    public List<Sportlane> editSportlane(@RequestBody Sportlane sportlane) {
        if (sportlane.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if (sportlane.getNimi().trim().isEmpty()) {
            throw new RuntimeException("ERROR_NIMI_MUST_NOT_BE_EMPTY");
        }
        if (sportlane.getRiik().trim().isEmpty()) {
            throw new RuntimeException("ERROR_RIIK_MUST_NOT_BE_EMPTY");
        }
        if (sportlane.getVanus() <= 0) {
            throw new RuntimeException("ERROR_VANUS_MUST_BE_POSITIVE");
        }
        sportlaneRepository.save(sportlane);
        return sportlaneRepository.findAll();
    }

    @GetMapping("sportlased/{id}")
    public Sportlane getSportlane(@PathVariable Long id) {
        return sportlaneRepository.findById(id).orElseThrow();
    }

    @GetMapping("sportlased/{id}/punktid")
    public int getSportlanePunktid(@PathVariable Long id) {
        return calculatePunktid(id);
    }

    private int calculatePunktid(long id){
        List<Tulemus> tilemused = tulemusRepository.findBySportlane_Id(id);
        int punktidKukku = 0;
        for (Tulemus t : tilemused) {
            Parameters params = t.getParameters();
            switch (params.dataType){
                case SECONDS:
                    punktidKukku += (int)(params.A * Math.pow(params.B - t.getPunktid(), params.C));
                    break;
                case METERS:
                case CENTIMETERS:
                    punktidKukku += (int)(params.A * Math.pow((params.dataType == DataType.CENTIMETERS ? t.getPunktid() * 100 : t.getPunktid()) - params.B, params.C));
                    break;
                default:
                    throw new RuntimeException("Unsupported tupp " + t.getTupp());
            }
        }

        return punktidKukku;
    }

    @PatchMapping("sportlased/{id}")
    public List<Sportlane> editSportlaneValue(@PathVariable Long id, String field, String value) {
        Sportlane sportlane = sportlaneRepository.findById(id).orElseThrow();
        switch (field) {
            case "nimi" -> {
                if (sportlane.getNimi().trim().isEmpty()) {
                    throw new RuntimeException("ERROR_NIMI_MUST_NOT_BE_EMPTY");
                }
                sportlane.setNimi(value);
            }
            case "riik" -> {
                if (sportlane.getRiik().trim().isEmpty()) {
                    throw new RuntimeException("ERROR_RIIK_MUST_NOT_BE_EMPTY");
                }
                sportlane.setRiik(value);
            }
            case "vanus" -> {
                int vanus = Integer.parseInt(value);
                if (vanus <= 0) {
                    throw new RuntimeException("ERROR_VANUS_MUST_BE_POSITIVE");
                }
                sportlane.setVanus(vanus);
            }
        }
        sportlaneRepository.save(sportlane);
        return sportlaneRepository.findAll();
    }
}