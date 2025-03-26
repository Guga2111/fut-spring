package com.guga.futspring.controller;

import com.guga.futspring.entity.Player;
import com.guga.futspring.repository.PlayerRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class PlayerController {

    @Autowired
    PlayerRepository playerRepository;

    @GetMapping("/hello")
    public ResponseEntity<String> getString() {
        return new ResponseEntity<>("Hello World", HttpStatus.OK);
    }

    @GetMapping("/players")
    public ResponseEntity<List<Player>> getPlayers() {
        return new ResponseEntity<>(playerRepository.getPlayers(), HttpStatus.OK);
    }

    @GetMapping("/player/{id}")
    public ResponseEntity<Player> getPlayer(@PathVariable Long id) {
        Player player = playerRepository.getPlayer(id);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }
}
