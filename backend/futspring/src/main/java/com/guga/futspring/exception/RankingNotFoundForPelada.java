package com.guga.futspring.exception;

public class RankingNotFoundForPelada extends RuntimeException{
    public RankingNotFoundForPelada() {
        super("The ranking does not exists for that pelada");
    }
}
