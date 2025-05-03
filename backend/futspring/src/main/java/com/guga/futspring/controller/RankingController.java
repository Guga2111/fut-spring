package com.guga.futspring.controller;

import com.guga.futspring.entity.Ranking;
import com.guga.futspring.service.RankingServiceImpl;
import jakarta.validation.Valid;
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

    @GetMapping("{peladaId}")
    public ResponseEntity<Ranking> getRanking(@PathVariable Long peladaId) {
        return new ResponseEntity<>(rankingService.getRanking(peladaId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Ranking> createRanking(@Valid @RequestBody Ranking ranking) {
        return new ResponseEntity<>(rankingService.saveRanking(ranking), HttpStatus.CREATED);
    }
}
