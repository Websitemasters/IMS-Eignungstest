package i3a.asn.QuestionsAPI;

import i3a.asn.Database.Database;
import i3a.asn.Models.AddUser;
import i3a.asn.Models.Answer;
import i3a.asn.Models.LogEintrag;
import i3a.asn.Models.Question;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

public class Logic {

    private static Logic instance = null;
    private static final String template = "%s?";
    ArrayList<Question> questions = new ArrayList<>();
    private int pageVisited = 0;
    private Database sql;

    private Logic() {
        AtomicLong counter = new AtomicLong();
        questions.add(new Question(counter.incrementAndGet(), "Example Question 1"));
        questions.add(new Question(counter.incrementAndGet(), "Example Question 2"));
        questions.add(new Question(counter.incrementAndGet(), "Example Question 3"));
        questions.add(new Question(counter.incrementAndGet(), "Example Question 4"));
        questions.add(new Question(counter.incrementAndGet(), "Example Question 5"));
        questions.add(new Question(counter.incrementAndGet(), "Example Question 6"));

        //TODO
        try {
            sql = new Database();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static Logic getInstance() {
        if (instance == null) {
            instance = new Logic();
        }
        return instance;
    }

    public ArrayList<Question> getQuestions() {
        return questions;
    }

    public Question getQuestionId(String id){
        int idQue = Integer.parseInt(id);
        for(Question q : questions){
            if(q.getId()==idQue){
                return q;
            }
        }
        return new Question(1,"404 Question not found");
    }

    public String calculateAnswer(Answer answer){
        double sum = 0;
        for (int i = 0; i < answer.getAntwort().length(); i++) {
            double b = Double.parseDouble(String.valueOf(answer.getAntwort().charAt(i)));
            sum += b;
        }
        sum /= questions.size() * 4;
        sum *= 100;
        String ausgabe = Double.toString(sum);
        return ausgabe;
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

    public ArrayList<LogEintrag> orderNew() {
        return sql.actLogNeuste();
    }

    public ArrayList<LogEintrag> orderOld() {
        return sql.actLogAlteste();
    }
}
