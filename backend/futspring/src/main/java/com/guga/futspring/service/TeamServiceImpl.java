package com.guga.futspring.service;

import com.guga.futspring.entity.Team;
import com.guga.futspring.entity.User;
import com.guga.futspring.exception.UserNotFoundException;
import com.guga.futspring.repository.TeamRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TeamServiceImpl implements TeamService{

    TeamRepository teamRepository;

    @Override
    public Team getTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        return unwrapTeam(team, id);
    }

    @Override
    public List<Team> getTeams() {
        return (List<Team>) teamRepository.findAll();
    }

    @Override
    public List<User> getPlayersOfATeam(Long id) {
        Team team = getTeam(id);
        return team.getPlayers();
    }

    @Override
    public Team saveTeam(Team team) {
        return teamRepository.save(team);
    }

    @Override
    public void deleteTeam(Long id) {
        teamRepository.deleteById(id);
    }

    static Team unwrapTeam(Optional<Team> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new UserNotFoundException(id);
    }
}
