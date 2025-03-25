package com.guga.futspring.exception;

public class StatsNotFoundException extends RuntimeException{
    public StatsNotFoundException(Long id) {
        super("The id '" + id + "' was't found in our records!");
    }
}
