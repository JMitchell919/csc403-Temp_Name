package com.example.rest_service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class User {

    private int id;
    private String username;
    private String password;
    private String profilePic;
    private String email;

    // Constructor
    public User(int id, String username, String password, String profilePic, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.profilePic = profilePic;
        this.email = email;
    }

    // Getter methods
    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public String getEmail() {
        return email;
    }

    // Method to retrieve a user from the database by username
    // public static User getByUsername(String username) {
    //     Connection conn = null;
    //     PreparedStatement pstmt = null;
    //     ResultSet rs = null;
    //     User user = null;

    //     try {
    //         conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

    //         // SQL query to select the user by username
    //         String sql = "SELECT id, username, password, profile_pic FROM users WHERE username = ?";
    //         pstmt = conn.prepareStatement(sql);
    //         pstmt.setString(1, username);  // Use parameterized query to avoid SQL injection
    //         rs = pstmt.executeQuery();

    //         // Process the result set
    //         if (rs.next()) {
    //             int id = rs.getInt("id");
    //             String retrievedUsername = rs.getString("username");
    //             String password = rs.getString("password");
    //             String profilePic = rs.getString("profile_pic");

    //             user = new User(id, retrievedUsername, password, profilePic);
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

    //     return user;
    // }
}
