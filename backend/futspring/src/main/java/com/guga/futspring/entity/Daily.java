package com.guga.futspring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "daily")
public class Daily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "daily_players",
            joinColumns = @JoinColumn(name = "daily_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> playersPresence; //vou precisar de uma lista de jogadores para definir os premios de cada diaria
    //e de uma lista de dos times para a classificação da diaria

    @ManyToOne(optional = false)
    @JoinColumn(name = "pelada_id", referencedColumnName = "id")
    @JsonIgnore
    private Pelada pelada;

    @OneToMany(mappedBy = "daily")
    private List<Team> teams;

    @OneToMany(mappedBy = "daily")
    private List<Match> matches;
}
