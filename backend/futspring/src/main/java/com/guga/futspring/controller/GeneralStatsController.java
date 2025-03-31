package com.guga.futspring.controller;

import com.guga.futspring.entity.GeneralStats;
import com.guga.futspring.service.GeneralStatsServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/generalStats")
public class GeneralStatsController {

    GeneralStatsServiceImpl statsService;

    @GetMapping("{id}")
    public ResponseEntity<GeneralStats> getStat(@PathVariable Long id) {
        return new ResponseEntity<>(statsService.getStat(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<GeneralStats>> getStats() {
        return new ResponseEntity<>(statsService.getStats(), HttpStatus.OK);
    }

    @GetMapping("/puskas/{id}")
    public ResponseEntity<Integer> getPuskasTimes(@PathVariable Long id) {
        return new ResponseEntity<Integer>(statsService.getPuskasTimes(id), HttpStatus.OK);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<GeneralStats> createStats(@Valid @RequestBody GeneralStats generalStats, @PathVariable Long userId) {
        return new ResponseEntity<>(statsService.saveStats(generalStats, userId), HttpStatus.CREATED);
    }


    @PutMapping ("{id}")
    public ResponseEntity<GeneralStats> updateStats(@Valid @RequestBody GeneralStats generalStats, @PathVariable Long id) {
        System.out.println(generalStats.getGoals());
        return new ResponseEntity<>(statsService.updateStats(generalStats.getGoals(), generalStats.getAssists(),  id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<GeneralStats> deleteStats(@PathVariable Long id) {
        statsService.deleteStats(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
