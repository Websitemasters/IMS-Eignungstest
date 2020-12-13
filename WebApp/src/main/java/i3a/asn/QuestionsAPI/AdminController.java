package i3a.asn.QuestionsAPI;

import i3a.asn.Models.Admin.LogEintrag;
import i3a.asn.Models.Admin.User;
import i3a.asn.Models.Admin.VerlassenPerItem;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class AdminController {
    private Logic repo = Logic.getInstance();

    @GetMapping("/api/addUser")
    public int getNextUser(){
        return repo.nextUser();
    }

    @PostMapping("/api/logActivity")
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


    @GetMapping("/api/admin/actLog")
    public ArrayList<LogEintrag> orderNew(){
        return repo.actLog();
    }

    @GetMapping("/api/admin/seitenaufrufe")
    public int getSeitenaufrufe(){
        return repo.getSeitenAufrufe();
    }

    @GetMapping("/api/admin/getDurchgefuehrte")
    public int getDurchgefuehrte(){
        return repo.getDurchgefuehrte();
    }

    @GetMapping("/api/admin/getTestErg")
    public ArrayList<User> getTestErg(){
        return repo.getTestErg();
    }

    @GetMapping("/api/admin/getVPI")
    public ArrayList<VerlassenPerItem> getVPI(){
        return repo.getVPI();
    }
}
