package com.guga.futspring.service;

import com.guga.futspring.entity.User;

import java.util.List;

public interface UserService {
    User getUser(Long id);
    User getUser(String email);
    List<User> getUsers();
    User saveUser(User user);
    User updateUser(int stars, Long id);
    void deleteUser(Long id);

}
