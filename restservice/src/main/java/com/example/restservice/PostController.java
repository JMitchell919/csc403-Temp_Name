package com.example.rest_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.rest_service.Post;

import org.springframework.web.bind.annotation.*;

@RestController
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/post")
    public Post post(@RequestParam(value = "id", defaultValue = "0") int id) {
        return postService.getPostById(id);
    }

    @PostMapping("/interaction")
    public ResponseEntity<Post> interaction(@RequestParam(required = true, defaultValue = "0") int id,
                    @RequestParam(required = true) String method,
                    @RequestParam(required = true) String type) {
                        Post post = postService.getPostById(id);

                        if (post.get(id) != 0) {
                            return ResponseEntity.status(HttpStatus.NOT_FOUND);
                        }

                        if (method == "add") {
                            if (type == "like") {
                                post.incrementLikeCount();
                            } 
                            else if (type == "dislike") {
                                post.incrementDisikeCount();
                            } 
                            else {
                                return ResponseEntity.status(HttpStatus.BAD_REQUEST);
                            }

                            return ResponseEntity.status(HttpStatus.OK);
                        }

                        else if (method == "remove") {
                            if (type == "like") {
                                post.decrementLikeCount();
                            } 
                            else if (type == "dislike") {
                                post.decrementDisikeCount();
                            } 
                            else {
                                return ResponseEntity.status(HttpStatus.BAD_REQUEST);
                            }

                            return ResponseEntity.status(HttpStatus.OK);

                        } else {
                            return ResponseEntity.status(HttpStatus.BAD_REQUEST);
                        }
                    }
}