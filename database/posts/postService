import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class postService {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/lochyl";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "password";

    private int authenticatedUserId = -1;

    // main is set up for testing
    public static void main(String[] args) {
        postService PS = new postService();
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter username:");
        String username = scanner.nextLine();

        System.out.println("Enter password:");
        String password = scanner.nextLine();

        if (!PS.login(username, password)) {
            System.out.println("Authentication failed. Exiting...");
            return;
        }
        System.out.println("Login successful!");

        List<postData> userPosts = PS.getUserPosts();
        if (userPosts != null) {
            System.out.println("Your Posts:");
            for (postData post : userPosts) {
                System.out.println("Post ID: " + post.getId());
                System.out.println("Text: " + post.getText());
                System.out.println("Pictures: " + post.getPostPics());
                System.out.println("Likes: " + post.getLikeCount() + ", Dislikes: " + post.getDislikeCount() + ", Comments: " + post.getCommentCount());
                System.out.println("-----------");
            }
        }

        System.out.println("Enter Post ID to update (or type 'skip' to delete a post):");
        String updatePostIdInput = scanner.nextLine();
        if (!updatePostIdInput.equalsIgnoreCase("skip")) {
            int updatePostId = Integer.parseInt(updatePostIdInput);

            System.out.println("Enter new text for the post");
            String newText = scanner.nextLine();
            if (PS.updatePost(updatePostId, newText)) {
                System.out.println("Post updated successfully!");
            } else {
                System.out.println("Failed to update post. Check post ID or permissions.");
            }
        } else {
            System.out.println("Skipped updating the post.");
        }

        System.out.println("Enter Post ID to delete (or type 'skip' to log out):");
        String deletePostIdInput = scanner.nextLine();
        if (!deletePostIdInput.equalsIgnoreCase("skip")) {
            int deletePostId = Integer.parseInt(deletePostIdInput);

            if (PS.deletePost(deletePostId)) {
                System.out.println("Post deleted successfully!");
            } else {
                System.out.println("Failed to delete post. Check post ID or permissions.");
            }
        } else {
            System.out.println("Skipped deleting the post.");
        }

        PS.logout();
        System.out.println("User logged out.");
    }

    public boolean login(String username, String password) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
    
        try {
            conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
            String sql = "SELECT id, password FROM users WHERE BINARY username = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, username);
            rs = pstmt.executeQuery();
    
            if (rs.next()) {
                String storedPassword = rs.getString("password");
                int userId = rs.getInt("id");
    
                // System.out.println("Stored password: " + storedPassword);
                // System.out.println("Entered password: " + password);


                // hash entered password using PasswordEncryption.hashPassword() when comparing to actual hashed passes
                if (password.equals(storedPassword)) {
                    authenticatedUserId = userId;
                    System.out.println("Login successful for user: " + username);
                    return true;
                } else {
                    System.out.println("Password does not match.");
                }
            } else {
                System.out.println("Username not found.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return false;
    }
    
    // This is pretty much a copy of postRetrieval, but it only pulls the current user's posts
    public List<postData> getUserPosts() {
        if (authenticatedUserId == -1) {
            System.out.println("User not authenticated.");
            return null;
        }

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<postData> userPosts = new ArrayList<>();

        try {
            conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

            String sql = "SELECT p.id, p.username, u.profile_pic, p.location, p.date, p.text, " +
                         "p.like_count, p.dislike_count, p.comment_count, GROUP_CONCAT(pp.pic_url) AS post_pics " +
                         "FROM posts p " +
                         "JOIN users u ON p.username = u.username " +
                         "LEFT JOIN post_pics pp ON p.id = pp.post_id " +
                         "WHERE u.id = ? " +
                         "GROUP BY p.id";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, authenticatedUserId);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String username = rs.getString("username");
                String profilePic = rs.getString("profile_pic");
                String location = rs.getString("location");
                String date = rs.getString("date");
                String text = rs.getString("text");
                int likeCount = rs.getInt("like_count");
                int dislikeCount = rs.getInt("dislike_count");
                int commentCount = rs.getInt("comment_count");

                String postPicsStr = rs.getString("post_pics");
                List<String> postPics = postPicsStr != null ? List.of(postPicsStr.split(",")) : new ArrayList<>();

                postData post = new postData(id, username, profilePic, location, date, text, postPics, likeCount, dislikeCount, commentCount);
                userPosts.add(post);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return userPosts;
    }

    public boolean updatePost(int postId, String newText) {
        if (authenticatedUserId == -1) {
            System.out.println("User not authenticated.");
            return false;
        }

        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

            String sql = "UPDATE posts SET text = ? WHERE id = ? AND username = (SELECT username FROM users WHERE id = ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, newText);
            pstmt.setInt(2, postId);
            pstmt.setInt(3, authenticatedUserId);

            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    public boolean deletePost(int postId) {
        if (authenticatedUserId == -1) {
            System.out.println("User not authenticated.");
            return false;
        }

        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

            String sql = "DELETE FROM posts WHERE id = ? AND username = (SELECT username FROM users WHERE id = ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, postId);
            pstmt.setInt(2, authenticatedUserId);

            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    public void logout() {
        authenticatedUserId = -1;
    }
}
