// // Methods marked for deletion

// package com.example.rest_service;

// import java.sql.*;
// import java.util.ArrayList;
// import java.util.Arrays;
// import java.util.List;

// public class Posts {

//     private static final String DB_URL = "jdbc:mysql://localhost:3306/lochyl";
//     private static final String DB_USERNAME = "root";
//     private static final String DB_PASSWORD = "password";

//     private List<Post> posts;

//     public Posts(List<Post> posts) {
//         this.posts = posts;
//     }

//     public static List<Post> readPosts() {
//         List<Post> postList = new ArrayList<>();

//         String sqlPost = "SELECT posts.*, users.profile_pic " +
//                          "FROM posts " +
//                          "LEFT JOIN users ON posts.username = users.username";

//         try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
//              PreparedStatement pstmt = conn.prepareStatement(sqlPost);
//              ResultSet rsPosts = pstmt.executeQuery()) {

//             while (rsPosts.next()) {
//                 int id = rsPosts.getInt("id");
//                 String username = rsPosts.getString("username");
//                 String profilePic = rsPosts.getString("profile_pic");
//                 String location = rsPosts.getString("location");
//                 String date = rsPosts.getString("date");
//                 String text = rsPosts.getString("text");
//                 int likeCount = rsPosts.getInt("like_count");
//                 int dislikeCount = rsPosts.getInt("dislike_count");
//                 int commentCount = rsPosts.getInt("comment_count");

//                 // Retrieve pic_urls for the current post
//                 List<String> postPics = new ArrayList<>();
//                 String sqlPics = "SELECT pic_url FROM post_pics WHERE post_id=?";
                
//                 try (PreparedStatement pstmtPics = conn.prepareStatement(sqlPics)) {
//                     pstmtPics.setInt(1, id); // Set post_id for the specific post
//                     try (ResultSet rsPics = pstmtPics.executeQuery()) {
//                         while (rsPics.next()) {
//                             postPics.add(rsPics.getString("pic_url"));
//                         }
//                     }
//                 }

//                 // Create the Post object
//                 Post post = new Post(id, username, profilePic, location, date, text, postPics, likeCount, dislikeCount, commentCount);
//                 postList.add(post);
//             }
//         } catch (SQLException e) {
//             e.printStackTrace();
//         }

//         return postList;
//     }


//     public static int writePost(Post post) {
//         String username = post.getUsername();
//         String location = post.getLocation();
//         String date = post.getDate();
//         String text = post.getText();
//         // List<String> postPics = post.getPostPics();
//         String likeCount = "0";
//         String dislikeCount = "0";
//         String commentCount = "0";

//         // get rest of data?
        
//         Connection conn = null;
//         PreparedStatement pstmt = null;
//         ResultSet rs = null;
//         int postId = -1;

//         try {
//             conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

//             String sql = "INSERT INTO posts (username, location, date, text, like_count, dislike_count, comment_count) VALUES (?, ?, ?, ?, ?, ?, ?)";
//             pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

//             pstmt.setString(1, username);
//             pstmt.setString(2, location);
//             pstmt.setString(3, date);
//             pstmt.setString(4, text);
//             pstmt.setString(5, likeCount);
//             pstmt.setString(6, dislikeCount);
//             pstmt.setString(7, commentCount);

//             int rowsAffected = pstmt.executeUpdate();

//             if (rowsAffected > 0) {
//                 rs = pstmt.getGeneratedKeys();
//                 if (rs.next()) {
//                     postId = rs.getInt(1);
//                 }
//             }

//         } catch (SQLException e) {
//             e.printStackTrace();
//         } finally {
//             try {
//                 if (rs != null) rs.close();
//                 if (pstmt != null) pstmt.close();
//                 if (conn != null) conn.close();
//             } catch (SQLException e) {
//                 e.printStackTrace();
//             }
//         }

//         return postId;
//     }
// }
