package com.guga.futspring.service;

import com.guga.futspring.entity.Ranking;
import com.guga.futspring.exception.RankingNotFoundException;
import com.guga.futspring.repository.RankingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class RankingServiceImpl implements RankingService{
    RankingRepository rankingRepository;

    @Override
    public List<Ranking> getRankings() {
        return (List<Ranking>) rankingRepository.findAll();
    }

    @Override
    public Ranking getRanking(Long id) {
        Optional<Ranking> ranking = rankingRepository.findById(id);
        return unwrapRanking(ranking, id);
    }

    @Override
    public Ranking saveRanking(Ranking ranking) {
        return rankingRepository.save(ranking);
    }

    @Override
    public void deleteRanking(Long id) {
        rankingRepository.deleteById(id);
    }

    @Override
    public Ranking updateRanking(int matches, int goals, int assists, Long id) {
        Optional<Ranking> ranking = rankingRepository.findById(id);
        Ranking unwrapRanking = unwrapRanking(ranking, id);
        unwrapRanking.setGoals(goals);
        unwrapRanking.setMatches(matches);
        unwrapRanking.setAssists(assists);
        return rankingRepository.save(unwrapRanking);
    }

    static Ranking unwrapRanking(Optional<Ranking> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new RankingNotFoundException(id);
    }
}
