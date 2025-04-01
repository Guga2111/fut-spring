package com.guga.futspring.controller;

import com.guga.futspring.entity.Stats;
import com.guga.futspring.service.StatsServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/{userId}")
    public ResponseEntity<Stats> createStats(@Valid @RequestBody Stats stats, @PathVariable Long userId) {
        return new ResponseEntity<>(statsService.saveStats(stats, userId), HttpStatus.CREATED);
    }


    @PutMapping ("{id}")
    public ResponseEntity<Stats> updateStats(@Valid @RequestBody Stats stats, @PathVariable Long id) {
        System.out.println(stats.getGoals());
        return new ResponseEntity<>(statsService.updateStats(stats.getGoals(), stats.getAssists(),  id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Stats> deleteStats(@PathVariable Long id) {
        statsService.deleteStats(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
