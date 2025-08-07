package com.guga.futspring.repository;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.Pelada;
import com.guga.futspring.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PeladaRepository extends CrudRepository<Pelada, Long> {
    List<Pelada> findByAutoCreateDailyEnabledTrue();
    List<Pelada> findByCreator(User creator);
}
