package com.guga.futspring.controller;

import com.guga.futspring.entity.Team;
import com.guga.futspring.service.TeamServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/team")
public class TeamController {

    TeamServiceImpl teamService;

    @GetMapping("{id}")
    public ResponseEntity<Team> getTeam(@PathVariable Long id) {
        return new ResponseEntity<>(teamService.getTeam(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Team>> getTeams() {
        return new ResponseEntity<>(teamService.getTeams(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Team> saveTeam(@Valid @RequestBody Team team) {
        return new ResponseEntity<>(teamService.saveTeam(team), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Team> addPoints(@Valid @RequestBody Team team, @PathVariable Long id) {
        int points = team.getPoints();
        return new ResponseEntity<>(teamService.addPoints(points, id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Team> deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
