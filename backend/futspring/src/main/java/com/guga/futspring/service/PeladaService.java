package com.guga.futspring.service;

import com.guga.futspring.entity.Pelada;
import com.guga.futspring.entity.User;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PeladaService {
    List<Pelada> getPeladas();
    Pelada getPelada(Long id);
    Pelada savePelada(Pelada pelada, MultipartFile imageFile) throws IOException;
    Resource getImage(String filename);
    void deletePelada(Long id);
    Pelada updatePelada(Long id, String name, float duration, String time);
    Pelada associatePlayerToPelada(Long id, Long userId);
    List<User> getPlayerAssociatedToPelada(Long id);
    List<User> getPlayersDisassociated(Long id);

}
