package com.guga.futspring.exception;

public class PeladaNotFoundException extends RuntimeException{
    public PeladaNotFoundException(Long id) {
        super("The pelada id '"+ id + "' wasn't found in our records");
    }
}
