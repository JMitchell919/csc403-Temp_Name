package com.example.rest_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService, InteractionService interactionService) {
        this.postService = postService;
    }

    @GetMapping("/post")
    public Post post(@RequestParam(value = "id", defaultValue = "0") int id) {
        return postService.getPostById(id);
    }
}
