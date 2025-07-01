package com.guga.futspring.service;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.LeagueTable;
import com.guga.futspring.entity.embedded.LeagueTableEntry;
import com.guga.futspring.exception.DailyNotFoundException;
import com.guga.futspring.exception.LeagueTableNotFoundException;
import com.guga.futspring.repository.DailyRepository;
import com.guga.futspring.repository.LeagueTableRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LeagueTableServiceImpl implements LeagueTableService{

    LeagueTableRepository leagueTableRepository;
    DailyRepository dailyRepository;

    @Override
    public LeagueTable getLeagueTable(Long id) {
        Optional<LeagueTable> leagueTable = leagueTableRepository.findById(id);
        return unwrapLeagueTable(leagueTable, id);
    }

    @Override
    public LeagueTable getLeagueTableFromDaily(Long dailyId) {
       Optional<Daily> optionalDaily = dailyRepository.findById(dailyId);

       Daily daily;

       if(optionalDaily.isPresent()) {
            daily = optionalDaily.get();
       } else throw new DailyNotFoundException(dailyId);

       Optional<LeagueTable> leagueTable = leagueTableRepository.findLeagueTableByDaily(daily);
       return unwrapLeagueTable(leagueTable, daily.getLeagueTable().getId());

    }

    @Override
    public List<LeagueTable> getLeagueTables() {
        return (List<LeagueTable>) leagueTableRepository.findAll();
    }

    @Override
    public LeagueTable updateLeagueTable(Long dailyId, Long teamId, LeagueTableEntry entry) {
        LeagueTable leagueTable = getLeagueTableFromDaily(dailyId);

        leagueTable.getEntries().stream()
                .filter(lte -> lte.getTeam().getId().equals(teamId))
                .findFirst()
                .ifPresent(
                        lte -> {
                            lte.setGoalsConceded(entry.getGoalsConceded());
                            lte.setGoalsScored(entry.getGoalsScored());
                            lte.setGoalDifference(entry.getGoalDifference());
                            lte.setPoints(entry.getPoints());
                            lte.setWins(entry.getWins());
                            lte.setLosses(entry.getLosses());
                            lte.setDraws(entry.getDraws());
                            lte.setPosition(entry.getPosition());
                        }
                );
        return leagueTableRepository.save(leagueTable);
    }

    static LeagueTable unwrapLeagueTable(Optional<LeagueTable> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new LeagueTableNotFoundException(id);
    }
}
