package com.guga.futspring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "player")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NonNull
    @NotBlank
    @Column(name = "email")
    private String email;

    @NotBlank(message = "username cannot be blank")
    @Column(name = "username")
    String username;

    @Column(name = "image")
    private String image;

    @Column(name = "background_image")
    private String backgroundImage;

    @NonNull
    @NotBlank
    @Column(name = "password")
    private String password;

    @Column(name = "stars")
    private int stars;

    @Column(name = "position")
    private String position;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "stats_id", referencedColumnName = "id", unique = true)
    private Stats stats;

    @ManyToMany(mappedBy = "players")
    @JsonIgnore
    private List<Pelada> peladas;

    @ManyToMany(mappedBy = "playersPresence")
    @JsonIgnore
    private List<Daily> dailies;

    @ManyToMany(mappedBy = "players")
    private List<Team> teams;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserDailyStats> dailyStats = new ArrayList<>();
}
