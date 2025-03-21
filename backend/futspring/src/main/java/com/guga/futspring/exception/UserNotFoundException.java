package com.guga.futspring.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id) {
        super("The id '" + id + "' was not found in our records!");
    }
}
