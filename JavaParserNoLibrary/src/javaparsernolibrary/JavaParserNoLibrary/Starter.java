/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaparsernolibrary.JavaParserNoLibrary;

import java.util.ArrayList;
import java.util.Arrays;
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
		ArrayList<String> befehle2 = new ArrayList();
		List<String> befehle = new ArrayList();
		befehle.add("x=5");
		befehle.add("if(x<100)");
		befehle.add("{x=5*x");
		befehle.add("}return x");
		int manySkip = 0;
		for (int i = 0; i < befehle.size(); i++) {
			if (befehle.get(i).contains("if")) {
				String s = befehle.get(i);
				i++;
				while (!befehle.get(i).contains("}")) {
					s = s.concat(befehle.get(i));
					i++;
				}
				if (befehle.get(i).indexOf("}") == 0) {
					s += "}";
					befehle2.add(s);
					befehle2.add(befehle.get(i).substring(1, befehle.get(i).length()));
					i++;
				}
				else {
					s += (befehle.get(i).substring(0, befehle.get(i).indexOf("}")));
					befehle2.add(s);
					befehle2.add(befehle.get(i).substring((befehle.get(i).indexOf("}") + 1), befehle.get(i).length() - 1));
				}
			}
			else {
				befehle2.add(befehle.get(i));
			}
		}
		for (String s : befehle2) {
			System.out.println(s);
		}
		System.out.println(doParsing(befehle2, new HashMap()));
	}

	private static double doParsing(List<String> befehle, Map<String, Double> variablen) {
		if (befehle.size() == 1) {
			return (double) (Parser.eval(befehle.get(0), variablen)[0]);
		}
		else {
			Map<String, Double> retMap = (Map<String, Double>) Parser.eval(befehle.get(0), variablen)[1];
			befehle.remove(0);
			return doParsing(befehle, retMap);
		}
	}

}
