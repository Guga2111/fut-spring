package com.guga.futspring.service;

import com.guga.futspring.entity.Daily;

import java.util.List;

public interface DailyService {
    Daily getDaily(Long id);
    List<Daily> getDailys();
    Daily createDaily(Daily daily);
    Daily updateDaily();
    void removeDaily(Long id);
}
