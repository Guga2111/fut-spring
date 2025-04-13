package com.guga.futspring.exception;

public class MatchNotFoundException extends RuntimeException{
    public MatchNotFoundException(Long id) {
        super("The match id '"+ id + "' doesnt belong to our records");
    }
}
