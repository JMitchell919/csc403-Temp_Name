package com.example.rest_service;

import io.github.cdimascio.dotenv.Dotenv;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.stereotype.Service;

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

    // Create (INSERT), Update (UPDATE), Delete (DELETE)
    public boolean write(String query, Object... params) {
        try {
            Connection conn = getConnection();
            PreparedStatement pstmt = conn.prepareStatement(query);
        
            setParameters(pstmt, params);  // Setting parameters
            return pstmt.executeUpdate() > 0;
            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
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