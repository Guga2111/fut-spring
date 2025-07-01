package com.guga.futspring.controller;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.LeagueTable;
import com.guga.futspring.entity.embedded.LeagueTableEntry;
import com.guga.futspring.service.LeagueTableServiceImpl;
import jakarta.validation.Valid;
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

    @PutMapping("/{dailyId}/team/{teamId}")
    public ResponseEntity<LeagueTable> updateLeagueTable(@PathVariable Long dailyId, @PathVariable Long teamId, @RequestBody @Valid LeagueTableEntry entry) {
        return new ResponseEntity<>(leagueTableService.updateLeagueTable(dailyId, teamId, entry), HttpStatus.OK);
    }

}
