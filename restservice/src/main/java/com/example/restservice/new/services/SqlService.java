package com.example.rest_service;

import io.github.cdimascio.dotenv.Dotenv;
import java.sql.*;


import org.springframework.stereotype.Service;

@Service
public class SqlService {

    private static SqlService instance;
    private String dbUrl;
    private String dbUser;
    private String dbPassword;

    // Singleton constructor (prevent multiple points of access)
    private SqlService() {
        Dotenv dotenv = Dotenv.configure().directory("../").load();
        this.dbUrl = dotenv.get("DB_URL");
        this.dbUser = dotenv.get("DB_USERNAME");
        this.dbPassword = dotenv.get("DB_PASSWORD");
    }

    // Get the single SqlService instance
    public static SqlService getInstance() {
        if (instance == null) {
            instance = new SqlService();
        }
        return instance;
    }

    // Helper to establish connection
    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(dbUrl, dbUser, dbPassword);
    }

    // Create (INSERT),             DOES NOT WORK WITH Update (UPDATE), Delete (DELETE)
    public int write(String query, Object... params) {
        try {
            Connection conn = getConnection();
            PreparedStatement pstmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
        
            setParameters(pstmt, params);  // Setting parameters

            int affectedRows = pstmt.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("No rows affected.");
            }

            try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    return generatedKeys.getInt(1);
                } else {
                    throw new SQLException("No ID obtained.");
                }
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }

    // Read (SELECT)
    public SqlResultSet read(String sql, Object... params) {
        try {
            Connection conn = getConnection();
            PreparedStatement pstmt = conn.prepareStatement(sql);
            setParameters(pstmt, params);
            ResultSet rs = pstmt.executeQuery();
            return new SqlResultSet(rs, conn);  // Decoupling
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Helper method to set params for PreparedStatement
    private void setParameters(PreparedStatement pstmt, Object... params) throws SQLException {
        for (int i = 0; i < params.length; i++) {
            pstmt.setObject(i + 1, params[i]);
        }
    }

    // Close ResultSet, PreparedStatement, etc.
    public void close(ResultSet rs) {
        try {
            if (rs != null) rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}