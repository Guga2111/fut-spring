package com.guga.futspring.exception;

public class NotSuficientPlayersToSortTeamsException extends RuntimeException{
    public NotSuficientPlayersToSortTeamsException(int numberOfTeams) {
        super("The number of teams is bigger than the number of players: " + numberOfTeams);
    }
}
