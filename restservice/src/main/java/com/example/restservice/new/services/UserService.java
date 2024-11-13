package com.example.rest_service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    private SqlService sqlService;

    // Constructor injection
    public UserService(SqlService sqlService) {
        this.sqlService = sqlService.getInstance();
    }

    public void writeUser(String username, String password, String email) throws IOException {
    // Write post to posts table
    int userID = sqlService.write(
        "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
        username,
        password,
        email);
    }


    public User getUser(String username) {
        SqlResultSet rs = null;

        try {
            rs = sqlService.read("SELECT * FROM users WHERE username = ?", username);

            if (rs.next()) {
                return new User(
                    rs.getInt("id"),
                    rs.getString("username"),
                    rs.getString("password"),
                    rs.getString("profile_pic"),
                    rs.getString("email")
                );
            }

            return null;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } 
    }

    public User getUser(int id) {
        SqlResultSet rs = null;

        try {
            rs = sqlService.read("SELECT * FROM users WHERE id = ?", id);

            if (rs.next()) {
                return new User(
                    rs.getInt("id"),
                    rs.getString("username"),
                    rs.getString("password"),
                    rs.getString("profile_pic"),
                    rs.getString("email")
                );
            }

            return null;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } 
    }
}


