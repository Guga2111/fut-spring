package com.guga.futspring.controller;

import com.guga.futspring.entity.Pelada;
import com.guga.futspring.entity.User;
import com.guga.futspring.service.PeladaServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//
@RestController
@AllArgsConstructor
@RequestMapping("/pelada")
public class PeladaController {

    PeladaServiceImpl peladaService;

    @GetMapping
    public ResponseEntity<List<Pelada>> getPeladas() {
        return new ResponseEntity<>(peladaService.getPeladas(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Pelada> getPelada(@PathVariable Long id) {
        return new ResponseEntity<>(peladaService.getPelada(id), HttpStatus.OK);
    }

    @GetMapping("{id}/user")
    public ResponseEntity<List<User>> getPlayersAssociatedToPelada(@PathVariable Long id) {
        return new ResponseEntity<>(peladaService.getPlayerAssociatedToPelada(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Pelada> savePelada(@RequestBody Pelada pelada) {
        return new ResponseEntity<>(peladaService.savePelada(pelada), HttpStatus.CREATED);
    }

    @PutMapping("{id}/user/{userId}")
    public ResponseEntity<Pelada> associatePlayerToPelada(@PathVariable Long id, @PathVariable Long userId) {
        return new ResponseEntity<>(peladaService.associatePlayerToPelada(id, userId), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Pelada> deletePelada(@PathVariable Long id) {
        peladaService.deletePelada(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
