package com.guga.futspring.exception;

public class DailyNotFoundException extends RuntimeException{
    public DailyNotFoundException(Long id) {
        super("The id '" + id + "' was not found in our records!");
    }
}
