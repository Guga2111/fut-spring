package com.guga.futspring.service;

import com.guga.futspring.entity.*;
import com.guga.futspring.repository.DailyRepository;
import com.guga.futspring.repository.MatchRepository;
import com.guga.futspring.repository.TeamRepository;
import com.guga.futspring.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@AllArgsConstructor
@Service
public class MatchServiceImpl implements MatchService{

    MatchRepository matchRepository;
    TeamRepository teamRepository;
    DailyRepository dailyRepository;

    @Override
    public Match getMatch(Long id) {
        Optional<Match> match = matchRepository.findById(id);
        return unwrapMatch(match, id);
    }

    @Override
    public List<Match> getMatches() {
        return (List<Match>) matchRepository.findAll();
    }

    @Override
    public Match createMatch(Match match, Long team1Id, Long team2Id, Long dailyId) {
        Team team1 = TeamServiceImpl.unwrapTeam(teamRepository.findById(team1Id), team1Id);
        Team team2 = TeamServiceImpl.unwrapTeam(teamRepository.findById(team2Id), team2Id);

        for(User player : team1.getPlayers()) {
            Stats stats = player.getStats();
            stats.setMatches(stats.getMatches() + 1);
        }

        for(User player : team2.getPlayers()) {
            Stats stats = player.getStats();
            stats.setMatches(stats.getMatches() + 1);
        }

        Daily daily = DailyServiceImpl.unwrapDaily(dailyRepository.findById(dailyId), dailyId);

        match.setTeams(Set.of(
                team1,
                team2
        ));

        match.setDaily(daily);

        return matchRepository.save(match);
    }

    @Override
    public Match updateMatch(Long id, String score) {
        Optional<Match> match = matchRepository.findById(id);
        Match unwrapedMatch = unwrapMatch(match, id);

        unwrapedMatch.setScore(score);

        return matchRepository.save(unwrapedMatch);
    }

    static Match unwrapMatch(Optional<Match> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new RuntimeException();
    }
}
