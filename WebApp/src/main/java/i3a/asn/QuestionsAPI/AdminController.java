package i3a.asn.QuestionsAPI;

import i3a.asn.Models.Admin.LogEintrag;
import i3a.asn.Models.Admin.User;
import i3a.asn.Models.Admin.VerlassenPerItem;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
/**
 * Klasse für:
 * neuen besucher registrieren
 * aktivitäten loggen
 * login prüfen
 *  und getter von logic klasse
 * @author 1810g, Andrei Oleniuc
 */
@RestController
public class AdminController {
    private Logic logic = Logic.getInstance();

    @GetMapping("/api/public/addBesucher")
    @CrossOrigin(origins = "http://localhost:3000")
    public int getNextUser(){
        return logic.nextUser();
    }

    //Loggt aktivität
    @PostMapping("/api/public/logActivity")
    @CrossOrigin(origins = "http://localhost:3000")
    public String logIt(@RequestParam(value = "id", defaultValue = "0") int id,@RequestParam(value = "url", defaultValue = "1") String url){
	    if(!url.startsWith("/")||url.contains("("))return "False";
         if(logic.logActivity(id,url)){
                return "Ok";
         }else {
             return "False";
         }
    }
	
    //prüft ob login erflogreich ist
    @GetMapping("/api/public/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public boolean login(@RequestParam(value = "username", defaultValue = "0") String username,@RequestParam(value = "password", defaultValue = "0") String password){
        if(username.equals("admin")&&password.equals("12345")){
            return true;
        }
        return false;
    }


    //prüft schlüssel auf der normalen seite um auf login seite zu kommen
    @GetMapping("/api/public/adminAccess")
    @CrossOrigin(origins = "http://localhost:3000")
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
