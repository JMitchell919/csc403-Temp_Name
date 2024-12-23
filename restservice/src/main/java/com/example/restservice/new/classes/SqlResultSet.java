package com.example.rest_service;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

// This class is used to decouple the returned ResultSet from the ResultSet returned from 
// SqlService.read() so it can be closed while the ResultSet returned from this class can persist.
public class SqlResultSet {
    private ResultSet resultSet;
    private Connection connection;

    public SqlResultSet(ResultSet resultSet, Connection connection) {
        this.resultSet = resultSet;
        this.connection = connection;
    }

    public ResultSet getResultSet() {
        return resultSet;
    }

    public Connection getConnection() {
        return connection;
    }

    public void close() throws SQLException {
        resultSet.close();
        connection.close();
    }

    // Proxies
    public boolean next() throws SQLException {
        return resultSet.next();
    }

    public int getInt(String columnLabel) throws SQLException {
        return resultSet.getInt(columnLabel);
    }

    public Integer getInteger(String columnLabel) throws SQLException {
        int value = resultSet.getInt(columnLabel);
        return resultSet.wasNull() ? null : value;
    }

    public String getString(String columnLabel) throws SQLException {
        return resultSet.getString(columnLabel);
    }

    public Double getDouble(String columnLabel) throws SQLException {
        return resultSet.getDouble(columnLabel);
    }

    public Timestamp getTimestamp(String columnLabel) throws SQLException {
        return resultSet.getTimestamp(columnLabel);
    }

}