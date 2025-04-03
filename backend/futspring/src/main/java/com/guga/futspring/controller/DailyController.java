package com.guga.futspring.controller;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.service.DailyServiceImpl;
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

    @PutMapping("/{dailyId}/confirm-presence/{userId}")
    public ResponseEntity<Daily> confirmPresenceInDaily(@PathVariable Long dailyId, @PathVariable Long userId) {
        return new ResponseEntity<>(dailyService.confirmPresenceInDaily(dailyId, userId), HttpStatus.OK);
    }
}
