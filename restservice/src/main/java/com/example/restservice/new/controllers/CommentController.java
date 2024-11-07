package com.example.rest_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class CommentController {
    private final PostService postService;
    private final CommentService commentService;

    @Autowired
    public CommentController(PostService postService, CommentService commentService) {
        this.postService = postService;
        this.commentService = commentService;
    }

    // submit comment
    @PostMapping("/comment")
    public ResponseEntity<?> postComment(@RequestBody CommentRequestDTO commentRequest){
        try {
            commentService.writeComment(
                commentRequest.getPostId(),
                commentRequest.getParentId(),
                commentRequest.getUsername(),
                commentRequest.getText()
            );
            return ResponseEntity.ok("Comment created successfully");
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while creating comment");
        }
    }
    

    // get comments by post id
    @GetMapping("/comments")
    public List<Comment> getComments(@RequestParam int postId) {
        return commentService.getCommentsByPostId(postId);
    }
}