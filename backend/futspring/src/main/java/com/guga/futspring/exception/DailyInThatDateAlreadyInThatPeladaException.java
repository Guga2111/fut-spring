package com.guga.futspring.exception;

public class DailyInThatDateAlreadyInThatPeladaException extends RuntimeException{
    public DailyInThatDateAlreadyInThatPeladaException() {
        super("Already have a daily in that pelada on that date.");
    }
}
