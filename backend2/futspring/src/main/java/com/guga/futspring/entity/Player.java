package com.guga.futspring.entity;

import lombok.*;

@Getter
@Setter
public class Player {

    private Long id;

    private String username;

    public Player(Long id, String username) {
        this.id = id;
        this.username = username;
    }

}
