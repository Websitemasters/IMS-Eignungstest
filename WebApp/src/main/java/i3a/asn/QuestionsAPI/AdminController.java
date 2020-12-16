package i3a.asn.QuestionsAPI;

import i3a.asn.Models.Admin.LogEintrag;
import i3a.asn.Models.Admin.User;
import i3a.asn.Models.Admin.VerlassenPerItem;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class AdminController {
    private Logic logic = Logic.getInstance();

    @GetMapping("/api/addUser")
    public int getNextUser(){
        return logic.nextUser();
    }

    @PostMapping("/api/logActivity")    
    public String logIt(@RequestParam(value = "id", defaultValue = "0") int id,@RequestParam(value = "url", defaultValue = "1") String url){
         if(logic.logActivity(id,url)){
                return "Ok";
         }else {
             return "False";
         }
    }


    @GetMapping("/api/admin/actLog")
    public ArrayList<LogEintrag> orderNew(){
        return logic.actLog();
    }

    @GetMapping("/api/admin/seitenaufrufe")
    public int getSeitenaufrufe(){
        return logic.getSeitenAufrufe();
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
    
    @GetMapping("/api/admin/getAVGTesterg")
    public double getAvgTestErg(){
        return logic.getAvgTestErg();
    }
}
