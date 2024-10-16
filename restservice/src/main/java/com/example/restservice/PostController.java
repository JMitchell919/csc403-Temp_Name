package com.example.rest_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class PostController {

    private final PostService postService;
    private final InteractionService interactionService;

    @Autowired
    public PostController(PostService postService, InteractionService interactionService) {
        this.postService = postService;
        this.interactionService = interactionService; // Initialize interactionService here
    }

    @GetMapping("/post")
    public Post post(@RequestParam(value = "id", defaultValue = "0") int id) {
        return postService.getPostById(id);
    }

    @PostMapping("/interaction")
    public ResponseEntity<Map<String, String>> interaction(
                    @RequestParam(required = true) int userId,
                    @RequestParam(required = true) int postId,
                    @RequestParam(required = true) String method,
                    @RequestParam(required = true) String type) {
        Post post = postService.getPostById(postId);

        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Post not found"));
        }

        if (method.equals("add")) {
            // Check if user has already interacted
            System.out.println("Checking interaction for userId: " + userId + ", postId: " + postId + ", type: " + type);
            System.out.println(interactionService.checkUserInteraction(userId, postId, type));
            if (interactionService.checkUserInteraction(userId, postId, type)) {
                System.out.println(String.format("User has already %sed this post", method));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", String.format("User has already %sd this post", method)));
            }

            // Increment like/dislike based on type
            if (type.equals("like")) {
                post.incrementLikeCount();
                System.out.println("incremented like");
            } else if (type.equals("dislike")) {
                post.incrementDislikeCount();
                System.out.println("incremented dislike");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Invalid type"));
            }

            // Add user interaction
            interactionService.addUserInteraction(userId, postId, type);
            System.out.println("inserted interaction");
            return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Interaction added successfully"));

        } else if (method.equals("remove")) {
            // Check if user has interacted before
            if (!interactionService.checkUserInteraction(userId, postId, type)) {
                System.out.println(String.format("User hasn't %sed this post yet", method));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", String.format("User hasn't %sd this post yet", method)));
            }

            // Decrement like/dislike based on type
            if (type.equals("like")) {
                post.decrementLikeCount();
                System.out.println("decremented like");
            } else if (type.equals("dislike")) {
                post.decrementDislikeCount();
                System.out.println("decremented dislike");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Invalid type"));
            }

            // Remove user interaction
            interactionService.removeUserInteraction(userId, postId);
            System.out.println("deleted interaction");
            return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Interaction removed successfully"));

        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Invalid method"));
        }
    }
}
