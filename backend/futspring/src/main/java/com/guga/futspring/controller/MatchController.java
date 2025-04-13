package com.guga.futspring.controller;

import com.guga.futspring.entity.Match;
import com.guga.futspring.service.MatchServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/match")
@AllArgsConstructor
public class MatchController {

    MatchServiceImpl matchService;

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
        return new ResponseEntity<>(matchService.updateMatch(id, match.getScore()), HttpStatus.OK);
    }

}
