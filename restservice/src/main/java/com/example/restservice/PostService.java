package com.example.rest_service;

import org.springframework.stereotype.Service;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class PostService {

    SqlService sqlService = SqlService.getInstance();

    public Post getPostById(int postId) {
        Post post = null;

        if (postId == 0) {
            return post;
        }

        SqlResultSet sqlResultSet = sqlService.read(
            "SELECT posts.*, users.profile_pic, post_pics.pic_url " +
            "FROM posts " +
            "LEFT JOIN users ON posts.username = users.username " +
            "LEFT JOIN post_pics ON posts.id = post_pics.post_id " +
            "WHERE posts.id=?", postId);

        if (sqlResultSet == null || sqlResultSet.getResultSet() == null) {
            return post;
        }

        ResultSet rs = sqlResultSet.getResultSet();
        try {
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
            sqlService.close(rs);
        }
        return post;
    }
}
