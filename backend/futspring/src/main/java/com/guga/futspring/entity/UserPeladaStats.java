package com.guga.futspring.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user_pelada_stats")
public class UserPeladaStats {

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
}
