/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package calculationformation.CalculationFormation;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author 1810g
 */
public class FormatClass {

	public static String formatString(String s) {
		char[] chars = s.toCharArray();
		List<Character> charList = new ArrayList();
		String retStr = s;

		if (isDone((retStr + ')'))) {
			return (retStr + ')');
		}
		else if (isDone(retStr)) {
			return retStr;
		}
		else {
			//formatting stuff
			//* und / cases
			for (int i = 0; i < chars.length; i++) {
				if (i + 1 < chars.length) {

					if (chars[i + 1] == '*' || chars[i + 1] == '/') {
						charList.add('(');
						charList.add(chars[i]);

					}
					else {
						charList.add(chars[i]);
					}
				}
				else {
//					charList.add(chars[chars.length-2]);
					charList.add(chars[chars.length - 1]);
				}
			}
			retStr = "";
			for (char c : charList) {
				retStr += c;
			}
			while(!isDone(retStr)){
				retStr+=')';
			}
			return formatString(retStr);
		}

	}

	private static boolean isOp(char c) {
		return "+-*/()".indexOf(Character.toLowerCase(c)) < 0;
	}

	private static boolean isDone(String s) {
		char[] charArr = s.toCharArray();
		int amountOfOpen = 0;
		int amountOfClosed = 0;
		int amountOfOps = 0;
		boolean isDone = true;
		for (char c : charArr) {
			if (c == '(') {
				amountOfOpen++;
			}
			else if (c == ')') {
				amountOfClosed++;
			}
			else if (c == '+' || c == '-' || c == '*' || c == '/') {
				amountOfOps++;
			}

		}
		if (amountOfOpen != amountOfClosed) {
			if (amountOfOpen + 1 == amountOfClosed) {
				return false;
			}
			throw new NumberFormatException("Falsche Eingabe");
//			return false;
		}
		else if (amountOfOpen != amountOfOps) {
			isDone = false;
		}
		return isDone;
	}
}
