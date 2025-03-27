package com.guga.futspring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "stats")
@Entity
public class Stats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "goals")
    private int goals;

    @Column(name = "assists")
    private int assists;

    @ElementCollection
    @Temporal(TemporalType.DATE)
    @Column(name = "puskasDates")
    private List<Date> puskasDates = new ArrayList<>();

    @OneToOne(mappedBy = "stats", cascade = CascadeType.ALL)
    @JsonIgnore
    private User user;

    @ManyToMany
    @JoinTable(
            name = "stats_ranking",
            joinColumns = @JoinColumn(name = "stats_id"),
            inverseJoinColumns = @JoinColumn(name = "ranking_id"))
    private List<Ranking> rankings = new ArrayList<>();

    public int getPuskasTimes() {
        return puskasDates.size();
    }


}
