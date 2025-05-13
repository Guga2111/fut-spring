package com.guga.futspring.repository;

import com.guga.futspring.entity.Message;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageRepository extends CrudRepository<Message, Long> {
    List<Message> findByPeladaIdOrderBySentAtAsc(Long peladaId);
}
