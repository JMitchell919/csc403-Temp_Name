package com.example.rest_service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.sql.SQLException;

@Service
public class CommentService {
    private final SqlService sqlService;

    // Constructor injection
    public CommentService(SqlService sqlService) {
        this.sqlService = sqlService.getInstance();
    }

    public List<Comment> getCommentsByPostId(int postId) {
        List<Comment> comments = new ArrayList<>();

        SqlResultSet rs = sqlService.read("SELECT * FROM comments WHERE post_id = ? AND parent_id IS NULL", postId);
         try {
            while (rs.next()) {
                Comment comment = new Comment(
                    rs.getInt("id"),
                    rs.getInt("post_id"),
                    rs.getInteger("parent_id"),
                    rs.getString("username"),
                    rs.getString("text"),
                    rs.getTimestamp("date")
                );

                getNestedReplies(comment);
                comments.add(comment);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }

        return comments;
    }

    private void getNestedReplies(Comment comment) {
        SqlResultSet rs = sqlService.read("SELECT * FROM comments WHERE parent_id = ?", comment.getId());
        try {
            while (rs.next()) {
                Comment reply = new Comment(
                    rs.getInt("id"),
                    rs.getInteger("post_id"),
                    rs.getInteger("parent_id"),
                    rs.getString("username"),
                    rs.getString("text"),
                    rs.getTimestamp("date")
                );
                getNestedReplies(reply);  // Recursive call to load nested replies
                comment.getReplies().add(reply);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void writeComment(int postId, Integer parentId, String username, String text) {
        int commentId = sqlService.write("INSERT INTO comments (post_id, parent_id, username, text) VALUES (?, ?, ?, ?)", postId, parentId, username, text);
        sqlService.update("UPDATE posts SET comment_count = comment_count + 1 WHERE id = ?", postId);
    }
}