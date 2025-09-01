package com.guga.futspring.service;

import com.guga.futspring.entity.*;
import com.guga.futspring.entity.enums.DailyStatus;
import com.guga.futspring.exception.AlreadyPlayerAssociatedException;
import com.guga.futspring.exception.PeladaNotFoundException;
import com.guga.futspring.exception.PlayerNotInPeladaException;
import com.guga.futspring.repository.DailyRepository;
import com.guga.futspring.repository.PeladaRepository;
import com.guga.futspring.repository.UserRepository;
import com.guga.futspring.security.SecurityConstants;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class PeladaServiceImpl implements PeladaService{

    private final PeladaRepository peladaRepository;
    private final RankingServiceImpl rankingService;
    private final UserServiceImpl userService;
    private final DailyRepository dailyRepository;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public Pelada getPelada(Long id) {
        Optional<Pelada> pelada = peladaRepository.findById(id);
        return unwrapPelada(pelada, id);
    }

    @Override
    public List<Pelada> getPeladas() {
        return (List<Pelada>)peladaRepository.findAll();
    }

    @Override
    public List<Daily> getAssociatedDailies(Long id) {
        Pelada pelada = getPelada(id);
        return pelada.getDailies();
    }

    @Override
    public Pelada savePelada(Pelada pelada, MultipartFile imageFile, String creatorEmail) throws IOException {

        User creator = userService.getUser(creatorEmail);

        if(imageFile != null && !imageFile.isEmpty()) {
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }


            String filename = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, filename);

            Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            pelada.setImage(filename);

        }

        pelada.setCreator(creator);

        Ranking ranking = rankingService.initializeRanking(pelada);
        pelada.setRanking(ranking);

        if (pelada.getAutoCreateDailyEnabled() == null) {
            pelada.setAutoCreateDailyEnabled(false);
        }

        pelada.setAdmins(Stream.of(creator).collect(Collectors.toCollection(HashSet::new)));
        pelada.setPlayers(Stream.of(creator).collect(Collectors.toCollection(ArrayList::new)));

        String adminRoleWithPrefix = SecurityConstants.SPRING_ROLE_PREFIX + SecurityConstants.ROLE_ADMIN_PELADA;
        if (!creator.getRoles().contains(adminRoleWithPrefix)) {
            creator.addRole(adminRoleWithPrefix);
            userRepository.save(creator);
            // NOTE: the user must login again for the JWT to refresh for the new role (ADMIN)
        }

        return peladaRepository.save(pelada);
    }

    @Override
    public Resource getImage(String filename) {
        try {
            Path imagePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read image file: " + filename); //need to create custom exception
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public void deletePelada(Long id) {
        peladaRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Pelada updatePelada(Long id, String name, float duration,
                               DayOfWeek dayOfWeek, LocalTime timeOfDay, Boolean autoCreateDailyEnabled) {
        Pelada existingPelada = getPelada(id);

        if (name != null) existingPelada.setName(name);
        if (duration != 0) existingPelada.setDuration(duration);
        if (timeOfDay != null) existingPelada.setTimeOfDay(timeOfDay);
        if (dayOfWeek != null) existingPelada.setDayOfWeek(dayOfWeek);
        if (autoCreateDailyEnabled != null) existingPelada.setAutoCreateDailyEnabled(autoCreateDailyEnabled);

        return peladaRepository.save(existingPelada);
    }

        @Override
        @Transactional
        public Pelada associatePlayerToPelada(Long id, Long userId) {

            User user = userService.getUser(userId);

            if(!getPelada(id).getPlayers().contains(user)) {
                Pelada pelada = getPelada(id);
                pelada.getPlayers().add(user);

                user.getStats().setRanking(pelada.getRanking());
                pelada.getRanking().getStats().add(user.getStats());

                return peladaRepository.save(pelada);
            }
            else throw new AlreadyPlayerAssociatedException(userId);
        }

    @Override
    public Pelada disassociatePlayerOfPelada(Long id, Long userId) {

        Pelada pelada = getPelada(id);

        User player = pelada.getPlayers().stream()
                .filter(user -> user.getId().equals(userId))
                .findFirst()
                .orElseThrow(() -> new PlayerNotInPeladaException(userId, id));

        pelada.getPlayers().remove(player);

        return peladaRepository.save(pelada);
    }

    @Override
    public List<User> getConfirmedPlayersOfScheduledDaily(Long id) {
        Pelada pelada = getPelada(id);
        Daily scheduledDaily = pelada.getDailies().stream()
                .filter(daily -> DailyStatus.SCHEDULED.equals(daily.getStatus()))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No daily with scheduled status found for the pelada with id: " + id));

        return scheduledDaily.getPlayersPresence();
    }

    @Override
    public List<User> getPlayerAssociatedToPelada(Long id) {
        Pelada pelada = getPelada(id);
        return pelada.getPlayers();
    }

    @Override
    public List<User> getPlayersDisassociated(Long id) {
        Pelada pelada = getPelada(id);
        List<User> allUsers = userService.getUsers();
        allUsers.removeAll(pelada.getPlayers());
        return allUsers;
    }

    static Pelada unwrapPelada(Optional<Pelada> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new PeladaNotFoundException(id);
    }
}
