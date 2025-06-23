package com.guga.futspring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "points")
    private int points;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "daily_id", referencedColumnName = "id")
    private Daily daily;

    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "team_players",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> players;

    @ManyToMany(mappedBy = "teams")
    @JsonIgnore
    private Set<Match> matches = new HashSet<>();

    @OneToMany(mappedBy = "winner")
    @JsonIgnore
    private Set<Match> wonMatches = new HashSet<>();
}
