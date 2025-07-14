package com.guga.futspring.service;

import com.guga.futspring.entity.UserDailyStats;

import java.util.List;

public interface UserDailyStatsService {
    UserDailyStats getUserDailyStats(Long id);
    List<UserDailyStats> getAllUserDailyStats();
    UserDailyStats saveUserDailyStats(UserDailyStats userDailyStats);
    UserDailyStats updateUserDailyStats(Long id, UserDailyStats userDailyStats);
    void deleteUserDailyStats(Long id);
}
