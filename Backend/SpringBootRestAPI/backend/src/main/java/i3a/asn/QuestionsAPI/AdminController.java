package i3a.asn.QuestionsAPI;

import i3a.asn.Models.AddUser;
import i3a.asn.Models.LogEintrag;
import i3a.asn.Models.TestErgebnis;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class AdminController {
    private Logic repo = Logic.getInstance();

    @PostMapping("/sendErgebis")
    @CrossOrigin(origins = "http://localhost:3000")
    public String addTopic(@RequestBody TestErgebnis erg){
        System.out.println(erg.getAnswers());
        if(repo.updateAuswahl(erg.getAnswers(),erg.getId())){
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

    @PostMapping("/logActivity")
    @CrossOrigin(origins = "http://localhost:3000")
    public String logIt(@RequestParam(value = "id", defaultValue = "0") int id,@RequestParam(value = "url", defaultValue = "1") String url){
        if(id==0){
            System.out.println("Its fucked");
        }else{
            if(repo.logActivity(id,url)){
                return "Ok";
            }else{
                return "False";
            }
        }
        return "Fucked";
    }

   @GetMapping("/admin/sortNew")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<LogEintrag> sortNew(){
        return null;
   }
}
