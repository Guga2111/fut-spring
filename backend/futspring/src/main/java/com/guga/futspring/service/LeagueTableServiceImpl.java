package com.guga.futspring.service;

import com.guga.futspring.entity.LeagueTable;
import com.guga.futspring.repository.LeagueTableRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LeagueTableServiceImpl extends LeagueTableService{

    LeagueTableRepository leagueTableRepository;

    @Override
    public LeagueTable getLeagueTable(Long id) {
        return null;
    }

    @Override
    public List<LeagueTable> getLeagueTables() {
        return List.of();
    }

    @Override
    public LeagueTable createLeagueTable(LeagueTable leagueTable) {
        return null;
    }

    @Override
    public LeagueTable updateLeagueTable(Long id, LeagueTable leagueTable) {
        return null;
    }

    @Override
    public void removeLeagueTable(Long id) {

    }
}
