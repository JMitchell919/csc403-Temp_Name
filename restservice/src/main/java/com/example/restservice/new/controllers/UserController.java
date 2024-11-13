package com.example.rest_service;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    // Get a single post's data. (/view page)
    // @PostMapping("/register")
    // public ResponseEntity<String> registerUser(@RequestBody Map<String, String> userData) {
    //     String username = userData.get("username");
    //     String password = userData.get("password");
    //     String email = userData.get("email");

    //     try {
    //         userService.writeUser(username, password, email);
    //         return ResponseEntity.ok("User created successfully");
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
    //     }
    // }

    // Endpoint to fetch all user information by username
    // @GetMapping("/getUser")
    // public ResponseEntity<Map<String, Object>> getUser(@RequestParam String username) {
    //     Map<String, Object> userData = userService.readUser(username);
    //     if (userData != null) {
    //         return ResponseEntity.ok(userData);
    //     } else {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HashMap<>());
    //     }
    // }

    // // Endpoint to fetch only username and profilePic by userID
    // @GetMapping("/getUserInfo")
    // public ResponseEntity<Map<String, Object>> getUserInfo(@RequestParam int userId) {
    //     Map<String, Object> userInfo = userService.readUserInfo(userId);
    //     if (userInfo != null) {
    //         return ResponseEntity.ok(userInfo);
    //     } else {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HashMap<>());
    //     }
    // }

    @GetMapping("/getUser")
    public User getUser (
        @RequestParam(required = false) String username,
        @RequestParam(required = false) Integer id) {

        if (username != null) {
            return userService.getUser(username);
        } else if (id != null) {
            return userService.getUser(id);
        } else {
            throw new IllegalArgumentException("Either 'username' or 'id' must be provided.");
        }
    }
}
