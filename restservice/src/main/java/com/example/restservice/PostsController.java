package com.example.rest_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;

@RestController
public class PostsController {

    @GetMapping("/posts")
    public List<Post> posts() {
        return Posts.retrievePosts();
    }
}
