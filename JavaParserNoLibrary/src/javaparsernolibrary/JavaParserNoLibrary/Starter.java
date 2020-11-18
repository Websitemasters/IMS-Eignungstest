/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaparsernolibrary.JavaParserNoLibrary;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
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
		ArrayList<String>befehle=new ArrayList();
		befehle.add("x=5");
		befehle.add("x*5");
		befehle.add("y=15");
		befehle.add("y*2");
		befehle.add("if(x<0){x=1200}");
		befehle.add("x*2");
		befehle.add("return y");
		System.out.println(doParsing(befehle,new HashMap()));

		
	}

	private static double doParsing(List<String>befehle, Map<String, Double>variablen){
		if(befehle.size()==1){
			return (double)(Parser.eval(befehle.get(0),variablen)[0]);
		}else{
			Map<String,Double>retMap=(Map<String, Double>)Parser.eval(befehle.get(0),variablen)[1];
			befehle.remove(0);
		return doParsing(befehle,retMap);	
		}
	}
	
}
