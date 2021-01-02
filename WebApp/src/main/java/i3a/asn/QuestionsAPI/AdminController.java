package i3a.asn.QuestionsAPI;

import i3a.asn.Models.Admin.LogEintrag;
import i3a.asn.Models.Admin.User;
import i3a.asn.Models.Admin.VerlassenPerItem;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class AdminController {
    private Logic logic = Logic.getInstance();

    @GetMapping("/addUser")
    @CrossOrigin(origins = "http://localhost:3000")
    public int getNextUser(){
	    //if no cookie
	    //add a cookie
        return logic.nextUser();
	//else 
	//return 0;
	
    }

    @PostMapping("/logActivity")
    @CrossOrigin(origins = "http://localhost:3000")
    public String logIt(@RequestParam(value = "id", defaultValue = "0") int id,@RequestParam(value = "url", defaultValue = "1") String url){
         if(logic.logActivity(id,url)){
                return "Ok";
         }else {
             return "False";
         }
    }


    @GetMapping("/admin/actLog")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<LogEintrag> orderNew(){
        return logic.actLog();
    }

    @GetMapping("/admin/seitenaufrufe")
    @CrossOrigin(origins = "http://localhost:3000")
    public int getSeitenaufrufe(){
        return logic.getSeitenAufrufe();
    }

    @GetMapping("/admin/getDurchgefuehrte")
    @CrossOrigin(origins = "http://localhost:3000")
    public int getDurchgefuehrte(){
        return logic.getDurchgefuehrte();
    }

    @GetMapping("/admin/getTestErg")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<User> getTestErg(){
        return logic.getTestErg();
    }

    @GetMapping("/admin/getVPI")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<VerlassenPerItem> getVPI(){
        return logic.getVPI();
    }
    
    @GetMapping("/admin/getAVGTesterg")
    @CrossOrigin(origins = "http://localhost:3000")
    public double getAvgTestErg(){
        return logic.getAvgTestErg();
    }
}
