package com.guga.futspring.repository;

import com.guga.futspring.entity.Team;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TeamRepository extends CrudRepository<Team, Long> {

    @Query("SELECT t FROM Team t JOIN t.players p WHERE t.daily.id = :dailyId AND p.id = :userId")
    Optional<Team> findTeamByDailyIdAndUserId(@Param("dailyId") Long dailyId, @Param("userId") Long userId);
}
