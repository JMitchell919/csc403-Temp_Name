package com.example.rest_service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.sql.SQLException;

@Service
public class FeedServiceNew {

    private SqlService sqlService;
    PostServiceNew postService;

    int likeInfluence;
    int commentInfluence;

    public FeedServiceNew(SqlService sqlService, PostServiceNew postService) {
        this.sqlService = sqlService.getInstance();
        this.postService = postService;

        this.likeInfluence = 1000;
        this.commentInfluence = 1000;
    }
    
    public List<Post> getFeed(String algorithm, Double userLat, Double userLon) {
        SqlResultSet rs = null;
        List<Post> postList = new ArrayList<>();

        try {
            switch (algorithm.toLowerCase()) {
                case "popular":
                    rs = sqlService.read(
                        "SELECT posts.id, ((1 + (like_count - dislike_count) * ?) / SQRT(TIMESTAMPDIFF(SECOND, date, NOW()))) AS score " +
                        "FROM posts ORDER BY score DESC", likeInfluence);
                    break;
                case "hot":
                    rs = sqlService.read(
                        "SELECT posts.id, (1 + (comment_count * ?) / SQRT(TIMESTAMPDIFF(SECOND, date, NOW()))) AS score " + 
                        "FROM posts ORDER BY score DESC;", commentInfluence);
                    break;
                case "near":
                    rs = sqlService.read(
                        "SELECT posts.id, 1 / (1 + SQRT(POW(? - latitude, 2) + POW(? - longitude, 2))) AS score " +
                        "FROM posts ORDER BY score DESC", userLat, userLon);
                    break;
                case "recent":
                    rs = sqlService.read(
                        "SELECT posts.id, 1 / SQRT(TIMESTAMPDIFF(SECOND, date, NOW())) AS score " +
                        "FROM posts ORDER BY score DESC");
                    break;
                default:
                    throw new IllegalArgumentException("Invalid algorithm: " + algorithm);
            }

            while (rs.next()) {
                if (rs == null) {
                    return null;
                }
                postList.add(postService.readPost(rs.getInt("id")));

            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } 

        return postList;
    }
}