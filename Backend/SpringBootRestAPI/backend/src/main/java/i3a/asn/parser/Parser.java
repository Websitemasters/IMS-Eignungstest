/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.asn.parser;

import java.util.Map;

/**
 *
 * @author 1810g
 */
public class Parser {
	public static Object[] eval(final String str, Map<String,Double> variables) {
    return new Object() {
        int pos = -1, ch;
	int eqCount=0; 

        void nextChar() {
            ch = (++pos < str.length()) ? str.charAt(pos) : -1;
        }

        boolean eat(int charToEat) {
            while (ch == ' ') nextChar();
            if (ch == charToEat) {
                nextChar();
                return true;
            }
            return false;
        }

        Object[] parse() {
            nextChar();
            double x = parseExpression();
            if (pos < str.length()) throw new RuntimeException("Unexpected: " + (char)ch+"at: "+pos);
            return new Object[]{x, variables};
        }

        // Grammar:
        // expression = term | expression `+` term | expression `-` term
        // term = factor | term `*` factor | term `/` factor
        // factor = `+` factor | `-` factor | `(` expression `)`
        //        | number | functionName factor | factor `^` factor

        double parseExpression() {
            double x = parseTerm();
            for (;;) {
                if      (eat('+')) x += parseTerm(); // addition
                else if (eat('-')) x -= parseTerm(); // subtraction
                else return x;
            }
        }

        double parseTerm() {
            double x = parseFactor();
            for (;;) {
                if      (eat('*')) x *= parseFactor(); // multiplication
                else if (eat('/')) x /= parseFactor(); // division
                else return x;
            }
        }

        double parseFactor() {
            if (eat('+')) return parseFactor(); // unary plus
            if (eat('-')) return -parseFactor(); // unary minus

            double x=-1;
            int startPos = this.pos;
            if (eat('(')) { // parentheses
                x = parseExpression();
                eat(')');
            }
	    else if ((ch >= '0' && ch <= '9') || ch == '.') { // numbers
                while ((ch >= '0' && ch <= '9') || ch == '.') nextChar();
                x = Double.parseDouble(str.substring(startPos, this.pos));
            } else if (ch >= 'a' && ch <= 'z') { // functions
                while (ch >= 'a' && ch <= 'z') nextChar();
                String func = str.substring(startPos, this.pos);
		if(func.equals("if")){
		if(!eat('(')) {throw new RuntimeException("Wrong Syntax at: "+ str);}
		else{

			//wenn wahr
			x=parseExpression();
				pos-=3;
				nextChar();
				while((ch>='0'&&ch<='9')||(ch>='a'&&ch<='z')||ch=='('){
					nextChar();	
				}
			String check = Character.toString((char)ch);
			nextChar();
			while(ch=='='){
				check+="=";
				nextChar();
			}
			double p = parseExpression();
			if(!eat(')')) throw new RuntimeException("Wrong Syntax at: "+ str);
			if(condition(x,check,p)){
			if(!eat('{')) throw new RuntimeException("Wrong Syntax at: "+ str);
			x = parseExpression();
			if(!eat('}')) throw new RuntimeException("Wrong Syntax at: "+ str);
			}else{
			while(!eat('}')) nextChar();
			}
		}
		}
		else if(func.equals("while")){
			if(!eat('(')) throw new RuntimeException("Wrong Syntax at: "+str);
			else{
			x=parseExpression();
			pos-=3;
				nextChar();
				while((ch>='0'&&ch<='9')||(ch>='a'&&ch<='z')||ch=='('){
					nextChar();	
				}
			String check = Character.toString((char)ch);
			nextChar();
			while(ch=='='){
				check+="=";
				nextChar();
			}
			double p = parseExpression();

			if(!eat(')')) throw new RuntimeException("Wrong Syntax at: "+ str);
			if(condition(x,check,p)){
			if(!eat('{')) throw new RuntimeException("Wrong Syntax at: "+ str);
			x = parseExpression();
			if(!eat('}')) throw new RuntimeException("Wrong Syntax at: "+ str);
			pos=-1;
			nextChar();
			parseExpression();
			}else{
			while(!eat('}')) nextChar();
			}

			}
		}
//		else if(func.equals("return")) return parseExpression();
		else if(func.equals("return")) throw new RuntimeException(Double.toString(parseExpression()));
		else if(eat('=')){if(!eat('=')){variables.put(func, parseExpression());}else{x=variables.get(func);}}
		else{System.out.println(func);x = variables.get(func);}
            } else if(eat(')')||eat('>')||eat('<')||eat('!')||eat('}')||eat(';'));
	    else {
                throw new RuntimeException("Unexpected: " + str);
            }


            return x;
        }
    }.parse();
}
	private static boolean condition(double c1, String check, double c2){
		switch(check){
			case ">":return (c1>c2);
			case "<":return (c1<c2);
			case "!=":return (c1!=c2);
			case "==":return (c1==c2);
			default: throw new RuntimeException("No condition: "+check);
			
			
		}
	}
}
