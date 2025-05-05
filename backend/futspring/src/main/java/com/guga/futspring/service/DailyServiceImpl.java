package com.guga.futspring.service;

import com.guga.futspring.entity.*;
import com.guga.futspring.entity.embedded.RankingEntry;
import com.guga.futspring.exception.AlreadyPlayerInDailyException;
import com.guga.futspring.exception.DailyNotFoundException;
import com.guga.futspring.exception.PlayerNotInPeladaException;
import com.guga.futspring.repository.DailyRepository;
import com.guga.futspring.repository.PeladaRepository;
import com.guga.futspring.repository.RankingRepository;
import com.guga.futspring.repository.TeamRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class DailyServiceImpl implements DailyService{

    DailyRepository dailyRepository;
    PeladaServiceImpl peladaService;
    UserServiceImpl userService;
    PeladaRepository peladaRepository;
    TeamRepository teamRepository;
    RankingRepository rankingRepository;

    @Override
    public Daily getDaily(Long id) {
        Optional<Daily> daily = dailyRepository.findById(id);
        return unwrapDaily(daily, id);
    }

    @Override
    public List<Daily> getDailys() {
        return (List<Daily>) dailyRepository.findAll();
    }

    @Override
    @Transactional
    public Daily createDaily(Daily daily, Long peladaId) {
        Pelada pelada = peladaService.getPelada(peladaId);
        pelada.getDailies().add(daily);
        peladaRepository.save(pelada);
        daily.setPelada(pelada);
        daily.setIsFinished(false);
        return dailyRepository.save(daily);
    }

    @Override
    public Daily confirmPresenceInDaily(Long dailyId, Long playerId) {

        User player = userService.getUser(playerId);
        Daily daily = getDaily(dailyId);

        validatePresence(daily, player);

        daily.getPlayersPresence().add(player); 

        return dailyRepository.save(daily);
    }

    @Override
    @Transactional
    public Daily finalizeDaily(Long dailyId, List<RankingEntry> prizes) {
        Optional<Daily> daily = dailyRepository.findById(dailyId);

        if(daily.isEmpty()) throw new DailyNotFoundException(dailyId);

        Daily unwrapDaily = daily.get();
        unwrapDaily.setPrizeEntries(prizes);
        unwrapDaily.setIsFinished(true);

        Ranking ranking = unwrapDaily.getPelada().getRanking();
        if(ranking == null) throw new IllegalStateException("Ranking não encontrado para a Pelada da Daily " + dailyId);

        ranking.getPrizes().addAll(prizes);
        rankingRepository.save(ranking);
        return dailyRepository.save(unwrapDaily);
    }

    @Override
    public List<Team> sortTeamsBasedOnStars(Long id, int numberOfTeams) {

        Daily daily = getDaily(id);
        List<User> confirmedPlayers = daily.getPlayersPresence();

        if(confirmedPlayers.size() < numberOfTeams) throw new IllegalArgumentException("Not suficient players to form a team");

        Collections.shuffle(confirmedPlayers);

        List<User> stars5 = new ArrayList<>();
        List<User> stars4 = new ArrayList<>();
        List<User> stars3 = new ArrayList<>();
        List<User> stars2 = new ArrayList<>();
        List<User> stars1 = new ArrayList<>();

        for(User player : confirmedPlayers) {
            switch(player.getStars()) {
                case 5 -> stars5.add(player);
                case 4 -> stars4.add(player);
                case 3 -> stars3.add(player);
                case 2 -> stars2.add(player);
                case 1 ->stars1.add(player);
            }
        }

        stars4.addAll(redistributeExtraPlayers(stars5));
        stars3.addAll(redistributeExtraPlayers(stars4));
        stars2.addAll(redistributeExtraPlayers(stars3));
        stars1.addAll(redistributeExtraPlayers(stars2));

        List<Team> teams = new ArrayList<>();
        for(int i = 0; i < numberOfTeams; i++) {
            Team team = new Team();
            team.setName("Team " + (i + 1));
            team.setDaily(daily);
            team.setPoints(0);
            teams.add(team);
        }

        for (int i = 0; i < numberOfTeams; i++) {
            List<User> teamPlayers = new ArrayList<>();

            if (i < stars5.size()) teamPlayers.add(stars5.get(i));
            if (i < stars4.size()) teamPlayers.add(stars4.get(i));
            if (i < stars3.size()) teamPlayers.add(stars3.get(i));
            if (i < stars2.size()) teamPlayers.add(stars2.get(i));
            if (i < stars1.size()) teamPlayers.add(stars1.get(i));

            teams.get(i).setPlayers(teamPlayers);
        }

        Iterable<Team> savedTeams = teamRepository.saveAll(teams);

        List<Team> result = new ArrayList<>();
        savedTeams.forEach(result::add);

        return result;
    }

    @Override
    public Daily updateDaily() {
        return null;
    }

    static void validatePresence(Daily daily, User player) {
        if (daily.getPlayersPresence().contains(player)) {
            throw new AlreadyPlayerInDailyException(player.getId());
        }

        if (!daily.getPelada().getPlayers().contains(player)) {
            throw new PlayerNotInPeladaException(player.getId(), daily.getPelada().getId());
        }
    }

    @Override
    public void removeDaily(Long id) {
        dailyRepository.deleteById(id);
    }

    static Daily unwrapDaily(Optional<Daily> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new RuntimeException();
    }

    private List<User> redistributeExtraPlayers(List<User> higherStars) {
        List<User> redistributed = new ArrayList<>();
        while (higherStars.size() > redistributed.size() + 1) {
            User player = higherStars.remove(higherStars.size() - 1); // Remove o último jogador
            redistributed.add(player); // Adiciona à lista temporária
        }
        return redistributed;
    }
}
