package com.lochyl;

import java.sql.*;

public class PostAdder
{
	//These three variables are taken from LoginSystem.java written by Jesse
	private static final String DB_URL = "jdbc:mysql://localhost:3306/post_db";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "password";

    public static void addPostToDatabase(int id, String user, String text, String location, String longitude, String latitude, String date)
	{
		Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try
        {
        	conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
        	String add_item_sql = "INSERT INTO posts ";
        	//The only reason this is here is because otherwise add_item_sql would have run off the side
        	String temp1 = "(id, username, text, location, longitude, latitude, date, like_count, dislike_count, comment_count) ";
        	String temp2 = String.format("VALUES (%d, %s, %s, %s, %s, %s, %s, %d, %d, %d)", id, user, text, location, longitude, latitude, date, 0, 0, 0);
        	add_item_sql = add_item_sql + temp1 + temp2;

        	pstmt = conn.prepareStatement(add_item_sql);
        	rs = pstmt.executeQuery();
        }
        catch(SQLException e)
        {
        	e.printStackTrace();
        }
        finally
        {
        	try 
        	{
                if (rs != null)
                { 
                	rs.close();
                }
                if (pstmt != null) 
                {
                	pstmt.close();
                }
                if (conn != null) 
				{
                	conn.close();
				}
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
	}
}