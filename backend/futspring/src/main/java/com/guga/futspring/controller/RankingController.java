package com.guga.futspring.controller;

import com.guga.futspring.entity.Ranking;
import com.guga.futspring.service.RankingServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/ranking")
public class RankingController {

    RankingServiceImpl rankingService;

    @GetMapping
    public ResponseEntity<List<Ranking>> getRankings() {
        return new ResponseEntity<>(rankingService.getRankings(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Ranking> getRanking(@PathVariable Long id) {
        return new ResponseEntity<>(rankingService.getRanking(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Ranking> saveRanking(@RequestBody Ranking ranking) {
        return new ResponseEntity<>(rankingService.saveRanking(ranking), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Ranking> updateRanking(@PathVariable Long id, int matches, int goals, int assists) {
        return new ResponseEntity<>(rankingService.updateRanking(matches, goals, assists, id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Ranking> deleteRanking(@PathVariable Long id) {
        rankingService.deleteRanking(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
