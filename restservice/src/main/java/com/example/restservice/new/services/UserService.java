// package com.example.rest_service;

// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;
// import java.io.IOException;
// import java.util.UUID;
// import java.nio.file.*;
// import java.util.List;
// import java.util.ArrayList;
// import java.sql.SQLException;

// @Service
// public class RegisterService {
    
//     private SqlService sqlService;

//     // Constructor injection
//     public UserService(SqlService sqlService) {
//         this.sqlService = sqlService;
//     }

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


// }