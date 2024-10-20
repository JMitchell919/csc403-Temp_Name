// Methods marked for deletion

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
    private Double latitude;
    private Double longitude;
    private Timestamp date;
    private String text;
    private List<String> postPics;
    private int likeCount;
    private int dislikeCount;
    private int commentCount;

    public Post (int id, String username, String profilePic, String location, Double latitude, Double longitude, Timestamp date, String text, List<String> postPics, int likeCount, int dislikeCount, int commentCount) {
        this.id = id;
        this.username = username;
        this.profilePic = profilePic;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
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

    // dont feel like making lat and long getters and setters

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
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

    private void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public void incrementLikeCount() {
        executeUpdate("UPDATE posts SET like_count = like_count + 1 WHERE id = ?", this.id);
    }

    public void decrementLikeCount() {
        executeUpdate("UPDATE posts SET like_count = like_count - 1 WHERE id = ?", this.id);
    }

    public int getDislikeCount() {
        return dislikeCount;
    }

    private void setDislikeCount(int dislikeCount) {
        this.dislikeCount = dislikeCount;
    }

    public void incrementDislikeCount() {
        executeUpdate("UPDATE posts SET dislike_count = dislike_count + 1 WHERE id = ?", this.id);
    }

    public void decrementDislikeCount() {
        executeUpdate("UPDATE posts SET dislike_count = dislike_count - 1 WHERE id = ?", this.id);
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    private void executeUpdate(String sql, int postId) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
            PreparedStatement pstmt = conn.prepareStatement(sql)) {             
            pstmt.setInt(1, postId);
            int affectedRows = pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
