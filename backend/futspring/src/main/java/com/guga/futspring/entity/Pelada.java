package com.guga.futspring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "peladas")
public class Pelada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "time")
    private String time;

    @Column(name = "duration")
    private float duration; //1,5 = 1h 30m; 2 = 2h; 1,333 = 1h 20m

    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "pelada_players",
            joinColumns = @JoinColumn(name = "pelada_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> players;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ranking_id", referencedColumnName = "id")
    @JsonIgnore
    private Ranking ranking;
}
