package com.guga.futspring.controller;

import com.guga.futspring.entity.LeagueTable;
import com.guga.futspring.service.LeagueTableServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/league-table")
public class LeagueTableController {

    LeagueTableServiceImpl leagueTableService;

    @GetMapping("/{id}")
    public ResponseEntity<LeagueTable> getLeagueTable(@PathVariable Long id) {
        return new ResponseEntity<>(leagueTableService.getLeagueTable(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<LeagueTable>> getAllLeagueTable() {
        return new ResponseEntity<>(leagueTableService.getLeagueTables(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<LeagueTable> createLeagueTable(LeagueTable leagueTable) {
        return new ResponseEntity<>(leagueTableService.createLeagueTable(leagueTable), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeagueTable> updateLeagueTable(@PathVariable Long id, LeagueTable leagueTable) {
        return new ResponseEntity<>(leagueTableService.updateLeagueTable(id, leagueTable), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<LeagueTable> deleteLeagueTable(@PathVariable Long id) {
        leagueTableService.removeLeagueTable(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
