package com.guga.futspring.repository;

import com.guga.futspring.entity.Ranking;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RankingRepository extends CrudRepository<Ranking, Long> {
}
