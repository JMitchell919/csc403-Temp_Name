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
            @RequestParam("email") String email) { 
        
        return userService.registerUser(username, password, email);
    }
    // Endpoint to fetch all user information by username
    @GetMapping("/getUser")
    public ResponseEntity<User> getUserByUsername(@RequestParam String username) {
        User user = registerService.getUserByUsername(username);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to fetch only username and profilePic by userID
    @GetMapping("/getUserInfo")
    public ResponseEntity<User> getUserInfoById(@RequestParam int userID) {
        User user = registerService.getUserInfoById(userID);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
