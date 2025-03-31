package com.guga.futspring.entity;

import com.guga.futspring.entity.embedded.RankingEntry;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private int matches;
    private int goals; // Total de gols de todos os jogadores
    private int assists; // Total de assistências de todos os jogadores

    @ElementCollection
    private List<RankingEntry> artilharia; // Ranking de jogadores baseado em gols

    @ElementCollection
    private List<RankingEntry> garcom; // Ranking de jogadores baseado em assistências

    @ElementCollection
    private List<RankingEntry> puskas; // Ranking de jogadores que mais venceram o Puskas

    @OneToOne(mappedBy = "ranking", cascade = CascadeType.ALL)
    private Pelada pelada;
}

