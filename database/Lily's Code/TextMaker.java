package com.lochyl;

import java.util.Scanner;
import java.io.*;

public class TextMaker
{
	//Program makes a text file and stores it in a text file
	public static void textGrabber(String post_meat)
	{
		//To be replaced by website things
		try
		{
			File text_post = new File("Text Test.txt");
			if(text_post.createNewFile())
			{
				System.out.println("File created.");
			}
			else
			{
				text_post.delete();
			}
		}
		catch(IOException e)
		{
			System.out.println("Error.");
		}

		//Grabbing the text
		try
		{
			/*Scanner text_post_meat = new Scanner(System.in);
			System.out.println("Please enter your text here.\n");

			String post = text_post_meat.nextLine();*/


			//Placing it into a text file (to replace with SQL queries)
			BufferedWriter send_post = new BufferedWriter(new FileWriter("Text Test.txt", true));
			//For some reason, I need this in order to read properly.
			send_post.write("\n");
			send_post.write(post_meat);
			send_post.close();
			System.out.println("Post made!");
		}
		catch(IOException e)
		{
			System.out.println("Error");
		}
	}
}