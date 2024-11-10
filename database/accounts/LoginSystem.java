// import java.sql.*;
// import java.util.Scanner;

// public class LoginSystem {

//     private static final String DB_URL = "jdbc:mysql://localhost:3306/users_db";
//     private static final String DB_USERNAME = "root";
//     private static final String DB_PASSWORD = "password";

//     public static void main(String[] args) {
//         Scanner scanner = new Scanner(System.in);

//         System.out.println("Enter username: ");
//         String username = scanner.nextLine();

//         System.out.println("Enter password: ");
//         String password = scanner.nextLine();

//         String hashedPassword = PasswordEncryption.hashPassword(password);

//         if (validateLogin(username, hashedPassword)) {
//             System.out.println("Login successful! Welcome, " + username);
//             // forward them to logged-in state here somehow
//         } else {
//             System.out.println("Login failed. Invalid username or password.");
//         }
//     }

//     public static boolean validateLogin(String username, String hashedPassword) {
//         Connection conn = null;
//         PreparedStatement pstmt = null;
//         ResultSet rs = null;

//         try {
//             conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

//             String sql = "SELECT password FROM users WHERE BINARY username = ?";

//             pstmt = conn.prepareStatement(sql);
//             pstmt.setString(1, username);

//             rs = pstmt.executeQuery();

//             if (rs.next()) {
//                 String storedHashedPassword = rs.getString("password");
//                 return storedHashedPassword.equals(hashedPassword);
//             } else {
//                 return false;
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
//         return false;
//     }
// }
