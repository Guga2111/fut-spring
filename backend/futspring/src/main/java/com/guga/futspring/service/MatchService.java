package com.guga.futspring.service;

import com.guga.futspring.entity.Match;

import java.util.List;

public interface MatchService {
    Match getMatch(Long id);
    List<Match> getMatches();
    Match createMatch(Match match, Long team1Id, Long team2Id, Long dailyId);
    Match updateMatch(Long id, String score);
}
