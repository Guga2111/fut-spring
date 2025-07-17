package com.guga.futspring.service;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.User;
import com.guga.futspring.entity.UserDailyStats;

import java.util.List;

public interface UserDailyStatsService {
    UserDailyStats getUserDailyStats(Long id);
    List<UserDailyStats> getAllUserDailyStats();
    UserDailyStats saveUserDailyStats(UserDailyStats userDailyStats);
    UserDailyStats updateUserDailyStats(Long playerId, Long dailyId, Integer goals, Integer assists);
    void deleteUserDailyStats(Long id);
    void initializeUserDailyStats(List<User> players, Daily daily);
}
