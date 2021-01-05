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
	 * 
	 * @param befehle
	 * @return String der Angezeigt werden soll
	 */
	public String startParser(List<String> befehle) {
		ArrayList<String> befehle2 = new ArrayList();
		for (int i = 0; i < befehle.size(); i++) {
			if ((befehle.get(i).contains("if")&&!befehle.get(i).contains("}")) || befehle.get(i).contains("while")) {
				String s = befehle.get(i);
				i++;
				if (!befehle.get(i).contains("}")) {
					int r = i + 1;
					while (!befehle.get(r).contains("}")) {
						if (befehle.get(r).matches("^\\s*$")) {
							r++;
						}
						else {
							return "too many arguments in statement (max. 1)";
						}
					}
				}
				while (!befehle.get(i).contains("}")) {
					s = s.concat(befehle.get(i));
					i++;
				}
				if (befehle.get(i).indexOf("}") == 0) {
					s += "}";
					befehle2.add(s);
					s = "";
					if (befehle.get(i).length() > 1) {
						befehle2.add(befehle.get(i).substring(1, befehle.get(i).length() - 1));
					}

				}
				else if (befehle.get(i).indexOf("}") == (befehle.get(i).length() - 1)) {
					s += befehle.get(i);
					befehle2.add(s);
					s = "";
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
		String retStr = "";
		try {
			retStr = Double.toString(doParsing(befehle2, new HashMap()));
		}
		catch (Exception ex) {
			return ex.getMessage();
		}

		return retStr;

	}

	private static double doParsing(List<String> befehle, Map<String, Double> variablen) {
		if (befehle.size() == 1) {									  	// der letzte Befehl sollte zurückgegeben werden
			return (double) (Parser.eval(befehle.get(0), variablen)[0]);
		}
		else {
			if(befehle.get(0).isEmpty()){befehle.remove(0);}
			Map<String, Double> retMap = (Map<String, Double>) Parser.eval(befehle.get(0), variablen)[1]; 	// der parser wird aufgerufen und die variablen werden aktualisiert
			befehle.remove(0);										
			return doParsing(befehle, retMap);								// rekursives wiederholen
		}
	}

}
