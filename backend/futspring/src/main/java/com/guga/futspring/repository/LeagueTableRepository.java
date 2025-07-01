package com.guga.futspring.repository;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.LeagueTable;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface LeagueTableRepository extends CrudRepository<LeagueTable, Long> {
    Optional<LeagueTable> findLeagueTableByDaily(Daily daily);
}
