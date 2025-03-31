package com.guga.futspring.exception;

public class GeneralStatsNotFoundException extends RuntimeException{
    public GeneralStatsNotFoundException(Long id) {
        super("The stats id '" + id + "' was't found in our records!");
    }
}
