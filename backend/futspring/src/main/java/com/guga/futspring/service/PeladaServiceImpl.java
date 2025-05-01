package com.guga.futspring.service;

import com.guga.futspring.entity.Pelada;
import com.guga.futspring.entity.Ranking;
import com.guga.futspring.entity.Stats;
import com.guga.futspring.entity.User;
import com.guga.futspring.exception.AlreadyPlayerAssociatedException;
import com.guga.futspring.repository.PeladaRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PeladaServiceImpl implements PeladaService{

    private final PeladaRepository peladaRepository;
    private final RankingServiceImpl rankingService;
    private final UserServiceImpl userService;

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
    public Pelada savePelada(Pelada pelada, MultipartFile imageFile) throws IOException {
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
        Ranking ranking = rankingService.initializeRanking(pelada);
        pelada.setRanking(ranking);

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
    public Pelada updatePelada(Long id, String name, float duration, String time) {
        return null;
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
    public List<User> getPlayerAssociatedToPelada(Long id) {
        Pelada pelada = getPelada(id);
        return pelada.getPlayers();
    }

    static Pelada unwrapPelada(Optional<Pelada> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new RuntimeException();
    }
}
