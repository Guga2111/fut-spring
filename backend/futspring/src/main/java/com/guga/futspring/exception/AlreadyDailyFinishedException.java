package com.guga.futspring.exception;

public class AlreadyDailyFinishedException extends RuntimeException {
    public AlreadyDailyFinishedException (Long id) {
        super("The daily with id: " + id + " have already been finished");
    }
}
