package i3a.asn.QuestionsAPI;

import i3a.asn.Database.Database;
import i3a.asn.Models.Admin.LogEintrag;
import i3a.asn.Models.Admin.User;
import i3a.asn.Models.Admin.VerlassenPerItem;
import i3a.asn.Models.Items.Answer;
import i3a.asn.Models.Items.Items;
import i3a.asn.Models.Items.Question;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

public class Logic {

    private static Logic instance = null;
    ArrayList<Items> allItems = new ArrayList<Items>();
    private Database sql;

    private Logic() {
        fillItems();
        try {
            sql = new Database();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
    private void fillItems(){
        allItems.add(new Items(1,"Hast du bereits Kenntnisse im Bereich Applikationsentwicklung?","5choice",7,"",0));
        allItems.add(new Items(2,"Mir macht es Freude in Gruppen zu arbeiten","5choice",5,"",0));
        allItems.add(new Items(3,"Ich habe grosses Interesse an Naturwissenschaftlichen Fächern (Geografie, Physik, Biologie, Chemie)","5choice",3,"",0));
        allItems.add(new Items(4,"Mich interessieren wirtschaftliche Themen, wie die aktuelle Lage auf der Welt oder die Wirtschaftliche Infrastruktur der Schweiz","5choice",7,"",0));
        allItems.add(new Items(5,"Ich möchte studieren","1-10",3,"",0));
        allItems.add(new Items(6,"Hast du Interesse an genereller Informatik, wie z.B. Systemtechnik oder Web-Entwicklung?","1-10",8,"",0));
        allItems.add(new Items(7,"Hier siehst du eine Variableneklaration. Versuche den Code so zu ändern, dass 70 ausgegeben wird","code",0,"x=3 \n return x",0));
        allItems.add(new Items(8,"Versuche nun die Summe von x und y auszugeben","code",0,"x=4 \n y=2 \n return 0",0));
        allItems.add(new Items(9,"Hier siehst du ein If-Statement. Basierend darauf, ob der Vergleich in der Klammer stimmt oder nicht, wird der Code innerhalb der {} Klammern ausgeführt oder nicht. Versuche den Vergleich so zu formulieren,dass er wahr ist","code",0,"x=4 \n if(x>100){\n x=50 \n} \n return x",0));
        allItems.add(new Items(10,"Du hast gerade programmiert! Hat er dir Spass gemacht?","1-10",5,"",0));
    }

    public ArrayList<Items> getAllItems() {
        return allItems;
    }

    public static Logic getInstance() {
        if (instance == null) {
            instance = new Logic();
        }
        return instance;
    }


    public void auswertung(){

    }

    public int nextUser(){
        return sql.addVisitor();
    }
    public boolean updateAuswahl(double prozent,Long id){
        return sql.updateAuswahl(prozent,id);
    }
    public boolean logActivity(int id,String url){
        return sql.logActivity(id,url);
    }
    public ArrayList<LogEintrag> actLog() {
        return sql.actLog();
    }
    public int getSeitenAufrufe(){
        return sql.getSeitenAufrufe();
    }
    public int getDurchgefuehrte(){
        return sql.getAnzahlDurchgefuerteTest();
    }
    public ArrayList<User> getTestErg(){
        return sql.getAllTestErgebniss();
    }
    public ArrayList<VerlassenPerItem> getVPI (){
        return sql.getVPI();
    }
}
