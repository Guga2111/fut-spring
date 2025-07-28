package com.guga.futspring.service;

import com.guga.futspring.entity.Stats;
import com.guga.futspring.entity.User;
import com.guga.futspring.entity.UserDailyStats;
import com.guga.futspring.exception.StatsNotFoundException;
import com.guga.futspring.repository.StatsRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StatsServiceImpl implements StatsService {

    StatsRepository statsRepository;
    RankingServiceImpl rankingService;
    @Override
    public List<Stats> getStats() {
        return (List<Stats>) statsRepository.findAll();
    }

    @Override
    public Stats getStat(Long id) {
        Optional<Stats> stats = statsRepository.findById(id);
        return unwrapStats(stats, id);
    }

    @Override
    public int getPuskasTimes(Long id) {
        Optional<Stats> stats = statsRepository.findById(id);
        Stats unwrapStats = unwrapStats(stats, id);
        return unwrapStats.getPuskasTimes();
    }

    @Override
    public Stats initializeStats(User user) {
        Stats stats = new Stats();
        stats.setUser(user);
        stats.setGoals(0);
        stats.setAssists(0);
        stats.setPuskasDates(new ArrayList<>());

        return statsRepository.save(stats);
    }

    @Override
    public void deleteStats(Long id) {
        statsRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Stats updateStats(int goals, int assists, Long id) {
        Optional<Stats> stats = statsRepository.findById(id);

        Stats unwrapStats = unwrapStats(stats, id);

        unwrapStats.setGoals(goals);
        unwrapStats.setAssists(assists);

        Stats savedStats = statsRepository.save(unwrapStats);
        if (unwrapStats.getRanking() != null) {
            rankingService.updateTotalGoalsAndAssists(unwrapStats.getRanking().getId());
        }
        return savedStats;
    }

    @Override
    @Transactional
    public void insertDailyStatistics(List<UserDailyStats> userDailyStatsList) {

        for(UserDailyStats userDailyStats : userDailyStatsList) {

            Stats stats = userDailyStats.getUser().getStats();

            stats.setGoals(stats.getGoals() + userDailyStats.getGoals());
            stats.setAssists(stats.getAssists() + userDailyStats.getAssists());
            stats.setMatches(stats.getMatches() + userDailyStats.getMatches());
            stats.setWins(stats.getWins() + userDailyStats.getWins());

            statsRepository.save(stats);
        }

    }

    static Stats unwrapStats(Optional<Stats> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new StatsNotFoundException(id);
    }
}
