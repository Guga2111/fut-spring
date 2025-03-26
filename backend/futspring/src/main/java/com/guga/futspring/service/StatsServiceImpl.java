package com.guga.futspring.service;

import com.guga.futspring.entity.Stats;
import com.guga.futspring.entity.User;
import com.guga.futspring.repository.StatsRepository;
import com.guga.futspring.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StatsServiceImpl implements StatsService{

    StatsRepository statsRepository;
    UserServiceImpl userService;
    @Override
    public List<Stats> getStats() {
        return (List<Stats>)statsRepository.findAll();
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
    public Stats saveStats(Stats stats, Long userId) {
        User user = userService.getUser(userId);
        user.setStats(stats);
        stats.setUser(user);
        
        return statsRepository.save(stats);
    }

    @Override
    public void deleteStats(Long id) {
        statsRepository.deleteById(id);
    }

    @Override
    public Stats updateStats(int goals, int assists, Date puskasDate, Long id) {
        Optional<Stats> stats = statsRepository.findById(id);
        Stats unwrapStats = unwrapStats(stats, id);

        unwrapStats.setGoals(goals);
        unwrapStats.setGoals(assists);

        List<Date> puskasDates = unwrapStats.getPuskasDates();
        puskasDates.add(puskasDate);
        unwrapStats.setPuskasDates(puskasDates);
        return unwrapStats;
    }

    static Stats unwrapStats(Optional<Stats> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new RuntimeException();
    }
}
