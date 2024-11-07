package com.example.rest_service;

import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class InteractionService {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/lochyl";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "password";

    // Check user interaction in the database
    public boolean checkUserInteraction(int userId, int postId, String type) {
        String sql = "SELECT COUNT(*) FROM post_interactions WHERE user_id = ? AND post_id = ? AND interaction_type = ?";
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, userId);
            pstmt.setInt(2, postId);
            pstmt.setString(3, type);
            
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                return rs.getInt(1) > 0; // Returns true if user has already interacted
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Add user interaction in the database
    public void addUserInteraction(int userId, int postId, String type) {
        String updateSql = "UPDATE post_interactions SET interaction_type = ? WHERE user_id = ? AND post_id = ?";
        String insertSql = "INSERT INTO post_interactions (user_id, post_id, interaction_type) VALUES (?, ?, ?)";
        
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
            PreparedStatement updatePstmt = conn.prepareStatement(updateSql);
            PreparedStatement insertPstmt = conn.prepareStatement(insertSql)) {
            
            // Try to update existing interaction
            updatePstmt.setString(1, type);
            updatePstmt.setInt(2, userId);
            updatePstmt.setInt(3, postId);
            
            int updatedRows = updatePstmt.executeUpdate();
            if (updatedRows == 0) {
                // If no rows were updated, insert a new interaction
                insertPstmt.setInt(1, userId);
                insertPstmt.setInt(2, postId);
                insertPstmt.setString(3, type);
                insertPstmt.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Remove user interaction in the database
    public void removeUserInteraction(int userId, int postId) {
        String sql = "DELETE FROM post_interactions WHERE user_id = ? AND post_id = ?";
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, userId);
            pstmt.setInt(2, postId);
            
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}