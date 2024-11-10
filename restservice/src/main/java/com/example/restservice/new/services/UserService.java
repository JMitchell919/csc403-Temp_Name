package com.example.rest_service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.UUID;
import java.nio.file.*;
import java.util.List;
import java.util.ArrayList;
import java.sql.SQLException;

@Service
public class RegisterService {
    
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
    
    public void registerUser(UserDTO userDTO) {
        // Map UserDTO to User
        User user = new User(0, userDTO.getUsername(), userDTO.getPassword(), null, userDTO.getEmail());

        // Use User fields for database insertion
        sqlService.write(
            "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
            user.getUsername(), user.getPassword(), user.getEmail()
        );
    }
    
    // Method to fetch all user information by username
    public User getUserByUsername(String username) {
        try {
            SqlResultSet resultSet = sqlService.read(
                "SELECT id, username, password, email, profilePic FROM users WHERE username = ?", username
            );
            if (resultSet.next()) {
                return new User(
                    resultSet.getInt("id"),
                    resultSet.getString("username"),
                    resultSet.getString("password"),
                    resultSet.getString("profilePic"),
                    resultSet.getString("email")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Method to fetch only username and profilePic by userID
    public User getUserInfoById(int userID) {
        try {
            SqlResultSet resultSet = sqlService.read(
                "SELECT username, profilePic FROM users WHERE id = ?", userID
            );
            if (resultSet.next()) {
                return new User(
                    userID,
                    resultSet.getString("username"),
                    null,  // password is not retrieved
                    resultSet.getString("profilePic"),
                    null   // email is not retrieved
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}


}
