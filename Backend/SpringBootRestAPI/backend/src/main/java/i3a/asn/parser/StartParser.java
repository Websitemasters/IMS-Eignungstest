/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.asn.parser;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author 1810g
 */
public class StartParser {

	/**
	 * @param args the command line arguments
	 */
	public String startParser(List<String>befehle){
		ArrayList<String> befehle2 = new ArrayList();
		for (int i = 0; i < befehle.size(); i++) {
			if (befehle.get(i).contains("if")||befehle.get(i).contains("while")) {
				String s = befehle.get(i);
				i++;
				while (!befehle.get(i).contains("}")) {
					s = s.concat(befehle.get(i));
					i++;
				}
				if (befehle.get(i).indexOf("}") == 0) {
					s += "}";
					befehle2.add(s);
					s="";
					if(befehle.get(i).length()>1){befehle2.add(befehle.get(i).substring(1, befehle.get(i).length()-1));}


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
		System.out.println("Befehle2 Content: ");
		for (String s : befehle2) {

			System.out.println(s);
		}
		System.out.println("Befehl2 Content done");
		return Double.toString(doParsing(befehle2,new HashMap()));

		
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
