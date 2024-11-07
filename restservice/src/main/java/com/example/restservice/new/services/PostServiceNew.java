package com.example.rest_service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.UUID;
import java.nio.file.*;
import java.util.List;
import java.util.ArrayList;
import java.sql.SQLException;

@Service
public class PostServiceNew {

    private SqlService sqlService;

    private final String uploadDir = "../web/src/assets/postImages/";

    // Constructor injection
    public PostServiceNew(SqlService sqlService) {
        this.sqlService = sqlService.getInstance();
    }

    public void writePost(String username, String location, Double latitude, Double longitude, String text, MultipartFile[] files) throws IOException {
        // Write post to posts table
        int postId = sqlService.write(
            "INSERT INTO posts (username, location, latitude, longitude, text) VALUES (?, ?, ?, ?, ?)",
            username,
            location,
            latitude,
            longitude,
            text);

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

    public Post readPost(int postId) {
        SqlResultSet rsPosts = sqlService.read(
            "SELECT posts.*, users.profile_pic " +
            "FROM posts " +
            "LEFT JOIN users ON posts.username = users.username " +
            "WHERE posts.id = ? ", postId);

        try {
            if (!rsPosts.getResultSet().next()) {
                return null;
            }

            List<String> postPics = new ArrayList<>();
            SqlResultSet rsPics = sqlService.read("SELECT * FROM post_pics WHERE post_id = ?", postId);

            while (rsPics.next()) {
                postPics.add(rsPics.getString("pic_url"));
            }

            return new Post(
                rsPosts.getInt("id"),
                rsPosts.getString("username"), 
                rsPosts.getString("profile_pic"), 
                rsPosts.getString("location"), 
                rsPosts.getDouble("latitude"),
                rsPosts.getDouble("longitude"), 
                rsPosts.getTimestamp("date"),
                rsPosts.getString("text"), 
                postPics, 
                rsPosts.getInt("like_count"), 
                rsPosts.getInt("dislike_count"), 
                rsPosts.getInt("comment_count")
            );
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}
