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

import java.util.Collections;
import java.util.Comparator;
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
        LeagueTable fetchedLeagueTable = unwrapLeagueTable(leagueTable, id);
        sortAndSetPosition(fetchedLeagueTable);
        return fetchedLeagueTable;
    }

    @Override
    public LeagueTable getLeagueTableFromDaily(Long dailyId) {
       Optional<Daily> optionalDaily = dailyRepository.findById(dailyId);

       Daily daily;

       if(optionalDaily.isPresent()) {
            daily = optionalDaily.get();
       } else throw new DailyNotFoundException(dailyId);

       Optional<LeagueTable> leagueTable = leagueTableRepository.findLeagueTableByDaily(daily);
       LeagueTable fetchedLeagueTable = unwrapLeagueTable(leagueTable, daily.getLeagueTable().getId());
       sortAndSetPosition(fetchedLeagueTable);
       return fetchedLeagueTable;

    }

    @Override
    public List<LeagueTable> getLeagueTables() {
        List<LeagueTable> leagueTables = (List<LeagueTable>) leagueTableRepository.findAll();
        leagueTables.forEach(this::sortAndSetPosition);
        return leagueTables;
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
                        }
                );
        sortAndSetPosition(leagueTable);
        return leagueTableRepository.save(leagueTable);
    }

    private void sortAndSetPosition(LeagueTable leagueTable) {
        if(leagueTable != null && leagueTable.getEntries() != null) {
            Collections.sort(leagueTable.getEntries(), new Comparator<LeagueTableEntry>() {
                @Override
                public int compare(LeagueTableEntry o1, LeagueTableEntry o2) {
                    int pointsComparison = Integer.compare(o2.getPoints(), o1.getPoints());
                    if(pointsComparison != 0) return pointsComparison;

                    int goalDifferenceComparison = Integer.compare(o2.getGoalDifference(), o1.getGoalDifference());
                    if(goalDifferenceComparison != 0) return goalDifferenceComparison;

                    return Integer.compare(o2.getGoalsScored(), o1.getGoalsScored());
                }
            });

            for(int i = 0; i < leagueTable.getEntries().size(); i++) {
                leagueTable.getEntries().get(i).setPosition(i + 1);
            }
        }
    }

    static LeagueTable unwrapLeagueTable(Optional<LeagueTable> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new LeagueTableNotFoundException(id);
    }
}
