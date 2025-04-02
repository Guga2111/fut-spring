package com.guga.futspring.service;

import com.guga.futspring.entity.Pelada;
import com.guga.futspring.entity.Ranking;
import com.guga.futspring.entity.User;
import com.guga.futspring.exception.AlreadyPlayerAssociatedException;
import com.guga.futspring.repository.PeladaRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PeladaServiceImpl implements PeladaService{

    PeladaRepository peladaRepository;
    RankingServiceImpl rankingService;
    UserServiceImpl userService;

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
    @Transactional
    public Pelada savePelada(Pelada pelada) {
        Ranking ranking = new Ranking();
        ranking.setGoals(0);
        ranking.setAssists(0);
        ranking.setPelada(pelada);
        ranking.setPuskas(new ArrayList<>());
        ranking.setGarcom(new ArrayList<>());
        ranking.setArtilharia(new ArrayList<>());
        rankingService.saveRanking(ranking);

        pelada.setRanking(ranking);
        return peladaRepository.save(pelada);
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
    public Pelada associatePlayerToPelada(Long id, Long userId) {

        User user = userService.getUser(userId);

        if(!getPelada(id).getPlayers().contains(user)) {
            Pelada pelada = getPelada(id);
            pelada.getPlayers().add(user);
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
