package com.guga.futspring.service;

import com.guga.futspring.entity.*;
import com.guga.futspring.entity.embedded.LeagueTableEntry;
import com.guga.futspring.entity.embedded.RankingEntry;
import com.guga.futspring.entity.enums.DailyStatus;
import com.guga.futspring.exception.AlreadyPlayerInDailyException;
import com.guga.futspring.exception.DailyInThatDateAlreadyInThatPeladaException;
import com.guga.futspring.exception.DailyNotFoundException;
import com.guga.futspring.exception.LeagueTableNotFoundException;
import com.guga.futspring.exception.PlayerNotInPeladaException;
import com.guga.futspring.repository.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DailyServiceImpl implements DailyService{

    DailyRepository dailyRepository;
    PeladaServiceImpl peladaService;
    UserServiceImpl userService;
    PeladaRepository peladaRepository;
    TeamRepository teamRepository;
    RankingRepository rankingRepository;
    LeagueTableRepository leagueTableRepository;

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
    public List<Match> getDailyMatches(Long id) {
        Daily daily = getDaily(id);
        return daily.getMatches();
    }

    @Override
    public List<Team> getAssociatedTeams(Long id) {
        Daily daily = getDaily(id);
        return daily.getTeams();
    }

    @Override
    public List<User> getConfirmedPlayers(Long id) {
        Daily daily = getDaily(id);
        return daily.getPlayersPresence();
    }

    @Override
    @Transactional
    public Daily createDaily(Daily daily, Long peladaId) {
        Pelada pelada = peladaService.getPelada(peladaId);

        if(dailyRepository.findByPeladaAndDailyDate(pelada, daily.getDailyDate()).isPresent()) {
            throw new DailyInThatDateAlreadyInThatPeladaException();
        }

        daily.setPelada(pelada);
        daily.setIsFinished(false);
        daily.setCreationDateTime(LocalDateTime.now());
        daily.setStatus(DailyStatus.SCHEDULED);
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

        if (confirmedPlayers.size() < numberOfTeams) {
            throw new IllegalArgumentException("Not sufficient players to form a team");
        }

        Collections.shuffle(confirmedPlayers);

        Map<Integer, List<User>> playersByStars = confirmedPlayers.stream()
                .collect(Collectors.groupingBy(User::getStars, Collectors.toList()));

        List<Integer> starLevels = Arrays.asList(5, 4, 3, 2, 1);
        List<List<User>> sortedPlayerLists = new ArrayList<>();
        for (Integer stars : starLevels) {
            List<User> players = playersByStars.getOrDefault(stars, new ArrayList<>());
            Collections.shuffle(players); // Embaralha jogadores dentro da mesma estrela
            sortedPlayerLists.add(players);
        }

        List<Team> teams = new ArrayList<>();
        for (int i = 0; i < numberOfTeams; i++) {
            Team team = new Team();
            team.setName("Team " + (i + 1));
            team.setDaily(daily);
            team.setPlayers(new ArrayList<>());
            teams.add(team);
        }

        int teamIndex = 0;

        for (List<User> playerList : sortedPlayerLists) {
            for (User player : playerList) {
                teams.get(teamIndex).getPlayers().add(player);
                teamIndex = (teamIndex + 1) % numberOfTeams;
            }
        }

        int totalPlayersDistributed = teams.stream().mapToInt(team -> team.getPlayers().size()).sum();
        if (totalPlayersDistributed != confirmedPlayers.size()) {

            System.err.println("Erro: Nem todos os jogadores foram distribuídos! Distribuídos: " + totalPlayersDistributed + ", Confirmados: " + confirmedPlayers.size());
        }

        Iterable<Team> savedTeams = teamRepository.saveAll(teams);

        List<Team> result = new ArrayList<>();
        savedTeams.forEach(result::add);
        assignTeamToDailyLeagueTable(id, result);

        return result;
    }

    @Override
    public LeagueTable assignTeamToDailyLeagueTable(Long id, List<Team> teams) {
        Daily daily = dailyRepository.findById(id)
                .orElseThrow(() -> new DailyNotFoundException(id));

        LeagueTable leagueTable = leagueTableRepository.findLeagueTableByDaily(daily)
                .orElseThrow(() -> new LeagueTableNotFoundException(daily.getLeagueTable().getId()));

        List<LeagueTableEntry> entries = new ArrayList<>();

        for(Team team : teams) {
            LeagueTableEntry leagueTableEntry = new LeagueTableEntry();
            leagueTableEntry.setTeam(team);
            leagueTableEntry.setPoints(0);
            leagueTableEntry.setDraws(0);
            leagueTableEntry.setLosses(0);
            leagueTableEntry.setPosition(0);
            leagueTableEntry.setGoalDifference(0);
            leagueTableEntry.setGoalsConceded(0);
            leagueTableEntry.setGoalsScored(0);
            entries.add(leagueTableEntry);
        }

        leagueTable.setEntries(entries);
        leagueTable.setDaily(daily);

        return leagueTableRepository.save(leagueTable);
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
        else throw new DailyNotFoundException(id);
    }

}
