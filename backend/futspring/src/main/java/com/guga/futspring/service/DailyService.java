package com.guga.futspring.service;

import com.guga.futspring.entity.*;
import com.guga.futspring.entity.embedded.RankingEntry;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DailyService {
    Daily getDaily(Long id);
    List<Daily> getDailys();
    Daily createDaily(Daily daily, Long peladaId);
    Daily updateDaily();
    Daily confirmPresenceInDaily(Long dailyId, Long playerId);
    Daily disconfirmPresenceInDaily(Long dailyId, Long playerId);
    List<Team> sortTeamsBasedOnStars(Long id, int numberOfTeams);
    void removeDaily(Long id);
    Daily finalizeDaily(Long dailyId, Long puskasWinnerId, Long witballWinnerId);
    List<Team> getAssociatedTeams(Long id);
    List<User> getConfirmedPlayers(Long id);
    List<User> getNotConfirmedPlayers (Long id);
    List<Match> getDailyMatches(Long id);
    LeagueTable assignTeamToDailyLeagueTable(Long id, List<Team> teams);
    Daily addChampionsImage(Long id, MultipartFile imageFile) throws IOException;
    Resource getChampionsImage(String filename);

    void swapPlayersInTeam (Long dailyId, Long player1Id, Long player2Id);

    Daily forceDisconfirmPresence (Long dailyId, Long playerId);
}
