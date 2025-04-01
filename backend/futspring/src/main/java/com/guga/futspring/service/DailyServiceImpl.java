package com.guga.futspring.service;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.repository.DailyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DailyServiceImpl implements DailyService{

    DailyRepository dailyRepository;

    @Override
    public Daily getDaily(Long id) {
        Optional<Daily> daily = dailyRepository.findById(id);
        return unwrapDaily(daily, id);
    }

    @Override
    public List<Daily> getDailys() {
        return (List<Daily>) dailyRepository.findAll();
    }

    @Override
    public Daily createDaily(Daily daily) {
        return dailyRepository.save(daily);
    }

    @Override
    public Daily updateDaily() {
        return null;
    }

    @Override
    public void removeDaily(Long id) {
        dailyRepository.deleteById(id);
    }

    static Daily unwrapDaily(Optional<Daily> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new RuntimeException();
    }
}
