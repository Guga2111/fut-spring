package com.guga.futspring.exception;

public class AlreadyPlayerAssociatedException extends RuntimeException{
    public AlreadyPlayerAssociatedException(Long id) {
        super("The player with id '" + id + "' already is associated with this pelada");
    }
}
