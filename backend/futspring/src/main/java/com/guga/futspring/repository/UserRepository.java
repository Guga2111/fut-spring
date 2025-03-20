package com.guga.futspring.repository;

import com.guga.futspring.entity.User;
import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;


public interface UserRepository extends CrudRepository<User, Long> {
}
