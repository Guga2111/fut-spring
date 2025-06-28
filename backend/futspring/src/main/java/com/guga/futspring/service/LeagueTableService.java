package com.guga.futspring.service;

import com.guga.futspring.entity.LeagueTable;

import java.util.List;

public interface LeagueTableService {
    LeagueTable getLeagueTable(Long id);
    List<LeagueTable> getLeagueTables();
    LeagueTable createLeagueTable(LeagueTable leagueTable);
    LeagueTable updateLeagueTable(Long id, LeagueTable leagueTable);
    void removeLeagueTable(Long id);
}
