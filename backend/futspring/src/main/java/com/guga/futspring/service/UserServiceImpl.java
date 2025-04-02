package com.guga.futspring.service;

import com.guga.futspring.entity.Stats;
import com.guga.futspring.entity.User;
import com.guga.futspring.exception.UserNotFoundException;
import com.guga.futspring.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    BCryptPasswordEncoder bCryptPasswordEncoder;
    UserRepository userRepository;
    StatsServiceImpl statsService;

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
    public User getUser(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return unwrapUser(user, user.get().getId());
    }

    @Override
    public User saveUser(User user) {

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Stats stats = statsService.initializeStats(user);
        user.setStats(stats);

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
        else throw new UserNotFoundException(id);
    }
}
