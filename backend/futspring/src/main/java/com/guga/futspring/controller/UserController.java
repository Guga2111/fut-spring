package com.guga.futspring.controller;

import com.guga.futspring.entity.Stats;
import com.guga.futspring.entity.User;
import com.guga.futspring.service.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "localhost:3030/Login")
@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    UserServiceImpl userService;

    @GetMapping("/{id}")
    public ResponseEntity<String> findById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUser(id).getUsername(), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<User> getUserByEmail (@RequestParam String email) {
        User user = userService.getUser(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> saveUser(@Valid @RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("{id}/stats")
    public ResponseEntity<Stats> getStats(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getStats(id), HttpStatus.OK);
    }

    @PutMapping(value = "/image/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> saveUserImage(@PathVariable Long id ,@RequestPart(value = "image", required = false)MultipartFile imageFile) throws IOException {
        System.out.println("oi");
        return new ResponseEntity<>(userService.saveUserImage(id , imageFile), HttpStatus.OK);
    }

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        Resource imageResource = userService.getImage(filename);
        System.out.println("⚙️ getImage() chamado para filename = " + filename);

        if (imageResource != null && imageResource.exists()) {

            String contentType = "image/jpeg";
            try {
                contentType = Files.probeContentType(
                        Paths.get(imageResource.getFile().getAbsolutePath())
                );
            } catch (IOException e) {

            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));

            return new ResponseEntity<>(imageResource, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/images")
    public ResponseEntity<List<String>> listAllImageFilenames() {
        List<String> filenames = userService.getAllImageFilenames();
        return new ResponseEntity<>(filenames, HttpStatus.OK);
    }
}
