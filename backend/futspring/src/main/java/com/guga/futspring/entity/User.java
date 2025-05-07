package com.guga.futspring.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

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
    String email;

    @NotBlank(message = "username cannot be blank")
    @Column(name = "username")
    String username;

    @Column(name = "image")
    private String image;

    @NonNull
    @NotBlank
    @Column(name = "password")
    String password;

    @Column(name = "stars")
    int stars;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "stats_id", referencedColumnName = "id", unique = true)
    private Stats stats;

    @ManyToMany(mappedBy = "players")
    private List<Pelada> peladas;

    @ManyToMany(mappedBy = "playersPresence")
    private List<Daily> dailies;

    @ManyToMany(mappedBy = "players")
    private List<Team> teams;
}
