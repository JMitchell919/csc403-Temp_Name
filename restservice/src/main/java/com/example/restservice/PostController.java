// DEPRECATED

package com.example.rest_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.rest_service.Post;

@RestController
public class PostController {

    // some arbritary dummy data
    private final int id = 123;
    private final String username = "Clab";
    private final String profilePic = "../assets/images/temp_pfp_2.png";
    private final String location = "Ruston, Louisiana";
    private final String date = "Oct 9, 2024";
    private final String text = "First post sent over API!!!";
    private final List<String> postPics = List.of("https://media.discordapp.net/attachments/321294266624245770/1283615834828443801/Screenshot_20240910_212306.png?ex=6707e527&is=670693a7&hm=af413264240bae248aac255a066f87970a93293c1fa94a593bb6eaa50ecf9f21&=&format=webp&quality=lossless&width=425&height=385");
    private final int likeCount = 69;
    private final int dislikeCount = 420;
    private final int commentCount = 1337;


    @GetMapping("/post")
    public Post post(@RequestParam(value = "id", defaultValue = "0") int id) {

        // FOR JESSE
        // Delete dummy data and get post data with id from SQL to assign here

        return new Post(this.id, 
                        this.username, 
                        this.profilePic, 
                        this.location, 
                        this.date, 
                        this.text, 
                        this.postPics, 
                        this.likeCount, 
                        this.dislikeCount, 
                        this.commentCount);
    }
}