package com.guga.futspring.repository;

import com.guga.futspring.entity.Player;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
@Repository
public class PlayerRepository {
    List<Player> players = new ArrayList<>();

    public List<Player> getPlayers() {
        return players;
    }

    public void addPlayer(Player player) {
        players.add(player);
    }

    public Player getPlayer(Long id) {

        for(Player player : players) {
            if(player.getId() == id) {
                return player;
            }
        }
        return null;
    }
}
