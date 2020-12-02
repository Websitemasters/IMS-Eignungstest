/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package asciiconverter.AsciiConverter;

import java.io.UnsupportedEncodingException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author 1810g
 */
public class Starter {

	/**
	 * @param args the command line arguments
	 */
	public static void main(String[] args) {
		String str ="1100001110100001011100010001010111001010100110110101000000000100010110011100011101000000001011101100010101001011010001001110111010010010100010000101111110010001110010100101010001010001101100001111011000100111100001101111000000110011111110011001100000001001";
		byte[]bytes= str.getBytes();
		byte[]array=new bytes[]{1100001110100001011100010001010111001010100110110101000000000100010110011100011101000000001011101100010101001011010001001110111010010010100010000101111110010001110010100101010001010001101100001111011000100111100001101111000000110011111110011001100000001001};
		try {
			String text = new String(bytes, 0, bytes.length, "US-ASCII");
			System.out.println(text);
		}
		catch (UnsupportedEncodingException ex) {
			Logger.getLogger(Starter.class.getName()).log(Level.SEVERE, null, ex);
		}
	}
	
}
