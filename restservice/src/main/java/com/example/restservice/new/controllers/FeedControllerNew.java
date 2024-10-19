// package com.example.rest_service;

// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;
// import org.springframework.http.ResponseEntity;
// import org.springframework.http.MediaType;
// import org.springframework.http.HttpStatus;
// import org.springframework.beans.factory.annotation.Autowired;



// @RestController
// @RequestMapping("/feed")
// public class UploadControllerNew {

//     @Autowired
//     private FeedServiceNew feedService;

//     // Get feed of posts (/index page)
//     @GetMapping("/feed")
//     public List<Post> getFeed(
//         @RequestParam String algorithm, 
//         @RequestParam double userLat, 
//         @RequestParam double userLon) {

//         return feedService.getFeed(algorithm, userLat, userLon);
//     }

// }
