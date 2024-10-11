package com.example.rest_service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
public class PostsController {

    private Posts postsManager = new Posts(new ArrayList<>());

    @GetMapping("/posts")
    public List<Post> posts() {
        return postsManager.readPosts();
    }

    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        postsManager.writePost(post);

        // Return 201
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }
}


