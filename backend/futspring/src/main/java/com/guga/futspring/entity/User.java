package com.guga.futspring.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

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

    @Column(name = "username")
    String username;

    @NonNull
    @NotBlank
    @Column(name = "password")
    String password;

    @Column(name = "stars")
    int stars;

    @OneToOne
    @JoinColumn(name = "stats_id")
    private Stats stats;
}
