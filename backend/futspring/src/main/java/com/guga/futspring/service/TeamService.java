package com.guga.futspring.service;

import com.guga.futspring.entity.Team;

import java.util.List;

public interface TeamService {
    Team getTeam(Long id);
    List<Team> getTeams();
    Team saveTeam(Team team);
    void deleteTeam(Long id);
    Team addPoints(int points, Long id);
}
