package com.guga.futspring.service;

import com.guga.futspring.entity.Stats;

import java.util.List;

public interface StatsService {
    List<Stats> getStats();
    Stats getStat(Long id);
    int getPuskasTimes(Long id);
    Stats saveStats(Stats stats, Long userId);
    void deleteStats(Long id);

    Stats updateStats(int goals, int assists, Long id);
}
