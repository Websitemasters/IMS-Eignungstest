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

    @PostMapping("/api/useParser")
    public String parseInput(@RequestBody ParseModel code){
        pc=new StartParser();
        String lines[] = code.getText().split("\\r?\\n");
        List<String> inputCode = new ArrayList<>();
        for(String s: lines){
            System.out.println(s);
            inputCode.add(s);
        }

	    return pc.startParser(inputCode);
    }

    @GetMapping("/api/getAllItems")
    public ArrayList<Items> getAllItems(){
        return logic.getAllItems();
    }

    @PostMapping("/api/rechneEignung")
    public String rechneEignung(@RequestBody ArrayList<Items> items){
        if(items.size()!=0){
            return "yeah";
        }
        return "nah";
    }
}