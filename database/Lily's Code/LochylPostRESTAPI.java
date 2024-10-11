package com.lochyl;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lochyl.TextMaker;

@RestController
class LochylPostRESTAPI
{
	@GetMapping("/post")
	public void makePost(@RequestParam(value = "post", defaultValue = "Placehoder Text") String post_meat)
	{
		TextMaker.textGrabber(post_meat);
	}
}