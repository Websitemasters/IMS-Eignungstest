package i3a.asn.QuestionsAPI;

import i3a.asn.Models.Admin.LogEintrag;
import i3a.asn.Models.Admin.User;
import i3a.asn.Models.Admin.VerlassenPerItem;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class AdminController {
    private Logic logic = Logic.getInstance();

    @GetMapping("/api/public/addBesucher")
    public int getNextUser(){
        return logic.nextUser();
    }

    @PostMapping("/api/public/logActivity")
    public String logIt(@RequestParam(value = "id", defaultValue = "0") int id,@RequestParam(value = "url", defaultValue = "1") String url){
         if(logic.logActivity(id,url)){
                return "Ok";
         }else {
             return "False";
         }
    }

    @GetMapping("/api/public/login")
    public boolean login(@RequestParam(value = "username", defaultValue = "0") String username,@RequestParam(value = "password", defaultValue = "0") String password){
        if(username.equals("admin")&&password.equals("12345")){
            return true;
        }
        return false;
    }
    @GetMapping("/api/public/adminAccess")
    public boolean adminAcess(@RequestParam(value = "code", defaultValue = "0") String code){
        if(code.equals("'98'")) {
            return true;
        }else{
            return false;
        }
    }

    @GetMapping("/api/admin/actLog")
    public ArrayList<LogEintrag> orderNew(){
        return logic.actLog();
    }

    @GetMapping("/api/admin/anzahlBesucher")
    public int getSeitenaufrufe(){
        return logic.getBesucher();
    }

    @GetMapping("/api/admin/getDurchgefuehrte")
    public int getDurchgefuehrte(){
        return logic.getDurchgefuehrte();
    }

    @GetMapping("/api/admin/getTestErg")
    public ArrayList<User> getTestErg(){
        return logic.getTestErg();
    }

    @GetMapping("/api/admin/getVPI")
    public ArrayList<VerlassenPerItem> getVPI(){
        return logic.getVPI();
    }

    @GetMapping("/api/admin/getSeitenAufrufe")
    public long getSeitenAufrufe(){
        return logic.getSeitenAufrufe();
    }

}
