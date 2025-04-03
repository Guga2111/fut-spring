package com.guga.futspring.exception;

public class AlreadyPlayerInDailyException extends RuntimeException{
    public AlreadyPlayerInDailyException(Long id) {
        super("The player with id '" + id + "' already belong to the daily");
    }
}
