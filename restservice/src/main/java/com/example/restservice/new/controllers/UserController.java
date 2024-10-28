package com.example.rest_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;



import java.util.Map;

@RestController
public class UserController {

    private final UserServiceNew userServiceNew;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get a single post's data. (/view page)
    @PostMapping("/register")
    public User user(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("email") String email,) { 
        
        return userService.writeUser(username, password, email);
    }
}