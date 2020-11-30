/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.asn.parser;

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
	 * Test of startParser method, of class StartParser.
	 */
	@Test
	public void testStartParser() {
		System.out.println("startParser");
		String code = "x=5;x=x*3;return x;";
		StartParser instance = new StartParser();
		String expResult = "15";
		String result = instance.startParser(code);
		assertEquals(expResult, result);
		fail("The test case is a prototype.");
	}
	
}
