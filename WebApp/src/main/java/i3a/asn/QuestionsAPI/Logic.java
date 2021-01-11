package i3a.asn.QuestionsAPI;

import i3a.asn.Database.Database;
import i3a.asn.Models.Admin.LogEintrag;
import i3a.asn.Models.Admin.User;
import i3a.asn.Models.Admin.VerlassenPerItem;
import i3a.asn.Models.Items.Items;

import java.sql.SQLException;
import java.util.ArrayList;
/**
 * Dient als zwischenstück zwischen der database klasse und dem restlichen code
 * @author 1810g
 */
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

    public void auswertung(double prozent,long id){
        sql.addTestErg(id,prozent);
    }

    public int nextUser(){
        return sql.addVisitor();
    }

    public boolean logActivity(int id,String url){
        return sql.logActivity(id,url);
    }

    public ArrayList<LogEintrag> actLog() {
        return sql.actLog();
    }

    public int getBesucher(){
        return sql.getBesucher();
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
    
    public double getAvgTestErg() {
        return sql.getTestErgDurchschnitt();
    }
    public long getSeitenAufrufe(){
        return sql.anzahlSeitenAufrufe();
    }

    public ArrayList<String> returnAnswer(ArrayList<Items> itemList,long id) {
        //maximale punktzahn ist 70
        ArrayList<String> retList=new ArrayList();

        //Iteriert über Items und erstellt bei spezialfällen spezifische nachricht
        if (itemList.get(0).getAntwort() > 7) {
            retList.add("Du hast bereits Kentnisse in der Applikationsentwicklung, du wirst sehr warscheinlich Vorteile haben.");
        }
        if (itemList.get(2).getAntwort() > 7) {
            retList.add("Wenn du ein hohes Interesse an Naturwissenschaftlichen Fächern hast und eventuell sogar planst, ein Studium in dieser Richtigung zu absolvieren, ist die Kantonsschule vielleicht besser geeignet.");
        }
        if (itemList.get(3).getAntwort() > 7) {
            retList.add("Ein Interesse an wirtschaftlichen Themen ist definitiv eine gute Vorraussetzung! Solltest du jedoch keine Interesse an Informatik haben, ist die Wirtschaftsmittelschule vielleicht eine bessere Option für dich.");
        }
        if (itemList.get(4).getAntwort() > 7) {
            retList.add("Hast du Interesse an einem Studium in Richtung Informatik, macht die IMS definitiv Sinn. Solltest du jedoch Arzt werden wollen kann es sein, dass du in der Kantonsschule besser aufgehoben bist.");
        }
        if (itemList.get(5).getAntwort() > 7) {
            retList.add("Grosser Wissensdurst und Interesse für der Materie sind Indikatoren, dass du dich in der IMS am richtigen Platz fühlen wirst.");
        }
        double eignung = 0.0;
        double maxAnswers = 0.0;
        for (Items is : itemList) {
            maxAnswers += (10 * is.getGewichtung());
        }

        for (Items i : itemList) {
            eignung += (i.getGewichtung() * i.getAntwort());
        }
        double percentAnswer = (eignung * 100) / maxAnswers;
        percentAnswer = Math.ceil(percentAnswer);
        if (percentAnswer < 50 && (itemList.get(2).getAntwort() > 6 || itemList.get(4).getAntwort() > 6)||percentAnswer<20) {
            auswertung(percentAnswer,id);
            retList.add(0,"Infolge deiner Antworten, wurde berechnet, dass du in einer anderen Schule oder Lehre warscheinlich besser aufgehoben wärst. Dies heisst jedoch nicht, dass du die Option IMS streichen solltest! Nimm doch an einem Infoabend teil oder vereinbare einen Schnuppertermin bei der IMS um einen genaueren Einblick zu bekommen. ");
            retList.add(0, "Deine Antworten decken sich zu: " + Double.toString(percentAnswer) + "% mit den Antworten von IMS Schülern");
        }else if(percentAnswer<50){
            auswertung(percentAnswer,id);
            retList.add(0, "Deine Antworten decken sich zu: " + Double.toString(percentAnswer) + "% mit den Antworten von IMS Schülern");
            retList.add("Laut deiner Antworten könntest du für die IMS geeignet sein, jedoch ist dies nicht sicher. Um eine bessere Entscheidung fällen zu können, besuche doch einen Infoanlass oder vereinbare einen Schnuppertermin");
        }
        else if(percentAnswer>80){
            auswertung(percentAnswer,id);
            retList.add(0, "Deine Antworten decken sich zu: " + Double.toString(percentAnswer) + "% mit den Antworten von IMS Schülern");
            retList.add(" Laut unserer Auswertung passt du besonders gut in die IMS! Jedoch wurde dies nur anhand von ein paar wenigen Fragen entschieden. Um sicher zu sein, inwiefern die IMS zu dir passt, macht es Sinn einen Schnuppertermin zu vereinbaren oder an einem Infoabend teilzunehmen");
        }
        else {
            auswertung(percentAnswer, id);
            retList.add(0, "Deine Antworten decken sich zu: " + Double.toString(percentAnswer) + "% mit den Antworten von IMS Schülern");
            retList.add(" Du könntest dich in der IMS zuhause fühlen! Jedoch ist dies keine definitive Antwort. Um einen genaueren Blick in den Alltag eines IMS-Schülers zu bekommen, nimm doch an einem Infoabend teil oder melde dich für einen Schnuppertermin an");
        }
        if(retList.size()<1)retList.add("Ein Fehler trat auf. Bitte fülle den Test nochmal aus");
        return retList;
    }
}
