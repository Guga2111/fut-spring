package com.guga.futspring.entity.embedded;

import com.guga.futspring.service.UserServiceImpl;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RankingEntry {
    UserServiceImpl userService;

    private Long userId;
    private String name;
    private int quantity;
}
