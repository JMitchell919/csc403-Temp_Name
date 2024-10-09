package com.lochyl;

import java.net.URI; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController; 
import org.springframework.web.servlet.support.ServletUriComponentsBuilder; 

import com.lochyl.TextMaker;

@RestController
@RequestMapping(path = "/post")
class LochylPostRESTAPI
{
	@GetMapping(path = "/", produces = "applications/json")
	public static void makePost(@RequestBody String post_meat)
	{
		TextMaker.textGrabber(post_meat);
	}
}