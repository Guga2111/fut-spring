package com.guga.futspring.controller;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.Match;
import com.guga.futspring.entity.Team;
import com.guga.futspring.entity.embedded.RankingEntry;
import com.guga.futspring.service.DailyServiceImpl;
import com.guga.futspring.service.MatchServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/daily")
public class DailyController {

    DailyServiceImpl dailyService;
    MatchServiceImpl matchService;

    @GetMapping("{id}")
    public ResponseEntity<Daily> getDaily(@PathVariable Long id) {
        return new ResponseEntity<>(dailyService.getDaily(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Daily>> getDailies() {
        return new ResponseEntity<>(dailyService.getDailys(), HttpStatus.OK);
    }

    @PostMapping("/pelada/{peladaId}")
    public ResponseEntity<Daily> saveDaily(@RequestBody @Valid Daily daily, @PathVariable Long peladaId) {
        return new ResponseEntity<>(dailyService.createDaily(daily, peladaId), HttpStatus.CREATED);
    }

    @PostMapping("/{id}/sort-teams")
    public ResponseEntity<List<Team>> sortTeams(@PathVariable Long id, @RequestParam @Valid Integer numberOfTeams) {
        return new ResponseEntity<>(dailyService.sortTeamsBasedOnStars(id, numberOfTeams), HttpStatus.OK);
    }

    @PostMapping("/{id}/team1/{team1Id}/team2/{team2Id}")
    public ResponseEntity<Match> createMatch(@RequestBody @Valid Match match, @PathVariable Long team1Id, @PathVariable Long team2Id, @PathVariable Long id) {
        return new ResponseEntity<>(matchService.createMatch(match, team1Id, team2Id, id), HttpStatus.CREATED);
    }

    @PutMapping("/{dailyId}/confirm-presence/{userId}")
    public ResponseEntity<Daily> confirmPresenceInDaily(@PathVariable Long dailyId, @PathVariable Long userId) {
        return new ResponseEntity<>(dailyService.confirmPresenceInDaily(dailyId, userId), HttpStatus.OK);
    }

    @PutMapping("/{id}/finalize")
    public ResponseEntity<Daily> finalizeDaily(@PathVariable Long id, @RequestBody @Valid List<RankingEntry> prizes) {

        return new ResponseEntity<>(dailyService.finalizeDaily(id, prizes), HttpStatus.OK);
    }
}
