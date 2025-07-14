package com.guga.futspring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.guga.futspring.entity.embedded.RankingEntry;
import com.guga.futspring.entity.enums.DailyStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

    //criar atributo imagem para colocar a imagem do time campeao!

    @Column(name = "daily_date")
    private LocalDate dailyDate;

    @Column(name = "daily_time")
    private LocalTime dailyTime;

    @Column(name = "creation_datetime")
    private LocalDateTime creationDateTime;

    @Column(name = "champion_image")
    private String championImage;

    @Column(name = "finished")
    private Boolean isFinished;

    @ElementCollection
    private List<RankingEntry> prizeEntries;

    // Status da Daily (AGENDADA, CONFIRMADA, CANCELADA, FINALIZADA)
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private DailyStatus status;

    @ManyToMany
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
    @JsonIgnore
    private List<Team> teams;

    @OneToMany(mappedBy = "daily")
    private List<Match> matches;

    @OneToOne(mappedBy = "daily", cascade = CascadeType.ALL, orphanRemoval = true)
    private LeagueTable leagueTable;

    @OneToMany(mappedBy = "daily", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserDailyStats> dailyStats;
}
