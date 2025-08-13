package com.guga.futspring.exception;

public class EmailAlreadyHaveException extends RuntimeException {
    public EmailAlreadyHaveException (String email) {
        super("The email: " + email + " already exists.");
    }
}
