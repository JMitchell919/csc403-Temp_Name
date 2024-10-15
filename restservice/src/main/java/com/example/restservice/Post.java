package com.example.rest_service;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Post {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/lochyl";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "password";

    private int id;
    private String username;
    private String profilePic;
    private String location;
    private String date;
    private String text;
    private List<String> postPics;
    private int likeCount;
    private int dislikeCount;
    private int commentCount;

    public Post (int id, String username, String profilePic, String location, String date, String text, List<String> postPics, int likeCount, int dislikeCount, int commentCount) {
        this.id = id;
        this.username = username;
        this.profilePic = profilePic;
        this.location = location;
        this.date = date;
        this.text = text;
        this.postPics = postPics;
        this.likeCount = likeCount;
        this.dislikeCount = dislikeCount;
        this.commentCount = commentCount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<String> getPostPics() {
        return postPics;
    }

    public void setPostPics(List<String> postPics) {
        this.postPics = postPics;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public int getDislikeCount() {
        return dislikeCount;
    }

    public void setDislikeCount(int dislikeCount) {
        this.dislikeCount = dislikeCount;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    // public Post getPostById(int postId) {
    //     Connection conn = null;
    //     PreparedStatement pstmt = null;
    //     ResultSet rs = null;

    //     Post post = null;

    //     try {
    //         conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

    //         String sql ="SELECT p.*, u.profile_pic " +
    //                     "FROM posts p " +
    //                     "LEFT JOIN users u ON p.username = u.username " +
    //                     "WHERE p.id=?";
    //         pstmt = conn.prepareStatement(sql);
    //         pstmt.setInt(1, postId);
    //         rs = pstmt.executeQuery();

    //         while (rs.next()) {
    //             int id = rs.getInt("id");
    //             String username = rs.getString("username");
    //             String profilePic = rs.getString("profile_pic");
    //             String location = rs.getString("location");
    //             String date = rs.getString("date");
    //             String text = rs.getString("text");
    //             int likeCount = rs.getInt("like_count");
    //             int dislikeCount = rs.getInt("dislike_count");
    //             int commentCount = rs.getInt("comment_count");

    //             String postPicsStr = rs.getString("post_pics");
    //             List<String> postPics = postPicsStr != null ? Arrays.asList(postPicsStr.split(",")) : new ArrayList<>();

    //             post = new Post(id, username, profilePic, location, date, text, postPics, likeCount, dislikeCount, commentCount);
    //         }

    //     } catch (SQLException e) {
    //         e.printStackTrace();
    //     } finally {
    //         try {
    //             if (rs != null) rs.close();
    //             if (pstmt != null) pstmt.close();
    //             if (conn != null) conn.close();
    //         } catch (SQLException e) {
    //             e.printStackTrace();
    //         }
    //     }

    //     return post;
    // }
}
