package com.guga.futspring.controller;

import com.guga.futspring.service.DailySchedulerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/_test") // Um prefixo claro para endpoints de teste
public class TestController { // Crie um novo controller para isso

    private final DailySchedulerService dailySchedulerService;

    public TestController(DailySchedulerService dailySchedulerService) {
        this.dailySchedulerService = dailySchedulerService;
    }

    @PostMapping("/run-daily-scheduler")
    public ResponseEntity<String> runDailyScheduler() {
        String result = dailySchedulerService.runSchedulerManually();
        return ResponseEntity.ok(result);
    }
}