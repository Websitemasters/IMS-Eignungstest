/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.asn.parser;

import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

/**
 *
 * @author 1810g
 */
public class StartParserTest {
	
	public StartParserTest() {
	}

	/**
	 * Testet ob eine Variable deklariert und zurückgegben werden kann
	 */
	@Test
	public void testReturnVar() {
		List<String> befehle = new ArrayList();
		befehle.add("x=5");
		befehle.add("return x");
		StartParser instance = new StartParser();
		String expResult = "5.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}


	/**
	 * Testet ob Variablenwert verändert werden kann
	 */
	@Test
	public void testChangeVar() {
		List<String> befehle = new ArrayList();
		befehle.add("x=5");
		befehle.add("x=7");
		befehle.add("return x");
		StartParser instance = new StartParser();
		String expResult = "7.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}


	/**
	 * Testet ob Addition funkioniert
	 */
	@Test
	public void testAddVar() {
		List<String> befehle = new ArrayList();
		befehle.add("x=5");
		befehle.add("y=7");
		befehle.add("return x+y");
		StartParser instance = new StartParser();
		String expResult = "12.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}


	/**
	 * Testet ob Subtraktion funkioniert
	 */
	@Test
	public void testSubtractVar() {
		List<String> befehle = new ArrayList();
		befehle.add("x=7");
		befehle.add("y=5");
		befehle.add("return x-y");
		StartParser instance = new StartParser();
		String expResult = "2.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet ob Multiplikation funkioniert
	 */
	@Test
	public void testMultiplyVar() {
		List<String> befehle = new ArrayList();
		befehle.add("x=7");
		befehle.add("y=5");
		befehle.add("return x*y");
		StartParser instance = new StartParser();
		String expResult = "35.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}

	/**
	 * Testet ob Punkt vor Strich funkioniert
	 */
	@Test
	public void testMultiplyBeforeadd() {
		List<String> befehle = new ArrayList();
		befehle.add("x=7");
		befehle.add("y=5");
		befehle.add("return x+y*2");
		StartParser instance = new StartParser();
		String expResult = "17.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}
	
	/**
	 * Testet ob if statement mit korrektem Syntax funktioniert
	 */
	@Test
	public void testTrueIf() {
		List<String> befehle = new ArrayList();
		befehle.add("x=7");
		befehle.add("if(x<10){x=100}");
		befehle.add("return x");
		StartParser instance = new StartParser();
		String expResult = "100.0";
		String result = instance.startParser(befehle);
		assertEquals(expResult, result);
	}



	
}
