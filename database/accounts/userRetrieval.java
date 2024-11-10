// import java.sql.*;
// import java.util.ArrayList;
// import java.util.List;

// public class userRetrieval {

//     private static final String DB_URL = "jdbc:mysql://localhost:3306/users_db";
//     private static final String DB_USERNAME = "root";
//     private static final String DB_PASSWORD = "password";

//     public static void main(String[] args) {
//         List<UserData> users = retrieveUsers();
//         for (UserData user : users) {
//             System.out.println("User ID: " + user.getId());
//             System.out.println("Username: " + user.getUsername());
//             System.out.println("Password (hashed): " + user.getPassword());
//             System.out.println("---------------");
//         }
//     }

//     public static List<UserData> retrieveUsers() {
//         Connection conn = null;
//         PreparedStatement pstmt = null;
//         ResultSet rs = null;
//         List<UserData> userList = new ArrayList<>();

//         try {
//             conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

//             String sql = "SELECT id, username, password FROM users";
//             pstmt = conn.prepareStatement(sql);
//             rs = pstmt.executeQuery();

//             while (rs.next()) {
//                 int id = rs.getInt("id");
//                 String username = rs.getString("username");
//                 String password = rs.getString("password");

//                 UserData user = new UserData(id, username, password);
//                 userList.add(user);
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

//         return userList;
//     }
// }

// class UserData {
//     private int id;
//     private String username;
//     private String password;

//     public UserData(int id, String username, String password) {
//         this.id = id;
//         this.username = username;
//         this.password = password;
//     }

//     public int getId() {
//         return id;
//     }

//     public String getUsername() {
//         return username;
//     }

//     public String getPassword() {
//         return password;
//     }
// }
