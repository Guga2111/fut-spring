package com.guga.futspring.service;

import com.guga.futspring.entity.GeneralStats;
import com.guga.futspring.entity.User;
import com.guga.futspring.exception.GeneralStatsNotFoundException;
import com.guga.futspring.repository.GeneralStatsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GeneralStatsServiceImpl implements GeneralStatsService {

    GeneralStatsRepository generalStatsRepository;
    UserServiceImpl userService;
    @Override
    public List<GeneralStats> getStats() {
        return (List<GeneralStats>) generalStatsRepository.findAll();
    }

    @Override
    public GeneralStats getStat(Long id) {
        Optional<GeneralStats> stats = generalStatsRepository.findById(id);
        return unwrapStats(stats, id);
    }

    @Override
    public int getPuskasTimes(Long id) {
        Optional<GeneralStats> stats = generalStatsRepository.findById(id);
        GeneralStats unwrapGeneralStats = unwrapStats(stats, id);
        return unwrapGeneralStats.getPuskasTimes();
    }

    @Override
    public GeneralStats saveStats(GeneralStats generalStats, Long userId) {
        User user = userService.getUser(userId);
        generalStats.setUser(user);
        user.setGeneralStats(generalStats);
        userService.saveUser(user);
        return generalStats;
    }

    @Override
    public void deleteStats(Long id) {
        generalStatsRepository.deleteById(id);
    }

    @Override
    public GeneralStats updateStats(int goals, int assists, Long id) {
        Optional<GeneralStats> stats = generalStatsRepository.findById(id);
        GeneralStats unwrapGeneralStats = unwrapStats(stats, id);

        unwrapGeneralStats.setGoals(goals);
        unwrapGeneralStats.setAssists(assists);

        return unwrapGeneralStats;
    }

    static GeneralStats unwrapStats(Optional<GeneralStats> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new GeneralStatsNotFoundException(id);
    }
}
