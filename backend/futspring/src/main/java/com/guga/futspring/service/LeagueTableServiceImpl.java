package com.guga.futspring.service;

import com.guga.futspring.entity.LeagueTable;
import com.guga.futspring.exception.LeagueTableNotFoundException;
import com.guga.futspring.repository.LeagueTableRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LeagueTableServiceImpl implements LeagueTableService{

    LeagueTableRepository leagueTableRepository;

    @Override
    public LeagueTable getLeagueTable(Long id) {
        Optional<LeagueTable> leagueTable = leagueTableRepository.findById(id);
        return unwrapLeagueTable(leagueTable, id);
    }

    @Override
    public List<LeagueTable> getLeagueTables() {
        return (List<LeagueTable>) leagueTableRepository.findAll();
    }

    static LeagueTable unwrapLeagueTable(Optional<LeagueTable> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new LeagueTableNotFoundException(id);
    }
}
