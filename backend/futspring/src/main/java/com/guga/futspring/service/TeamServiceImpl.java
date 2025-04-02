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
    public Team saveTeam(Team team) {
        return teamRepository.save(team);
    }

    @Override
    public void deleteTeam(Long id) {
        teamRepository.deleteById(id);
    }

    @Override
    public Team addPoints(int points, Long id) {
        Optional<Team> team = teamRepository.findById(id);
        Team unwrapedTeam = unwrapTeam(team, id);

        unwrapedTeam.setPoints(unwrapedTeam.getPoints() + points);
        return teamRepository.save(unwrapedTeam);
    }

    static Team unwrapTeam(Optional<Team> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new UserNotFoundException(id);
    }
}
