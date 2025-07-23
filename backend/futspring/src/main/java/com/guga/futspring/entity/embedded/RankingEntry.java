package com.guga.futspring.entity.embedded;

import com.guga.futspring.entity.enums.Prize;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RankingEntry {
    private Long userId;

    private LocalDate date;
    
    private Prize typeOfPrize;

}
