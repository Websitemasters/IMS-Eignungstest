package i3a.asn.QuestionsAPI;

import i3a.asn.Models.Admin.LogEintrag;
import i3a.asn.Models.Admin.User;
import i3a.asn.Models.Admin.VerlassenPerItem;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class AdminController {
    private Logic repo = Logic.getInstance();

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


    @GetMapping("/admin/actLog")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<LogEintrag> orderNew(){
        return repo.actLog();
    }

    @GetMapping("/admin/seitenaufrufe")
    @CrossOrigin(origins = "http://localhost:3000")
    public int getSeitenaufrufe(){
        return repo.getSeitenAufrufe();
    }

    @GetMapping("/admin/getDurchgefuehrte")
    @CrossOrigin(origins = "http://localhost:3000")
    public int getDurchgefuehrte(){
        return repo.getDurchgefuehrte();
    }

    @GetMapping("/admin/getTestErg")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<User> getTestErg(){
        return repo.getTestErg();
    }

    @GetMapping("/admin/getVPI")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<VerlassenPerItem> getVPI(){
        return repo.getVPI();
    }
}
