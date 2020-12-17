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

import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Andrei Oleniuc
 */
@RestController
public class QuestionController {

	private Logic logic = Logic.getInstance();
	private StartParser pc;

	@PostMapping("/api/useParser")
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

	@GetMapping("/api/getAllItems")
	@CrossOrigin(origins = "http://localhost:3000")
	public ArrayList<Items> getAllItems() {
		return logic.getAllItems();
	}

	@PostMapping("/api/rechneEignung")
	@CrossOrigin(origins = "http://localhost:3000")
	public String rechneEignung(@RequestBody ArrayList<Items> items, @RequestParam(value = "id", defaultValue = "0") long id) {
		return returnAnswer(items,id);
	}

	private String returnAnswer(ArrayList<Items> itemList,long id) {
		//maximale punktzahn ist 70
		String retStr = "";
		//Iteriert über Items und erstellt bei spezialfällen spezifische nachricht
		if(itemList.get(0).getAntwort()>7) retStr+="Super! Du hast bereits Kentnisse in der Applikationsentwicklung, du wirst sehr warscheinlich Vorteile haben.\n";
		if(itemList.get(2).getAntwort()>7) retStr+="Wenn du ein hohes Interesse an Naturwissenschaftlichen Fächern hast und eventuell sogar planst, ein Studium in dieser Richtigung zu absolvieren, ist die Kantonsschule vielleicht besser geeignet.\n";
		if(itemList.get(3).getAntwort()>7) retStr+="Ein Interesse an wirtschaftlichen Themen ist definitiv eine gute Vorraussetzung! Solltest du jedoch keine Interesse an Informatik haben, ist die Wirtschaftsmittelschule vielleicht eine bessere Option für dich.\n";
		if(itemList.get(4).getAntwort()>7) retStr+="Hast du Interesse an einem Studium in Richtung Informatik, macht die IMS definitiv Sinn. Solltest du jedoch Arzt werden wollen kann es sein, dass du in der Kantonsschule besser aufgehoben bist.\n";
		if(itemList.get(5).getAntwort()>7) retStr+="Grosser Wissensdurst und Interesse für der Materie sind Indikatoren, dass du dich in der IMS am richtigen Platz fühlen wirst.";
		double eignung = 0.0;
		double maxAnswers = 0.0;
		for (Items is : itemList) {
			maxAnswers += (10 * is.getGewichtung());
		}

		for (Items i : itemList) {
			eignung += (i.getGewichtung() * i.getAntwort());
		}
		double percentAnswer = (eignung * 100) / maxAnswers;
		percentAnswer=Math.ceil(percentAnswer);
		logic.auswertung(percentAnswer,id);
		return "Deine Antworten decken sich zu: " + Double.toString(percentAnswer) + "% mit den Antworten von IMS Schülern\n"+retStr;

	}
}
