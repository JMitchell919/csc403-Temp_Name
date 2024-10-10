import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class addPost {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/posts_db";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "password";

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter username: ");
        String username = scanner.nextLine();

        System.out.println("Enter profile picture URL: ");
        String profilePic = scanner.nextLine();

        System.out.println("Enter location: ");
        String location = scanner.nextLine();

        System.out.println("Enter date (YYYY-MM-DD): ");
        String date = scanner.nextLine();

        System.out.println("Enter post text: ");
        String text = scanner.nextLine();

        System.out.println("Enter number of pictures for the post: ");
        int numPics = Integer.parseInt(scanner.nextLine());

        List<String> postPics = new ArrayList<>();
        for (int i = 0; i < numPics; i++) {
            System.out.println("Enter picture URL " + (i + 1) + ": ");
            postPics.add(scanner.nextLine());
        }

        int postId = insertPostIntoDB(username, profilePic, location, date, text);
        if (postId > 0) {
            insertPostPicsIntoDB(postId, postPics);
            System.out.println("Post added successfully!");
        } else {
            System.out.println("Failed to add the post.");
        }
        // replace above with frontend stuff
    }

    public static int insertPostIntoDB(String username, String profilePic, String location, String date, String text) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        int postId = -1;

        try {
            conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

            String sql = "INSERT INTO posts (username, profile_pic, location, date, text) VALUES (?, ?, ?, ?, ?)";
            pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            pstmt.setString(1, username);
            pstmt.setString(2, profilePic);
            pstmt.setString(3, location);
            pstmt.setString(4, date);
            pstmt.setString(5, text);

            int rowsAffected = pstmt.executeUpdate();

            if (rowsAffected > 0) {
                rs = pstmt.getGeneratedKeys();
                if (rs.next()) {
                    postId = rs.getInt(1);
                }
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

        return postId;
    }

    public static void insertPostPicsIntoDB(int postId, List<String> postPics) {
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

            String sql = "INSERT INTO post_pics (post_id, pic_url) VALUES (?, ?)";
            pstmt = conn.prepareStatement(sql);

            for (String picUrl : postPics) {
                pstmt.setInt(1, postId);
                pstmt.setString(2, picUrl);
                pstmt.executeUpdate();
            }

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
    }
}
