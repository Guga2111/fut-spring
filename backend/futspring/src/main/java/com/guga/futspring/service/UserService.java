package com.guga.futspring.service;

import com.guga.futspring.entity.User;
import com.guga.futspring.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;

    public List<User> getUsers() {
        return (List<User>)userRepository.findAll();
    }
    
    public User getUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        return unwrapUser(user, id);
    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    static User unwrapUser(Optional<User> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new RuntimeException(); // por enquanto
    }
}
