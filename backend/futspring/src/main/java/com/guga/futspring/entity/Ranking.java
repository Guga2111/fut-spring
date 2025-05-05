package com.guga.futspring.entity;

import com.guga.futspring.entity.embedded.RankingEntry;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ranking")
public class Ranking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matches")
    private int matches;

    @Column(name = "goals")
    private int goals; // Total de gols de todos os jogadores

    @Column(name = "assists")
    private int assists; // Total de assistências de todos os jogadores

    @ElementCollection
    private List<RankingEntry> prizes; //premios como artilheiro, garcom e puskas

    @OneToMany(mappedBy = "ranking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Stats> stats = new ArrayList<>();

    @OneToOne(mappedBy = "ranking", cascade = CascadeType.ALL)
    private Pelada pelada;

}

