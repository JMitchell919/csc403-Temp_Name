package com.lochyl;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lochyl.TextMaker;
import com.lochyl.AES256Lochyl;
import com.lochyl.PostAdder;

@RestController
class LochylPostRESTAPI
{
	@GetMapping("/post")
	public void makePost(@RequestParam(value = "post", defaultValue = "Placehoder Text") String post_meat)
	{
		String[] post_data = TextMaker.textGrabber(post_meat);
		//Dummy Variables are used as a proof of concept
		String key = "TestKeyThing";
		String salt = "TestSalt";
		int id = 1337;

		//Dummy Variables are used as a proof of concept
		String longitude = AES256Lochyl.encrypt("72.00'36\"S");
		String latitude = AES256Lochyl.encrypt("168.34'40\"E");
		post_data[4] = longitude;
		post_data[5] = latitude;

		PostAdder.addPostToDatabase(id, post_data[0], post_data[1], post_data[2], post_data[3], post_data[4], post_data[5]);
	}
}