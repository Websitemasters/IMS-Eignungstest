package i3a.asn.QuestionsAPI;

import i3a.asn.Models.Admin.LogEintrag;
import i3a.asn.Models.Admin.User;
import i3a.asn.Models.Admin.VerlassenPerItem;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class AdminController {
    private Logic logic = Logic.getInstance();

    @GetMapping("/api/addBesucher")
    @CrossOrigin(origins = "http://localhost:3000")
    public int getNextUser(){
        return logic.nextUser();
    }

    @PostMapping("/api/logActivity")
    @CrossOrigin(origins = "http://localhost:3000")
    public String logIt(@RequestParam(value = "id", defaultValue = "0") int id,@RequestParam(value = "url", defaultValue = "1") String url){
         if(logic.logActivity(id,url)){
                return "Ok";
         }else {
             return "False";
         }
    }

    @GetMapping("/api/admin/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public boolean login(@RequestParam(value = "username", defaultValue = "0") String username,@RequestParam(value = "password", defaultValue = "0") String password){
        if(username.equals("admin")&&password.equals("12345")){
            return true;
        }
        return false;
    }
    @GetMapping("/api/admin/actLog")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<LogEintrag> orderNew(){
        return logic.actLog();
    }

    @GetMapping("/api/admin/anzahlBesucher")
    @CrossOrigin(origins = "http://localhost:3000")
    public int getSeitenaufrufe(){
        return logic.getBesucher();
    }

    @GetMapping("/api/admin/getDurchgefuehrte")
    @CrossOrigin(origins = "http://localhost:3000")
    public int getDurchgefuehrte(){
        return logic.getDurchgefuehrte();
    }

    @GetMapping("/api/admin/getTestErg")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<User> getTestErg(){
        return logic.getTestErg();
    }

    @GetMapping("/api/admin/getVPI")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<VerlassenPerItem> getVPI(){
        return logic.getVPI();
    }
    
    @GetMapping("/api/admin/getAVGTesterg")
    @CrossOrigin(origins = "http://localhost:3000")
    public double getAvgTestErg(){
        return logic.getAvgTestErg();
    }

    @GetMapping("/api/admin/getSeitenAufrufe")
    @CrossOrigin(origins = "http://localhost:3000")
    public long getSeitenAufrufe(){
        return logic.getSeitenAufrufe();
    }

}
