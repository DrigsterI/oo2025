package me.drigster.sonad.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Sona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long typeID;
    private String type;
    private String description;

    @ManyToOne
    private Sonastik sonastik;
}