package com.example.rest_service;

import java.util.List;
import java.util.ArrayList;
import java.sql.Timestamp;

public class Comment {
    private int id;
    private Integer postId;
    private Integer parentId;
    private String username;
    private String text;
    private Timestamp date;
    private List<Comment> replies;

    public Comment(int id, Integer postId, Integer parentId, String username, String text, Timestamp date) {
        this.id = id;
        this.postId = postId;
        this.parentId = parentId;
        this.username = username;
        this.text = text;
        this.date = date;
        this.replies = new ArrayList<>();
    }

    // getters and setters
    public int getId() {
        return id;
    }

    public Integer getPostId() {
        return postId;
    }

    public Integer getParentId() {
        return parentId;
    }

    public String getUsername() {
        return username;
    }

    public String getText() {
        return text;
    }

    public Timestamp getDate() {
        return date;
    }

    public List<Comment> getReplies() {
        return replies;
    }
}