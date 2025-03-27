package com.guga.futspring.service;

import com.guga.futspring.entity.Pelada;
import com.guga.futspring.entity.User;

import java.util.List;

public interface PeladaService {
    List<Pelada> getPeladas();
    Pelada getPelada(Long id);
    Pelada savePelada(Pelada pelada);
    void deletePelada(Long id);
    Pelada updatePelada(Long id, String name, float duration, String time);
    Pelada associatePlayerToPelada(Long id, Long userId);
    List<User> getPlayerAssociatedToPelada(Long id);
}
