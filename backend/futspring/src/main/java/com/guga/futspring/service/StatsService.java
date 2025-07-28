package com.guga.futspring.service;

import com.guga.futspring.entity.Stats;
import com.guga.futspring.entity.User;
import com.guga.futspring.entity.UserDailyStats;

import java.util.List;

public interface StatsService {
    List<Stats> getStats();
    Stats getStat(Long id);
    int getPuskasTimes(Long id);
    Stats initializeStats(User user);
    void deleteStats(Long id);

    Stats updateStats(int goals, int assists, Long id);
    void insertDailyStatistics(List<UserDailyStats> userDailyStatsList);
}
