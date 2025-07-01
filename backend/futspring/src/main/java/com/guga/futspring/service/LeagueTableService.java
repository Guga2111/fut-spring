package com.guga.futspring.service;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.LeagueTable;
import com.guga.futspring.entity.embedded.LeagueTableEntry;

import java.util.List;

public interface LeagueTableService {
    LeagueTable getLeagueTable(Long id);
    LeagueTable getLeagueTableFromDaily(Long dailyId);
    List<LeagueTable> getLeagueTables();
    LeagueTable updateLeagueTable(Long dailyId, Long teamId, LeagueTableEntry leagueTableEntry);
}
