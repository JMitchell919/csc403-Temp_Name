package com.example.rest_service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    private SqlService sqlService;

    // Constructor injection
    public UserService(SqlService sqlService) {
        this.sqlService = sqlService;
    }

//     public void writeUser(String username, String password, String email) throws IOException {
//     // Write post to posts table
//     int userID = sqlService.write(
//         "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
//         username,
//         password,
//         email);

//     }

//     public void readUser(String username) {
//         SqlResultSet rsUser = sqlService.read(
//             //wadd in confirmation number when it is in
//             "SELECT users.id" +
//             "FROM users " +
//             "WHERE username = ?", username);
//         return rsUser.getInt("id");
//     }
    
    public void writeUser(String username, String password, String email) throws SQLException {
        sqlService.write(
            "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
            username,
            password,
            email
        );
    }
    
    // Method to fetch all user information by username
    public Map<String, Object> readUser(String username) {
        try {
            SqlResultSet rsUser = sqlService.read(
                "SELECT * FROM users WHERE username = ?", username
            );

            if (rsUser.next()) {
                Map<String, Object> userData = new HashMap<>();
                userData.put("id", rsUser.getInt("id"));
                userData.put("username", rsUser.getString("username"));
                userData.put("password", rsUser.getString("password"));
                userData.put("email", rsUser.getString("email"));
                userData.put("profilePic", rsUser.getString("profilePic"));
                System.out.println(userData.get("id"));
                return userData;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Method to fetch only username and profilePic by userID
    public Map<String, Object> readUserInfo(int userId) {
        try {
            SqlResultSet rsUser = sqlService.read(
                "SELECT username, profilePic FROM users WHERE id = ?", userId
            );

            if (rsUser.next()) {
                Map<String, Object> userInfo = new HashMap<>();
                userInfo.put("username", rsUser.getString("username"));
                userInfo.put("profilePic", rsUser.getString("profilePic"));
                return userInfo;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}


