package com.guga.futspring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Column(name = "time_of_day")
    private LocalTime timeOfDay; // Para armazenar a hora (HH:MM:SS)

    @Enumerated(EnumType.STRING) // Armazena o nome do enum (ex: "MONDAY")
    @Column(name = "day_of_week")
    private DayOfWeek dayOfWeek;

    @Column(name = "auto_create_daily_enabled")
    private Boolean autoCreateDailyEnabled; // Habilita/desabilita o agendamento automático

    @Column(name = "image")
    private String image;

    @Column(name = "address")
    private String address;

    @Column(name = "reference")
    private String reference;

    @Column(name = "duration")
    private float duration; //1,5 = 1h 30m; 2 = 2h; 1,333 = 1h 20m

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "creator_user_id", nullable = false)
    private User creator;


    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(
            name = "pelada_admins",
            joinColumns = @JoinColumn(name = "pelada_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> admins = new HashSet<>();

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

    @OneToMany(mappedBy = "pelada")
    private List<Daily> dailies;

    @OneToMany(mappedBy = "pelada", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Message> messages;

    @PrePersist
    public void prePersist() {
        if (this.autoCreateDailyEnabled == null) {
            this.autoCreateDailyEnabled = false; // Valor padrão
        }
    }
}
