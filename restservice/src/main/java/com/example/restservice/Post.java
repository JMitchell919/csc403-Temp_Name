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

    private void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public void incrementLikeCount() {
        this.likeCount += 1;
    }

    public void decrementLikeCount() {
        this.likeCount -= 1;
    }

    public int getDislikeCount() {
        return dislikeCount;
    }

    private void setDislikeCount(int dislikeCount) {
        this.dislikeCount = dislikeCount;
    }

    public void incrementDisikeCount() {
        this.dislikeCount += 1;
    }

    public void decrementDisikeCount() {
        this.dislikeCount -= 1;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }
}
