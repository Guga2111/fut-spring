package com.guga.futspring.service;

import com.guga.futspring.entity.UserDailyStats;
import com.guga.futspring.repository.UserDailyStatsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserDailyStatsServiceImpl implements UserDailyStatsService {

    UserDailyStatsRepository userDailyStatsRepository;

    @Override
    public UserDailyStats getUserDailyStats(Long id) {
        return null;
    }

    @Override
    public List<UserDailyStats> getAllUserDailyStats() {
        return List.of();
    }

    @Override
    public UserDailyStats saveUserDailyStats(UserDailyStats userDailyStats) {
        return null;
    }

    @Override
    public UserDailyStats updateUserDailyStats(Long id, UserDailyStats userDailyStats) {
        return null;
    }

    @Override
    public void deleteUserDailyStats(Long id) {

    }
}
