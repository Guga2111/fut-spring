package com.guga.futspring.exception;


public class MaximumPlayersOnDailyException extends RuntimeException{
    public MaximumPlayersOnDailyException(int numberOfPlayers) {
        super("Already reach the maximum number of players: " + numberOfPlayers + " players");
    }
}
