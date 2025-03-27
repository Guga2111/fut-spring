package com.guga.futspring.exception;

public class RankingNotFoundException extends RuntimeException{
    public RankingNotFoundException(Long id) {
        super("The ranking id '" + id +"' wasn't find in our records");
    }
}
