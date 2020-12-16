/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.asn.QuestionsAPI;

import java.util.ArrayList;

import i3a.asn.Models.Items.Items;
import i3a.asn.Models.Parser.ParseModel;
import i3a.asn.parser.StartParser;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Andrei Oleniuc
 */
@RestController
public class QuestionController {

	private Logic logic = Logic.getInstance();
	private StartParser pc;

	@PostMapping("/useParser")
	@CrossOrigin(origins = "http://localhost:3000")
	public String parseInput(@RequestBody ParseModel code) {
		pc = new StartParser();
		String lines[] = code.getText().split("\\r?\\n");
		List<String> inputCode = new ArrayList<>();
		for (String s : lines) {
			System.out.println(s);
			inputCode.add(s);
		}

		return pc.startParser(inputCode);
	}

	@GetMapping("/getAllItems")
	@CrossOrigin(origins = "http://localhost:3000")
	public ArrayList<Items> getAllItems() {
		return logic.getAllItems();
	}

	@PostMapping("/rechneEignung")
	@CrossOrigin(origins = "http://localhost:3000")
	public String rechneEignung(@RequestBody ArrayList<Items> items) {
		return returnAnswer(items);
	}

	private String returnAnswer(ArrayList<Items> itemList) {
		//maximale punktzahn ist 70
		String retStr = "";
		//Iteriert über Items und erstellt bei spezialfällen spezifische nachricht
		if(itemList.get(0).getAntwort()>3) retStr+="Super! Du hast bereits Kentnisse in der Applikationsentwicklung, du wirst sehr warscheinlich Vorteile haben.\n";
		double eignung = 0.0;
		double maxAnswers = 0.0;
		for (Items is : itemList) {
			maxAnswers += (10 * is.getGewichtung());
		}

		for (Items i : itemList) {
			eignung += (i.getGewichtung() * i.getAntwort());
		}
		double percentAnswer = (eignung * 100) / maxAnswers;

		return "Deine Antworten decken sich zu: " + Double.toString(percentAnswer) + "% mit den Antworten von IMS Schülern";

	}
}
