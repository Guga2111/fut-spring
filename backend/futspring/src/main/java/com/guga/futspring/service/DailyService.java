package com.guga.futspring.service;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.Team;
import com.guga.futspring.entity.User;
import com.guga.futspring.entity.embedded.RankingEntry;

import java.util.List;

public interface DailyService {
    Daily getDaily(Long id);
    List<Daily> getDailys();
    Daily createDaily(Daily daily, Long peladaId);
    Daily updateDaily();
    Daily confirmPresenceInDaily(Long dailyId, Long playerId);
    List<Team> sortTeamsBasedOnStars(Long id, int numberOfTeams);
    void removeDaily(Long id);
    Daily finalizeDaily(Long dailyId, List<RankingEntry> prizes);
}
