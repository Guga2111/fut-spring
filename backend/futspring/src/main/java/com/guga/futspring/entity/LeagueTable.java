package com.guga.futspring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.guga.futspring.entity.embedded.LeagueTableEntry;
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
@Table(name = "league_table")
public class LeagueTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "daily_id", referencedColumnName = "id")
    @JsonIgnore
    private Daily daily;

    @ElementCollection
    @CollectionTable(name = "league_table_entries", joinColumns = @JoinColumn(name = "league_table_id"))
    private List<LeagueTableEntry> entries;

}
