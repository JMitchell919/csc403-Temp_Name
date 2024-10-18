package com.example.rest_service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.UUID;
import java.nio.file.*;



@Service
public class PostServiceNew {

    private SqlService sqlService;

    // Define where to store the files
    private final String uploadDir = "../web/src/assets/postImages/";

    // Constructor injection
    public PostServiceNew(SqlService sqlService) {
        this.sqlService = sqlService;
    }

    public void writePost(String username, String location, String date, String text, MultipartFile[] files) throws IOException {
        // Write post to posts table
        int postId = sqlService.write(
            "INSERT INTO posts (username, location, date, text) VALUES (?, ?, ?, ?)",
            username,
            location,
            date,
            text);

        // Write image(s) to images table

        // Save each uploaded file
        for (MultipartFile file : files) {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.write(filePath, file.getBytes());

            // Save the reference in the post_pics table
            sqlService.write(
                "INSERT INTO post_pics (post_id, pic_url) VALUES (?, ?)",
                postId,
                fileName);
        }
    }
}
