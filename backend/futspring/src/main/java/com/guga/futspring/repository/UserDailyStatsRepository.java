package com.guga.futspring.repository;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.User;
import com.guga.futspring.entity.UserDailyStats;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserDailyStatsRepository extends CrudRepository<UserDailyStats, Long> {
    UserDailyStats findByUserAndDaily(User user, Daily daily);
}
