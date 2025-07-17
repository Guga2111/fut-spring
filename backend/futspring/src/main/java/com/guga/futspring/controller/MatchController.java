package com.guga.futspring.controller;

import com.guga.futspring.entity.*;
import com.guga.futspring.service.LeagueTableServiceImpl;
import com.guga.futspring.service.MatchServiceImpl;
import com.guga.futspring.service.UserDailyStatsServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/match")
@AllArgsConstructor
public class MatchController {

    MatchServiceImpl matchService;
    LeagueTableServiceImpl leagueTableService;
    UserDailyStatsServiceImpl userDailyStatsService;

    @GetMapping("{id}")
    public ResponseEntity<Match> getMatch(@PathVariable Long id) {
        return new ResponseEntity<>(matchService.getMatch(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Match>> getMatches() {
        return new ResponseEntity<>(matchService.getMatches(), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Match> updateMatchScore(@PathVariable Long id, @RequestBody @Valid Match match) {
        return new ResponseEntity<>(matchService.updateMatch(id, "null"), HttpStatus.OK);
    }

    @PutMapping("/{dailyId}/winner/{team1Id}/looser/{team2Id}")
    public ResponseEntity<LeagueTable> defineWinnerForLeagueTableEntry(@PathVariable Long dailyId, @PathVariable Long team1Id, @PathVariable Long team2Id, @RequestParam @Valid Integer team1goals, @RequestParam @Valid Integer team2goals) {
        return new ResponseEntity<>(leagueTableService.defineMatchResult(dailyId, team1Id, team2Id, team1goals, team2goals), HttpStatus.OK);
    }

    @PutMapping("/{dailyId}/player/{playerId}/update-goals-assists")
    public ResponseEntity<UserDailyStats> updatePlayerGoalsAndAssists(@PathVariable Long dailyId, @PathVariable Long playerId, @RequestBody Map<String, Object> goalsAndAssists) {

        Integer goals = (Integer) goalsAndAssists.getOrDefault("goals", 0);
        Integer assists = (Integer) goalsAndAssists.getOrDefault("assists", 0);

        return new ResponseEntity<>(userDailyStatsService.updateUserDailyStats(playerId, dailyId, goals, assists), HttpStatus.OK);
    }
}
