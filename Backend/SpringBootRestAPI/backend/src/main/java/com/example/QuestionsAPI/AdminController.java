package com.example.QuestionsAPI;

import com.example.Models.AddUser;
import com.example.Models.TestErgebnis;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminController {
    private Logic repo = Logic.getInstance();

    @GetMapping("/sendErgebis")
    @CrossOrigin(origins = "http://localhost:3000")
    public String addTopic(@RequestParam(value = "id", defaultValue = "0") int id,@RequestParam(value = "prozent", defaultValue = "1") double prozent){
        if(repo.updateAuswahl(prozent,id)){
            return "Ok";
        }else{
            return "False";
        }
    }

    @GetMapping("/addUser")
    @CrossOrigin(origins = "http://localhost:3000")
    public int getNextUser(){
        return repo.nextUser();
    }
}
