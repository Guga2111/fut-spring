package com.guga.futspring.service;

import com.guga.futspring.entity.GeneralStats;

import java.util.Date;
import java.util.List;

public interface GeneralStatsService {
    List<GeneralStats> getStats();
    GeneralStats getStat(Long id);
    int getPuskasTimes(Long id);
    GeneralStats saveStats(GeneralStats generalStats, Long userId);
    void deleteStats(Long id);

    GeneralStats updateStats(int goals, int assists, Long id);
}
