package com.example.rest_service;
import java.sql.Connection;
import java.sql.ResultSet;

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
}