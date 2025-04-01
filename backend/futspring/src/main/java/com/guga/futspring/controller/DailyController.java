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

    @PostMapping
    public ResponseEntity<Daily> saveDaily(@RequestBody @Valid Daily daily) {
        return new ResponseEntity<>(dailyService.createDaily(daily), HttpStatus.CREATED);
    }
}
