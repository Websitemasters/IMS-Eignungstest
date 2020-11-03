package com.example.QuestionsAPI;

import com.example.Models.AddUser;
import com.example.Models.TestErgebnis;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminController {
    private Logic repo = Logic.getInstance();

    @PostMapping("/sendErgebis")
    @CrossOrigin(origins = "http://localhost:3000")
    public String addTopic(@RequestBody TestErgebnis test){
        return "Ok";
    }
    @GetMapping("/getAmountVisited")
    @CrossOrigin(origins = "http://localhost:3000")
    public int getAmountVisited(){
        return repo.getVisitors();
    }
    
    @GetMapping("/addUser")
    @CrossOrigin(origins = "http://localhost:3000")
    public int getNextUser(){
        return repo.nextUser();
    }
}
