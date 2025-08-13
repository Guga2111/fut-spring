package com.guga.futspring.exception;

public class UsernameAlreadyHaveException extends RuntimeException {
    public UsernameAlreadyHaveException (String username) {
        super("The username: " + username + " already exists.");
    }
}
