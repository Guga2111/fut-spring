package com.guga.futspring.service;

import com.guga.futspring.entity.Pelada;
import com.guga.futspring.entity.Ranking;
import com.guga.futspring.entity.Stats;
import com.guga.futspring.exception.PeladaNotFoundException;
import com.guga.futspring.exception.RankingNotFoundForPelada;
import com.guga.futspring.repository.PeladaRepository;
import com.guga.futspring.repository.RankingRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class RankingServiceImpl implements RankingService{

    RankingRepository rankingRepository;
    PeladaRepository peladaRepository;

    @Override
    public Ranking getRanking(Long peladaId) {
        Optional<Pelada> pelada = peladaRepository.findById(peladaId);

        if(pelada.isEmpty()) throw new PeladaNotFoundException(peladaId);

        Ranking ranking = pelada.get().getRanking();

        if(ranking == null) throw new RankingNotFoundForPelada();

        return ranking;
    }

    @Override
    public List<Ranking> getRankings() {
        return (List<Ranking>) rankingRepository.findAll();
    }

    @Override
    public Ranking saveRanking(Ranking ranking) {
        return rankingRepository.save(ranking);
    }

    @Override
    public Ranking initializeRanking(Pelada pelada) {
        Ranking ranking = new Ranking();
        ranking.setGoals(0);
        ranking.setAssists(0);
        ranking.setPelada(pelada);
        ranking.setPrizes(new ArrayList<>());
        return rankingRepository.save(ranking);
    }

    @Override
    public Ranking updateRanking(int goals, int assists, Long id) {
        return null;
    }

    @Override
    @Transactional
    public void updateTotalGoalsAndAssists(Long rankingId) {
        Ranking ranking = unwrapRanking(rankingRepository.findById(rankingId));

        int totalGoals = ranking.getStats().stream().mapToInt(Stats::getGoals).sum();
        int totalAssists = ranking.getStats().stream().mapToInt(Stats::getAssists).sum();

        ranking.setGoals(totalGoals);
        ranking.setAssists(totalAssists);
        rankingRepository.save(ranking);
    }

    static Ranking unwrapRanking(Optional<Ranking> entity) {
        if(entity.isPresent()) return entity.get();
        else throw new RuntimeException();
    }
}
