package com.guga.futspring.exception;

public class PlayerNotInPeladaException extends RuntimeException{
    public PlayerNotInPeladaException(Long playerId, Long peladaId) {
        super("The player with id '"+ playerId + "' not belong to the pelada with id '"+ peladaId + "'");
    }
}
