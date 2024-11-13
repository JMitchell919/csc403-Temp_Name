import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class PostService {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/lochyl";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "password";

    private int authenticatedUserId = -1;

    /* public static void main(String[] args) {
        PostService postService = new PostService();
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("Enter username:");
            String username = scanner.nextLine();

            System.out.println("Enter password:");
            String password = scanner.nextLine();

            if (!postService.login(username, password)) {
                System.out.println("Authentication failed. Exiting...");
                return;
            }

            List<postData> userPosts = postService.getUserPosts();
            if (userPosts != null) {
                for (postData post : userPosts) {
                    System.out.println("Post ID: " + post.getId());
                    System.out.println("Text: " + post.getText());
                    System.out.println("Pictures: " + post.getPostPics());
                    System.out.println("Likes: " + post.getLikeCount() + ", Dislikes: " + post.getDislikeCount() + ", Comments: " + post.getCommentCount());
                    System.out.println("-----------");
                }
            }

            System.out.println("Enter Post ID to update (or 'skip' to delete a post):");
            String updatePostIdInput = scanner.nextLine();
            if (!updatePostIdInput.equalsIgnoreCase("skip")) {
                int updatePostId = Integer.parseInt(updatePostIdInput);
                System.out.println("Enter new text for the post:");
                String newText = scanner.nextLine();
                if (postService.updatePost(updatePostId, newText)) {
                    System.out.println("Post updated successfully!");
                } else {
                    System.out.println("Failed to update post. Check post ID or permissions.");
                }
            }

            System.out.println("Enter Post ID to delete (or 'skip' to log out):");
            String deletePostIdInput = scanner.nextLine();
            if (!deletePostIdInput.equalsIgnoreCase("skip")) {
                int deletePostId = Integer.parseInt(deletePostIdInput);
                if (postService.deletePost(deletePostId)) {
                    System.out.println("Post deleted successfully!");
                } else {
                    System.out.println("Failed to delete post. Check post ID or permissions.");
                }
            }

            postService.logout();
            System.out.println("User logged out.");
        }
    } */

    public boolean login(String username, String password) {
        String sql = "SELECT id, password FROM users WHERE BINARY username = ?";
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, username);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    String storedPasswordHash = rs.getString("password");
                    int userId = rs.getInt("id");

                    if (PasswordEncryption.verifyPassword(password, storedPasswordHash)) { 
                        authenticatedUserId = userId;
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public List<postData> getUserPosts() {
        if (authenticatedUserId == -1) {
            System.out.println("User not authenticated.");
            return null;
        }

        String sql = "SELECT p.id, p.username, u.profile_pic, p.location, p.date, p.text, " +
                     "p.like_count, p.dislike_count, p.comment_count, GROUP_CONCAT(pp.pic_url) AS post_pics " +
                     "FROM posts p " +
                     "JOIN users u ON p.username = u.username " +
                     "LEFT JOIN post_pics pp ON p.id = pp.post_id " +
                     "WHERE u.id = ? " +
                     "GROUP BY p.id";

        List<postData> userPosts = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, authenticatedUserId);
            try (ResultSet rs = pstmt.executeQuery()) {
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
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userPosts;
    }

    public boolean updatePost(int postId, String newText) {
        if (authenticatedUserId == -1) {
            System.out.println("User not authenticated.");
            return false;
        }

        String sql = "UPDATE posts SET text = ? WHERE id = ? AND username = (SELECT username FROM users WHERE id = ?)";
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, newText);
            pstmt.setInt(2, postId);
            pstmt.setInt(3, authenticatedUserId);

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deletePost(int postId) {
        if (authenticatedUserId == -1) {
            System.out.println("User not authenticated.");
            return false;
        }

        String sql = "DELETE FROM posts WHERE id = ? AND username = (SELECT username FROM users WHERE id = ?)";
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, postId);
            pstmt.setInt(2, authenticatedUserId);

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean addPostPicture(int postId, String picUrl) {
        if (authenticatedUserId == -1) {
            System.out.println("User not authenticated.");
            return false;
        }

        String sql = "INSERT INTO post_pics (post_id, pic_url) VALUES (?, ?)";
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, postId);
            pstmt.setString(2, picUrl);

            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deletePostPicture(int postPicId) {
        if (authenticatedUserId == -1) {
            System.out.println("User not authenticated.");
            return false;
        }

        String sql = "DELETE FROM post_pics WHERE id = ?";
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, postPicId);

            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    
    public boolean userOwnsPost(int postId) {
        String sql = "SELECT COUNT(*) FROM posts WHERE id = ? AND username = (SELECT username FROM users WHERE id = ?)";
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, postId);
            pstmt.setInt(2, authenticatedUserId);

            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1) > 0;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public void logout() {
        authenticatedUserId = -1;
    }
}
