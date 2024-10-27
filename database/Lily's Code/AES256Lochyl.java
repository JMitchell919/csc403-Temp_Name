package com.lochyl;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.io.UnsupportedEncodingException;
import java.sql.*;

public class AES256Lochyl
{
	private static final int key_length = 256;
	private static final int iteration_count = 65535;

	public static void main(String[] args)
	{
		String key = "TestKeyThing";
		String salt = "TestSalt";
		String message = "Hello! My name is Lily and this is an AES256 message.";

		//Encryption test
		String encrypted_message = encrypt(message, key, salt);
		if(encrypted_message != null)
		{
			System.out.println("Encrypted: " + encrypted_message);
		}
		else
		{
			System.err.println("Encryption failed.");
		}

		//Decryption test
		String decrypted_message = decrypt(encrypted_message, key, salt);
		if(decrypted_message != null)
		{
			System.out.println("Decrypted: " + decrypted_message);
		}
		else
		{
			System.err.println("Decryption failed.");
		}
	}

	public static String encrypt(String message, String secret_key, String salt)
	{
		try
		{
			//Generation of the initial IV for AES256 encryption
			SecureRandom num_for_iv_gen = new SecureRandom();
			byte[] iv = new byte[16];
			num_for_iv_gen.nextBytes(iv);
			IvParameterSpec iv_spec = new IvParameterSpec(iv);

			//Generation of the key used for AES256 encryption
			SecretKeyFactory key_factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec key_spec = new PBEKeySpec(secret_key.toCharArray(), salt.getBytes(), iteration_count, key_length);
			SecretKey temp = key_factory.generateSecret(key_spec);
			SecretKeySpec key_complete = new SecretKeySpec(temp.getEncoded(), "AES");

			//The encryption algorithm gets initialized
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, key_complete, iv_spec);

			//The data get's encrypted and is returned
			byte[] encrypted_message = cipher.doFinal(message.getBytes("UTF-8"));
			byte[] encrypted_message_plus_iv = new byte[iv.length + encrypted_message.length];
			System.arraycopy(iv, 0, encrypted_message_plus_iv, 0, iv.length);
			System.arraycopy(encrypted_message, 0, encrypted_message_plus_iv, iv.length, encrypted_message.length);

			return Base64.getEncoder().encodeToString(encrypted_message_plus_iv);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}

	public static String decrypt(String ciphered_message, String secret_key, String salt)
	{
		try
		{
			//Generation of the iv for AES256 decryption
			byte[] encrypted_message = Base64.getDecoder().decode(ciphered_message);
			byte[] iv = new byte[16];
			System.arraycopy(encrypted_message, 0, iv, 0, iv.length);
			IvParameterSpec iv_spec = new IvParameterSpec(iv);

			//Generation of the key for AES256 decryption
			SecretKeyFactory key_factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec key_spec = new PBEKeySpec(secret_key.toCharArray(), salt.getBytes(), iteration_count, key_length);
			SecretKey temp = key_factory.generateSecret(key_spec);
			SecretKeySpec key_complete = new SecretKeySpec(temp.getEncoded(), "AES");

			//Initializing the cipher for decryption
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, key_complete, iv_spec);

			//Decryptiong the message
			byte[] cipher_text = new byte[encrypted_message.length - 16];
			System.arraycopy(encrypted_message, 16, cipher_text, 0, cipher_text.length);

			byte[] unscrambled_message = cipher.doFinal(cipher_text);
			return new String(unscrambled_message, "UTF-8");
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}
}