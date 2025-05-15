package com.guga.futspring.service;

import com.guga.futspring.entity.Stats;
import com.guga.futspring.entity.User;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    User getUser(Long id);
    User getUser(String email);
    List<User> getUsers();
    User saveUser(User user);
    User updateUser(int stars, Long id);
    void deleteUser(Long id);
    Stats getStats(Long id);
    Resource getImage(String filename);
    User saveUserImage(Long id, MultipartFile imageFile, String imageType) throws IOException;
    List<String> getAllImageFilenames();
}
