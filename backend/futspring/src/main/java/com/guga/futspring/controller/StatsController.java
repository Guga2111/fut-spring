package com.guga.futspring.controller;

import com.guga.futspring.entity.Stats;
import com.guga.futspring.service.StatsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/stats")
public class StatsController {

    StatsServiceImpl statsService;

    @GetMapping("{id}")
    public ResponseEntity<Stats> getStat(@PathVariable Long id) {
        return new ResponseEntity<>(statsService.getStat(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Stats>> getStats() {
        return new ResponseEntity<>(statsService.getStats(), HttpStatus.OK);
    }

    @GetMapping("/puskas/{id}")
    public ResponseEntity<Integer> getPuskasTimes(@PathVariable Long id) {
        return new ResponseEntity<Integer>(statsService.getPuskasTimes(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Stats> createStats(Stats stats) {
        return new ResponseEntity<>(statsService.saveStats(stats), HttpStatus.CREATED);
    }


    @PutMapping ("{id}")
    public ResponseEntity<Stats> updateStats(Stats stats, @PathVariable Long id) {
        Date date = new Date();
        return new ResponseEntity<>(statsService.updateStats(stats.getGoals(), stats.getAssists(), date, id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Stats> deleteStats(@PathVariable Long id) {
        statsService.deleteStats(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
