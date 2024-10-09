package com.lochyl;

import java.util.Scanner;
import java.io.*;

public class PostGrabber
{
	public static String grabText()
	{
		try
		{
			BufferedReader display_text = new BufferedReader(new FileReader("Text Test.txt"));
			String line = new String("");
			while(display_text.readLine() != null)
			{
			    line = line + display_text.readLine() + "\n";
			}
			display_text.close();
			return line;
		}
		catch(IOException e)
		{
			return "";
		}
	}
}