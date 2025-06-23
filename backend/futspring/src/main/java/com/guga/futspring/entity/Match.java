    package com.guga.futspring.entity;

    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    import java.util.HashSet;
    import java.util.Set;

    @Entity
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Table(name = "match")
    public class Match {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        Long id;

        @Column(name = "team1Score")
        private Integer team1Score;

        @Column(name = "team2Score")
        private Integer team2Score;

        @ManyToOne
        @JsonIgnore
        @JoinColumn(name = "winner_team_id", referencedColumnName = "id")
        private Team winner;

        @ManyToMany
        @JoinTable(
                name = "match_team",
                joinColumns = @JoinColumn(name = "match_id"),
                inverseJoinColumns = @JoinColumn(name = "team_id")
        )
        private Set<Team> teams = new HashSet<>();

        @ManyToOne
        @JsonIgnore
        @JoinColumn(name = "daily_id", referencedColumnName = "id")
        private Daily daily;
    }
