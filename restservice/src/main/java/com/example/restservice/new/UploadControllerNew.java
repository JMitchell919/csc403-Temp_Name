package com.example.rest_service;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;



@RestController
@RequestMapping("/upload")
public class UploadControllerNew {

    @Autowired
    private PostServiceNew postService;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> createPost(
        @RequestParam("username") String username,
        @RequestParam("location") String location,
        @RequestParam("date") String date,
        @RequestParam("text") String text,
        @RequestParam(value = "files", required = false) MultipartFile[] files
    ) {
        System.out.println("Received username: " + username);
        System.out.println("Received location: " + location);
        System.out.println("Received date: " + date);
        System.out.println("Received text: " + text);
        System.out.println("Number of files: " + (files != null ? files.length : 0));

        try {
            postService.writePost(username, location, date, text, files != null ? files : new MultipartFile[0]);
            return ResponseEntity.ok("Post created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while creating post");
        }
    }
}
