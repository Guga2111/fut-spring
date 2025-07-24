package com.guga.futspring.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.Pelada;
import com.guga.futspring.entity.User;
import com.guga.futspring.service.PeladaServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
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

    @GetMapping("/{id}")
    public ResponseEntity<Pelada> getPelada(@PathVariable Long id) {
        return new ResponseEntity<>(peladaService.getPelada(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/dailies")
    public ResponseEntity<List<Daily>> getAssociatedDailies(@PathVariable Long id) {
        return new ResponseEntity<>(peladaService.getAssociatedDailies(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/users")
    public ResponseEntity<List<User>> getPlayersAssociatedToPelada(@PathVariable Long id) {
        return new ResponseEntity<>(peladaService.getPlayerAssociatedToPelada(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/not-users")
    public ResponseEntity<List<User>> getDisassociatedPlayers(@PathVariable Long id) {
        return new ResponseEntity<>(peladaService.getPlayersDisassociated(id), HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Pelada> savePelada(@RequestPart("peladaData") String peladaJson, @RequestPart(value = "image", required = false)MultipartFile imageFile) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        Pelada pelada = mapper.readValue(peladaJson, Pelada.class);

        if (pelada.getAutoCreateDailyEnabled() == null) {
            pelada.setAutoCreateDailyEnabled(false);
        }

        return new ResponseEntity<>(peladaService.savePelada(pelada, imageFile), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pelada> updatePelada(@PathVariable Long id, @RequestBody Pelada pelada) {
        return new ResponseEntity<>(peladaService.updatePelada(id, pelada.getName(), pelada.getDuration(), pelada.getDayOfWeek(), pelada.getTimeOfDay(), pelada.getAutoCreateDailyEnabled()), HttpStatus.OK);
    }

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        Resource imageResource = peladaService.getImage(filename);

        if (imageResource != null && imageResource.exists()) {

            String contentType = "image/jpeg";
            try {
                contentType = Files.probeContentType(
                        Paths.get(imageResource.getFile().getAbsolutePath())
                );
            } catch (IOException e) {

            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));

            return new ResponseEntity<>(imageResource, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/user/{userId}")
    public ResponseEntity<Pelada> associatePlayerToPelada(@PathVariable Long id, @PathVariable Long userId) {
        return new ResponseEntity<>(peladaService.associatePlayerToPelada(id, userId), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Pelada> deletePelada(@PathVariable Long id) {
        peladaService.deletePelada(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
