package com.guga.futspring.exception;

public class StatsNotFoundException extends RuntimeException{
    public StatsNotFoundException(Long id) {
        super("The stats id '" + id + "' was't found in our records!");
    }
}
