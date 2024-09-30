import java.util.Scanner;
import java.io.*;

public class Post_Grabber
{
	/*public static void main(String[] args)
	{
		System.out.println(grabText());
	}*/

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