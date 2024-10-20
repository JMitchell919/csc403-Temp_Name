package com.example.rest_service;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;



@RestController
public class FeedControllerNew {

    @Autowired
    private FeedServiceNew feedService;

    // Get feed of posts (/index page)
    @RequestMapping("/feed")
    public List<Post> getFeed(
        @RequestParam String algorithm, 
        @RequestParam(required = false) Double userLat, 
        @RequestParam(required = false) Double userLon) {

        return feedService.getFeed(algorithm, userLat, userLon);
    }

}
