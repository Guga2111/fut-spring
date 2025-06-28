package com.guga.futspring.entity.embedded;

import com.guga.futspring.entity.Team;
import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class LeagueTableEntry {

    @ManyToOne
    private Team team;

    private int position;
    private int wins;
    private int losses;
    private int draws;
    private int goalsScored;
    private int goalsConceded;
    private int goalDifference;
    private int points;
}
