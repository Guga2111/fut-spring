package com.guga.futspring.entity;

import com.guga.futspring.entity.embedded.RankingEntry;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ranking")
public class Ranking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int matches;

    private int goals;

    private int assists;

    @ElementCollection
    private List<RankingEntry> topScorers;

    @ElementCollection
    private List<RankingEntry> topPlaymakers;

    @ElementCollection
    private List<RankingEntry> puskas;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "pelada_id", referencedColumnName = "id", unique = true)
    private Pelada pelada;

    @ManyToMany(mappedBy = "rankings")
    private List<Stats> stats;
}
