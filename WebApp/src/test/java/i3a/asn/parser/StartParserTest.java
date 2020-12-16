/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.asn.parser;

import java.util.ArrayList;
import java.util.List;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author 1810g
 */
public class StartParserTest {

	public StartParserTest() {
	}

	/**
	 * Testet einfache Rückgabe
	 */
	@Test
	public void testSimpleReturn() {
		List<String> befehle = new ArrayList();
		befehle.add("return 5");
		StartParser instance = new StartParser();
		String expResult = "5.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet Variablendeklaration
	 */
	@Test
	public void testVariableDeclaration() {
		List<String> befehle = new ArrayList();
		befehle.add("x=5");
		befehle.add("return x");
		StartParser instance = new StartParser();
		String expResult = "5.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet multiple Variablendeklaration
	 */
	@Test
	public void testMultiVariableDeclaration() {
		List<String> befehle = new ArrayList();
		befehle.add("x=2");
		befehle.add("y=5");
		befehle.add("return y");
		StartParser instance = new StartParser();
		String expResult = "5.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet addition
	 */
	@Test
	public void testAddition() {
		List<String> befehle = new ArrayList();
		befehle.add("x=2");
		befehle.add("y=5");
		befehle.add("return x+y");
		StartParser instance = new StartParser();
		String expResult = "7.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet subtraktion
	 */
	@Test
	public void testSubtraction() {
		List<String> befehle = new ArrayList();
		befehle.add("x=2");
		befehle.add("y=5");
		befehle.add("return y-x");
		StartParser instance = new StartParser();
		String expResult = "3.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet multiplikation
	 */
	@Test
	public void testMultiplication() {
		List<String> befehle = new ArrayList();
		befehle.add("x=2");
		befehle.add("y=5");
		befehle.add("return x*y");
		StartParser instance = new StartParser();
		String expResult = "10.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet division
	 */
	@Test
	public void testDivision() {
		List<String> befehle = new ArrayList();
		befehle.add("x=2");
		befehle.add("y=6");
		befehle.add("return y/x");
		StartParser instance = new StartParser();
		String expResult = "3.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet komma division
	 */
	@Test
	public void testDecimalDivision() {
		List<String> befehle = new ArrayList();
		befehle.add("x=2");
		befehle.add("y=5");
		befehle.add("return y/x");
		StartParser instance = new StartParser();
		String expResult = "2.5";
		String result = instance.startParser(befehle);

	}

	/**
	 * Testet division durch 0
	 */
	@Test
	public void testDivisionByZero() {
		List<String> befehle = new ArrayList();
		befehle.add("x=0");
		befehle.add("y=5");
		befehle.add("return y/x");
		StartParser instance = new StartParser();
		String expResult = "0.0";
		String result = instance.startParser(befehle);
		assert (!result.equals(expResult));
	}

	/**
	 * Testet Punkt vor Strich
	 */
	@Test
	public void testCorrectOrderOfOperations() {
		List<String> befehle = new ArrayList();
		befehle.add("x=2");
		befehle.add("y=3");
		befehle.add("return x+4*y");
		StartParser instance = new StartParser();
		String expResult = "14.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet Vergleichsoperatoren
	 */
	@Test
	public void testComparators() {
		List<String> befehle = new ArrayList();
		befehle.add("x=2");
		befehle.add("if(x<10){");
		befehle.add("x=x+1");
		befehle.add("}");
		befehle.add("if(x>0){");
		befehle.add("x=x+1");
		befehle.add("}");
		befehle.add("if(x!=0){");
		befehle.add("x=x+1");
		befehle.add("}");
		befehle.add("if(x==5){");
		befehle.add("x=x+1");
		befehle.add("}");
		befehle.add("return x");
		StartParser instance = new StartParser();
		String expResult = "6.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet korrektes if statement
	 */
	@Test
	public void testCorrectIf() {
		List<String> befehle = new ArrayList();
		befehle.add("x=2");
		befehle.add("if(x<10){");
		befehle.add("x=200");
		befehle.add("}");
		befehle.add("return x");
		StartParser instance = new StartParser();
		String expResult = "200.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet korrekte while schlaufe
	 */
	@Test
	public void testCorrectWhile() {
		List<String> befehle = new ArrayList();
		befehle.add("x=2");
		befehle.add("while(x<10){");
		befehle.add("x=x+1");
		befehle.add("}");
		befehle.add("return x");
		StartParser instance = new StartParser();
		String expResult = "10.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet inkorrektes if statement
	 */
	@Test
	public void testIncorrectIf() {
		List<String> befehle = new ArrayList();
		befehle.add("x=2");
		befehle.add("if(x<10)");
		befehle.add("x=10");
		befehle.add("}");
		befehle.add("return x");
		StartParser instance = new StartParser();
		String expResult = "10.0";
		String result = instance.startParser(befehle);
		assertNotEquals(expResult, result);
	}

	/**
	 * Testet inkorrekte while schlaufe
	 */
	@Test
	public void testIncorrectWhile() {
		List<String> befehle = new ArrayList();
		befehle.add("x=2");
		befehle.add("while(x<10)");
		befehle.add("x=x+1");
		befehle.add("}");
		befehle.add("return x");
		StartParser instance = new StartParser();
		String expResult = "10.0";
		String result = instance.startParser(befehle);
		assertNotEquals(expResult, result);
	}

}
