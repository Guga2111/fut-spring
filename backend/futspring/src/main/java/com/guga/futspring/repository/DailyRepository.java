package com.guga.futspring.repository;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.Pelada;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyRepository extends CrudRepository<Daily, Long> {
    Optional<Daily> findByPeladaAndDailyDate(Pelada pelada, LocalDate dailyDate);

    List<Daily> findByPeladaOrderByDailyDateAscDailyTimeAsc(Pelada pelada);
}
