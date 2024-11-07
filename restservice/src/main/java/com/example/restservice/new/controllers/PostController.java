package com.example.rest_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class PostController {

    private final PostServiceNew postServiceNew;

    @Autowired
    public PostController(PostServiceNew postServiceNew, InteractionService interactionService) {
        this.postServiceNew = postServiceNew;
    }

    // Get a single post's data. (/view page)
    @GetMapping("/post")
    public Post post(@RequestParam(value = "id", defaultValue = "0") int id) { 
        return postServiceNew.readPost(id);
    }
}
