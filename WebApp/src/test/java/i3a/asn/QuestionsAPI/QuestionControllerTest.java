/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.asn.QuestionsAPI;

import i3a.asn.Models.Items.Items;
import i3a.asn.Models.Parser.ParseModel;
import java.util.ArrayList;
import static org.junit.Assert.assertEquals;
import org.junit.Test;

/**
 *
 * @author 1810g
 */
public class QuestionControllerTest {
	

	QuestionController qc = new QuestionController();
	public QuestionControllerTest() {
	}

	/**
	 * Test of parseInput method, of class QuestionController.
	 */
	@Test
	public void testParseInput() {
		ParseModel ps = new ParseModel(0,"x=4  \n"
			+ "if(x>0){x=9\n} \nreturn x");
		assertEquals(qc.parseInput(ps),"9.0");	
	}

	/**
	 * Test of rechneEignungTief method, of class QuestionController with lowest options
	 */
	@Test
	public void testRechneEignungTief() {
	ArrayList<Items> testList=new ArrayList();
	int x=0;
	Items testItem = new Items(0,"","",1,"",x);	
	for(int i=0;i<10;i++)testList.add(testItem);	

	String lowestAns="Infolge deiner Antworten, wurde berechnet, dass du in einer anderen Schule oder Lehre warscheinlich besser aufgehoben wärst. Dies heisst jedoch nicht, dass du die Option IMS streichen solltest! Nimm doch an einem Infoabend teil oder vereinbare einen Schnuppertermin bei der IMS um einen genaueren Einblick zu bekommen. ";
	assertEquals(lowestAns,qc.rechneEignung(testList,new Long(0)).get(1));
	}

	/**
	 * Test of recheEignungHoch method, of class QuestionController with highest options, meaning optimal student
	 */
	@Test
	public void testRechneEignungHoch(){
	ArrayList<Items> testList=new ArrayList();
	int x=10;
	Items testItem = new Items(0,"","",1,"",x);	
	for(int i=0;i<10;i++){testItem.setAntwort((i==4||i==2)?0:10);testList.add(testItem);}
	String expectedAnswer="Deine Antworten decken sich zu: 100.0% mit den Antworten von IMS Schülern";
		
	assertEquals(expectedAnswer,qc.rechneEignung(testList,new Long(0)).get(0));
	
	}
	
}
