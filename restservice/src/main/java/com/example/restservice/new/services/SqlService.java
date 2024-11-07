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
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet generatedKeys = null;

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
        
            setParameters(pstmt, params);  // Setting parameters

            int affectedRows = pstmt.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("No rows affected.");
            }

            generatedKeys = pstmt.getGeneratedKeys();
            if (generatedKeys.next()) {
                return generatedKeys.getInt(1);
            } else {
                throw new SQLException("No ID obtained.");
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        } finally {
            // Ensuring all resources are closed in the finally block
            close(generatedKeys);
            close(pstmt);
            close(conn);
        }
    }

    // Read (SELECT)
    public SqlResultSet read(String sql, Object... params) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            setParameters(pstmt, params);

            rs = pstmt.executeQuery();
            return new SqlResultSet(rs, conn);  // Decoupling

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } finally {
            // Don't have to close the ResultSet here since it’s handled already handled and for further use
        }
    }

    // Helper method to set params for PreparedStatement
    private void setParameters(PreparedStatement pstmt, Object... params) throws SQLException {
        for (int i = 0; i < params.length; i++) {
            if (params[i] == null) {
                pstmt.setNull(i + 1, java.sql.Types.INTEGER);
            } else {
                pstmt.setObject(i + 1, params[i]);
            }
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

    public void close(Connection conn) {
        try {
            if (conn != null) conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void close(PreparedStatement pstmt) {
        try {
            if (pstmt != null) pstmt.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}