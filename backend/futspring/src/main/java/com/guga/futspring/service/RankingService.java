package com.guga.futspring.service;

import com.guga.futspring.entity.Ranking;

import java.util.List;

public interface RankingService {
    List<Ranking> getRankings();
    Ranking getRanking(Long id);
    Ranking saveRanking(Ranking ranking);
    void deleteRanking(Long id);
    Ranking updateRanking(int matches, int goals, int assists, Long id);
}
