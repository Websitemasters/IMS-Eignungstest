/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaparsernolibrary.JavaParserNoLibrary;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author 1810g
 */
public class Starter {

	/**
	 * @param args the command line arguments
	 */
	public static void main(String[] args) {
		Map<String, Double>variablen=new HashMap();
		variablen.put("x", 0.5);
		variablen.put("y", 120.0);
		System.out.println(Parser.eval("x*5+y",variablen));
	}
	
}
