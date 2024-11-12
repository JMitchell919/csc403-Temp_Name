package com.example.rest_service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.sql.SQLException;

@Service
public class ZoneService {

    private SqlService sqlService;

    public ZoneService(SqlService sqlService) {
        this.sqlService = sqlService.getInstance();
    }
    
    public String getZone(Double latitude, Double longitude) {
        SqlResultSet rs = null;
        String zone = null;

        try {
            rs = sqlService.read(
                "SELECT name " + 
                "FROM zones " +
                "WHERE ( " +
                    "6371000 * " +
                    "2 * " + 
                    "ASIN( " +
                        "SQRT( " +
                            "POWER(SIN((RADIANS(center_latitude) - RADIANS( ? )) / 2), 2) + " +
                            "COS(RADIANS(center_latitude)) * COS(RADIANS( ? )) * " +
                            "POWER(SIN((RADIANS(center_longitude) - RADIANS( ? )) / 2), 2) " +
                        ") " +
                    ") " +
                ") <= radius;", 
                latitude, latitude, longitude
            );

            if (rs.next()) {
                zone = rs.getString("name");
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } 

        return zone;
    }
}