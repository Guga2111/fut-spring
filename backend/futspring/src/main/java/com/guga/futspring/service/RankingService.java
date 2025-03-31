package com.guga.futspring.service;

import com.guga.futspring.entity.Ranking;

import java.util.List;

public interface RankingService {
    Ranking getRanking(Long id);
    List<Ranking> getRankings();
    Ranking saveRanking(Ranking ranking);
    Ranking updateRanking(int goals, int assists,Long id);
}
