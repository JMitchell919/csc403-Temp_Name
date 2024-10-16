package com.example.rest_service;

import org.springframework.stereotype.Service;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class PostService {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/lochyl";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "password";

    public Post getPostById(int postId) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        Post post = null;

        if (postId == 0) {
            return post;
        }

        try {
            conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
            String sql ="SELECT posts.*, users.profile_pic, post_pics.pic_url " +
                        "FROM posts " +
                        "LEFT JOIN users ON posts.username = users.username " +
                        "LEFT JOIN post_pics ON posts.id = post_pics.post_id " +
                        "WHERE posts.id=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, postId);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                int id = rs.getInt("id");
                String username = rs.getString("username");
                String profilePic = rs.getString("profile_pic");
                String location = rs.getString("location");
                String date = rs.getString("date");
                String text = rs.getString("text");
                int likeCount = rs.getInt("like_count");
                int dislikeCount = rs.getInt("dislike_count");
                int commentCount = rs.getInt("comment_count");

                String postPicsStr = rs.getString("pic_url");
                List<String> postPics = postPicsStr != null ? Arrays.asList(postPicsStr.split(",")) : new ArrayList<>();

                post = new Post(id, username, profilePic, location, date, text, postPics, likeCount, dislikeCount, commentCount);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return post;
    }
}
