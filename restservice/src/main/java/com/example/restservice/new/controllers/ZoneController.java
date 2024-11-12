package com.example.rest_service;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class ZoneController {

    @Autowired
    private ZoneService zoneService;

    //
    @RequestMapping("/zone")
    public String getZone(
        @RequestParam Double latitude, 
        @RequestParam Double longitude) {

        return zoneService.getZone(latitude, longitude);
    }


    // post to create zone
}
