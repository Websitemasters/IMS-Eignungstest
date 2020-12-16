package i3a.asn.QuestionsAPI;

import i3a.asn.Database.Database;
import i3a.asn.Models.Admin.LogEintrag;
import i3a.asn.Models.Admin.User;
import i3a.asn.Models.Admin.VerlassenPerItem;
import i3a.asn.Models.Items.Items;

import java.sql.SQLException;
import java.util.ArrayList;

public class Logic {

    private static Logic instance = null;
    ArrayList<Items> allItems = new ArrayList<Items>();
    private Database sql;

    private Logic() {
        try {
            sql = new Database();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public ArrayList<Items> getAllItems() {
        return sql.getItems();
    }

    public static Logic getInstance() {
        if (instance == null) {
            instance = new Logic();
        }
        return instance;
    }

    //Todo
    public void auswertung(){}

    public int nextUser(){
        return sql.addVisitor();
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
