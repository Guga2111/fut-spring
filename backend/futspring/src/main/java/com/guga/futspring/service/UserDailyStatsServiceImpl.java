package com.guga.futspring.service;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.User;
import com.guga.futspring.entity.UserDailyStats;
import com.guga.futspring.exception.DailyNotFoundException;
import com.guga.futspring.exception.UserNotFoundException;
import com.guga.futspring.repository.DailyRepository;
import com.guga.futspring.repository.UserDailyStatsRepository;
import com.guga.futspring.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserDailyStatsServiceImpl implements UserDailyStatsService {

    UserDailyStatsRepository userDailyStatsRepository;
    DailyRepository dailyRepository;
    UserRepository userRepository;

    @Transactional
    @Override
    public void initializeUserDailyStats(List<User> players, Daily daily) {
        if(players == null || players.isEmpty()) return;

        for(User player : players) {
            UserDailyStats existingDailyStats = userDailyStatsRepository.findByUserAndDaily(player, daily);
            if(existingDailyStats == null) {
                UserDailyStats newUserDailyStats = new UserDailyStats();
                newUserDailyStats.setUser(player);
                newUserDailyStats.setDaily(daily);
                newUserDailyStats.setGoals(0);
                newUserDailyStats.setAssists(0);
                newUserDailyStats.setMatches(0);
                newUserDailyStats.setWins(0);
                userDailyStatsRepository.save(newUserDailyStats);
            }
        }
    }

    @Override
    public UserDailyStats getUserDailyStats(Long id) {
        Optional<UserDailyStats> userDailyStats = userDailyStatsRepository.findById(id);
        return unwrapUserDailyStats(userDailyStats, id);
    }

    @Override
    public List<UserDailyStats> getAllUserDailyStats() {
        return (List<UserDailyStats>) userDailyStatsRepository.findAll();
    }

    @Override
    public UserDailyStats saveUserDailyStats(UserDailyStats userDailyStats) {
        return userDailyStatsRepository.save(userDailyStats);
    }

    @Override
    public UserDailyStats updateUserDailyStats(Long playerId, Long dailyId, Integer goals, Integer assists) {

        Daily daily = dailyRepository.findById(dailyId)
                .orElseThrow(() -> new DailyNotFoundException(dailyId));

        User player = userRepository.findById(playerId)
                .orElseThrow(() -> new UserNotFoundException(playerId));

        UserDailyStats userDailyStats = userDailyStatsRepository.findByUserAndDaily(player, daily);

        if(userDailyStats == null) {
            userDailyStats = new UserDailyStats();
            userDailyStats.setUser(player);
            userDailyStats.setDaily(daily);
            userDailyStats.setGoals(0);
            userDailyStats.setAssists(0);
            userDailyStats.setMatches(0);
            userDailyStats.setWins(0);
        }

        userDailyStats.setGoals(userDailyStats.getGoals() + goals);
        userDailyStats.setAssists(userDailyStats.getAssists() + assists);

        return userDailyStatsRepository.save(userDailyStats);
    }

    @Override
    public void deleteUserDailyStats(Long id) {
        userDailyStatsRepository.deleteById(id);
    }

    static UserDailyStats unwrapUserDailyStats(Optional<UserDailyStats> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new RuntimeException();
    }
}
