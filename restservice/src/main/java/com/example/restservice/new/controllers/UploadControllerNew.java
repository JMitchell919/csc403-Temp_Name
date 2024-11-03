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

    // Upload post (/post page)
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> createPost(
        @RequestParam("username") String username,
        @RequestParam("location") String location,
        @RequestParam("latitude") Double latitude,
        @RequestParam("longitude") Double longitude,
        @RequestParam("text") String text,
        @RequestParam(value = "files", required = false) MultipartFile[] files
    ) {
        System.out.println("Username: " + username);
        System.out.println("Location: " + location);
        System.out.println("Latitude: " + latitude);
        System.out.println("Longitude: " + longitude);
        System.out.println("Text: " + text);
        try {
            
            postService.writePost(username, location, latitude, longitude, text, files != null ? files : new MultipartFile[0]);
            return ResponseEntity.ok("Post created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while creating post");
        }
    }
}
