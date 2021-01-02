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
		//maximale Punktzahl ist 70
		String retStr = "Vielen Dank für deine Teilnahme \n";
		//Iteriert über Items und erstellt bei spezialfällen spezifische nachricht
		if (itemList.get(0).getAntwort() > 7) {
			retStr += "Du hast bereits Kentnisse in der Applikationsentwicklung, du wirst sehr warscheinlich Vorteile haben.\n";
		}
		if (itemList.get(2).getAntwort() > 7) {
			retStr += "Wenn du ein hohes Interesse an Naturwissenschaftlichen Fächern hast und eventuell sogar planst, ein Studium in dieser Richtigung zu absolvieren, ist die Kantonsschule vielleicht besser geeignet.\n";
		}
		if (itemList.get(3).getAntwort() > 7) {
			retStr += "Ein Interesse an wirtschaftlichen Themen ist definitiv eine gute Vorraussetzung! Solltest du jedoch keine Interesse an Informatik haben, ist die Wirtschaftsmittelschule vielleicht eine bessere Option für dich.\n";
		}
		if (itemList.get(4).getAntwort() > 7) {
			retStr += "Hast du Interesse an einem Studium in Richtung Informatik, macht die IMS definitiv Sinn. Solltest du jedoch Arzt werden wollen kann es sein, dass du in der Kantonsschule besser aufgehoben bist.\n";
		}
		if (itemList.get(5).getAntwort() > 7) {
			retStr += "Grosser Wissensdurst und Interesse für der Materie sind Indikatoren, dass du dich in der IMS am richtigen Platz fühlen wirst.\n";
		}
		double eignung = 0.0;
		double maxAnswers = 0.0;
		for (Items is : itemList) {
			maxAnswers += (10 * is.getGewichtung());
		}

		for (Items i : itemList) {
			eignung += (i.getGewichtung() * i.getAntwort());
		}
		double percentAnswer = (eignung * 100) / maxAnswers;
		percentAnswer = Math.ceil(percentAnswer);
		if (percentAnswer < 50 && (itemList.get(2).getAntwort() > 6 || itemList.get(4).getAntwort() > 6)) {
			retStr += "\nInfolge deiner Antworten, wurde berechnet, dass du in einer anderen Schule oder Lehre warscheinlich besser aufgehoben wärst. Dies heisst jedoch nicht, dass du die Option IMS streichen solltest! Nimm doch an einem Infoabend teil oder vereinbare einen Schnuppertermin bei der IMS um einen genaueren Einblick zu bekommen. ";
			return retStr;
		}else if(percentAnswer<50){
		return retStr+"\n Laut deiner Antworten könntest du für die IMS geeignet sein, jedoch ist dies nicht sicher. Um eine bessere Entscheidung fällen zu können, besuche doch einen Infoanlass oder vereinbare einen Schnuppertermin";}
		else if(percentAnswer>80){
			return retStr+"\n Laut unserer Auswertung passt du besonders gut in die IMS! Jedoch wurde dies nur anhand von ein paar wenigen Fragen entschieden. Um sicher zu sein, inwiefern die IMS zu dir passt, macht es Sinn einen Schnuppertermin zu vereinbaren oder an einem Infoabend teilzunehmen";
			}else{
			return retStr+"\n Du könntest dich in der IMS zuhause fühlen! Jedoch ist dies keine definitive Antwort. Um einen genaueren Blick in den Alltag eines IMS-Schülers zu bekommen, nimm doch an einem Infoabend teil oder melde dich für einen Schnuppertermin an";
		}

	}
}
