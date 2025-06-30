package com.guga.futspring.exception;

public class LeagueTableNotFoundException extends RuntimeException{
    public LeagueTableNotFoundException(Long id) {
        super("The id '" + id + "' was not found in our records!");
    }
}
