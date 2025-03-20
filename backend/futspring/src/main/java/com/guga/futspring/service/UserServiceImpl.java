package com.guga.futspring.service;

import com.guga.futspring.entity.User;
import com.guga.futspring.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return (List<User>)userRepository.findAll();
    }

    @Override
    public User getUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        return unwrapUser(user, id);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(int stars, Long id) {
        Optional<User> user = userRepository.findById(id);
        User unwrapUser = unwrapUser(user, id);
        unwrapUser.setStars(stars);
        return userRepository.save(unwrapUser);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    static User unwrapUser(Optional<User> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new RuntimeException(); // por enquanto
    }
}
