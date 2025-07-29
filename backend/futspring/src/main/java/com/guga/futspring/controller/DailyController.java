package com.guga.futspring.controller;

import com.guga.futspring.entity.*;
import com.guga.futspring.entity.embedded.RankingEntry;
import com.guga.futspring.entity.enums.DailyStatus;
import com.guga.futspring.repository.DailyRepository;
import com.guga.futspring.service.DailyServiceImpl;
import com.guga.futspring.service.MatchServiceImpl;
import com.guga.futspring.service.PeladaServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/daily")
public class DailyController {

    DailyServiceImpl dailyService;
    MatchServiceImpl matchService;
    DailyRepository dailyRepository;
    PeladaServiceImpl peladaService;

    @GetMapping("{id}")
    public ResponseEntity<Daily> getDaily(@PathVariable Long id) {
        return new ResponseEntity<>(dailyService.getDaily(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Daily>> getDailies() {
        return new ResponseEntity<>(dailyService.getDailys(), HttpStatus.OK);
    }

    @GetMapping("/{id}/matches")
    public ResponseEntity<List<Match>> getDailyMatches(@PathVariable Long id) {
        return new ResponseEntity<>(dailyService.getDailyMatches(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/teams")
    public ResponseEntity<List<Team>> getAssociatedTeams(@PathVariable Long id) {
        return new ResponseEntity<>(dailyService.getAssociatedTeams(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/confirmed-players")
    public ResponseEntity<List<User>> getConfirmedPlayers(@PathVariable Long id) {
        return new ResponseEntity<>(dailyService.getConfirmedPlayers(id), HttpStatus.OK);
    }

    @GetMapping("/peladas/{peladaId}/dailies")
    public ResponseEntity<List<Daily>> getDailiesByPelada(@PathVariable Long peladaId) {
        Pelada pelada = peladaService.getPelada(peladaId);
        return new ResponseEntity<>(dailyRepository.findByPeladaOrderByDailyDateAscDailyTimeAsc(pelada), HttpStatus.OK);
    }

    @GetMapping("/{id}/champions-image/{filename:.+}")
    public ResponseEntity<Resource> getChampionsImage(@PathVariable String filename) {
        Resource imageResource = dailyService.getChampionsImage(filename);

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

    @PostMapping("/pelada/{peladaId}")
    public ResponseEntity<Daily> saveDaily(@RequestBody @Valid Daily daily, @PathVariable Long peladaId) {

        Pelada pelada = peladaService.getPelada(peladaId);

        if (dailyRepository.findByPeladaAndDailyDate(pelada, daily.getDailyDate()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 409 Conflict
        }

        daily.setPelada(pelada);
        daily.setCreationDateTime(LocalDateTime.now());
        daily.setIsFinished(false);
        daily.setStatus(DailyStatus.SCHEDULED);

        Daily createdDaily = dailyService.createDaily(daily, peladaId);

        return new ResponseEntity<>(createdDaily, HttpStatus.CREATED);
    }

    @PostMapping("/{id}/sort-teams")
    public ResponseEntity<List<Team>> sortTeams(@PathVariable Long id, @RequestParam @Valid Integer numberOfTeams) {
        return new ResponseEntity<>(dailyService.sortTeamsBasedOnStars(id, numberOfTeams), HttpStatus.OK);
    }

    @PostMapping("/{id}/team1/{team1Id}/team2/{team2Id}")
    public ResponseEntity<Match> createMatch(@RequestBody @Valid Match match, @PathVariable Long team1Id, @PathVariable Long team2Id, @PathVariable Long id) {
        return new ResponseEntity<>(matchService.createMatch(match, team1Id, team2Id, id), HttpStatus.CREATED);
    }

    @PutMapping("/{dailyId}/confirm-presence/{userId}")
    public ResponseEntity<Daily> confirmPresenceInDaily(@PathVariable Long dailyId, @PathVariable Long userId) {
        return new ResponseEntity<>(dailyService.confirmPresenceInDaily(dailyId, userId), HttpStatus.OK);
    }

    @PutMapping("/{id}/finalize/puskas/{puskasWinnerId}/wittball/{wittballWinnerId}")
    public ResponseEntity<Daily> finalizeDaily(@PathVariable Long id, @PathVariable Long puskasWinnerId, @PathVariable Long wittballWinnerId) {

        return new ResponseEntity<>(dailyService.finalizeDaily(id, puskasWinnerId, wittballWinnerId), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}/champions-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Daily> addChampionsImage(@PathVariable Long id, @RequestPart(value = "image")MultipartFile imageFile) throws IOException {
        return new ResponseEntity<>(dailyService.addChampionsImage(id, imageFile), HttpStatus.OK);
    }
}
