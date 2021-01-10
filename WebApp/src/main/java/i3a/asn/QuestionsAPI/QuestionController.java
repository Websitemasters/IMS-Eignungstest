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

	@GetMapping("/api/public/getAllItems")
	public ArrayList<Items> getAllItems() {
		return logic.getAllItems();
	}

	@PostMapping("/api/public/rechneEignung")
	public ArrayList<String> rechneEignung(@RequestBody ArrayList<Items> items, @RequestParam(value = "id", defaultValue = "0") long id) {
		return logic.returnAnswer(items,id);
	}

	@PostMapping("/api/public/useParser")
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

}
