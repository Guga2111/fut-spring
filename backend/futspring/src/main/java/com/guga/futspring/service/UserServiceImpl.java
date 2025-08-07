package com.guga.futspring.service;

import com.guga.futspring.entity.Stats;
import com.guga.futspring.entity.User;
import com.guga.futspring.exception.UserNotFoundException;
import com.guga.futspring.repository.UserRepository;
import com.guga.futspring.security.SecurityConstants;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final StatsServiceImpl statsService;


    @Value("${file.upload-dir}")
    private String uploadDir;

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
    public Stats getStats(Long id) {
        System.out.println("OIIIUIIIIIII");
        Optional<User> user = userRepository.findById(id);
        User unwrapUser = unwrapUser(user, id);
        return unwrapUser.getStats();
    }

    @Override
    public User saveUser(User user) {

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Stats stats = statsService.initializeStats(user);
        user.setStats(stats);
        user.setImage(null);
        user.setRoles(Stream.of(SecurityConstants.SPRING_ROLE_PREFIX + SecurityConstants.ROLE_USER).collect(Collectors.toCollection(HashSet::new)));

        return userRepository.save(user);
    }

    @Override
    public User updateUserInfo(Long id, int stars, String position) {
        Optional<User> user = userRepository.findById(id);
        User unwrapUser = unwrapUser(user, id);
        unwrapUser.setStars(stars);
        unwrapUser.setPosition(position);
        return userRepository.save(unwrapUser);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User saveUserImage(Long id ,MultipartFile imageFile, String imageType) throws IOException {
        if(imageFile != null && !imageFile.isEmpty()) {
            File directory = new File(uploadDir);
            if(!directory.exists()) {
                directory.mkdirs();
            }
        }

        String prefix = "default";
        if(imageFile.equals("profile")) {
            prefix = "profile";
        } else if(imageFile.equals("background")) {
            prefix = "background";
        }

        String filename = prefix + "_" + UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, filename);

        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        User user = getUser(id);
        if ("profile".equals(imageType)) {
            user.setImage(filename);
        } else if ("background".equals(imageType)) {
            user.setBackgroundImage(filename);
        }

        return userRepository.save(user);
    }

    @Override
    public Resource getImage(String filename) {

        try{
            Path imagePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(imagePath.toUri());

            if(resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read image file: " + filename);
            }

        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }


    @Override
    public List<String> getAllImageFilenames() {
        Iterable<User> users = userRepository.findAll();
        return StreamSupport.stream(users.spliterator(), false)
                .map(User::getImage)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    static User unwrapUser(Optional<User> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new UserNotFoundException(id);
    }
}
