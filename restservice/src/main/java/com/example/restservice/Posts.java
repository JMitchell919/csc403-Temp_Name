package com.example.rest_service;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Posts {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/lochyl";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "";

    private List<Post> posts;

    public Posts(List<Post> posts) {
        this.posts = posts;
    }

    public static List<Post> readPosts() {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<Post> postList = new ArrayList<>();

        try {
            conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

            String sql = "SELECT p.id, p.username, u.profile_pic, p.location, p.date, p.text, p.like_count, " +
                         "p.dislike_count, p.comment_count, GROUP_CONCAT(pp.pic_url) AS post_pics " +
                         "FROM posts p " +
                         "LEFT JOIN post_pics pp ON p.id = pp.post_id " +
                         "LEFT JOIN users u ON p.username = u.username " + // Join with the users table to fetch user data
                         "GROUP BY p.id";

            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String username = rs.getString("username");
                String profilePic = rs.getString("profile_pic");
                String location = rs.getString("location");
                String date = rs.getString("date");
                String text = rs.getString("text");
                int likeCount = rs.getInt("like_count");
                int dislikeCount = rs.getInt("dislike_count");
                int commentCount = rs.getInt("comment_count");

                String postPicsStr = rs.getString("post_pics");
                List<String> postPics = postPicsStr != null ? Arrays.asList(postPicsStr.split(",")) : new ArrayList<>();

                Post post = new Post(id, username, profilePic, location, date, text, postPics, likeCount, dislikeCount, commentCount);
                postList.add(post);
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

        return postList;
    }


    public static int writePost(Post post) {
        String username = post.getUsername();
        String location = post.getLocation();
        String date = post.getDate();
        String text = post.getText();
        // List<String> postPics = post.getPostPics();
        String likeCount = "0";
        String dislikeCount = "0";
        String commentCount = "0";

        // get rest of data?
        
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        int postId = -1;

        try {
            conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

            String sql = "INSERT INTO posts (username, location, date, text, like_count, dislike_count, comment_count) VALUES (?, ?, ?, ?, ?, ?, ?)";
            pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            pstmt.setString(1, username);
            pstmt.setString(2, location);
            pstmt.setString(3, date);
            pstmt.setString(4, text);
            pstmt.setString(5, likeCount);
            pstmt.setString(6, dislikeCount);
            pstmt.setString(7, commentCount);

            int rowsAffected = pstmt.executeUpdate();

            if (rowsAffected > 0) {
                rs = pstmt.getGeneratedKeys();
                if (rs.next()) {
                    postId = rs.getInt(1);
                }
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

        return postId;
    }
}
