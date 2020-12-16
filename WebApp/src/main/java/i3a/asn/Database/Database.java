package i3a.asn.Database;

import i3a.asn.Models.Admin.LogEintrag;
import i3a.asn.Models.Admin.User;
import i3a.asn.Models.Admin.VerlassenPerItem;
import i3a.asn.Models.Items.Items;

import java.sql.*;
import java.util.ArrayList;

public class Database {

    private final DatabaseCon jdbc;
    private final Connection conn;

    public Database() throws SQLException, ClassNotFoundException {
        jdbc = DatabaseCon.getInstance();
        conn = jdbc.createConnection();
    }

    //Add new Visitor
    public int addVisitor(){
        try {
            String queryCreateUser = "Insert into user (id, resultat) values (?,?);";
            PreparedStatement ps = conn.prepareStatement(queryCreateUser);

            Statement st = conn.createStatement();
            ResultSet rs = st.executeQuery("Select count(*) from user;");
            int nextId = 0;
            while(rs.next()) {
                nextId = rs.getInt(1);
            }
            ps.setInt(1, nextId+1);
            ps.setDouble(2, 0);
            System.out.println(nextId);
            ps.execute();

            ps.close();
            st.close();
            rs.close();
            ps.close();
            return nextId;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return 0;
        }
    }

    //Log Activity
    public boolean logActivity(int user,String url){
        try {
            String queryCreateUser = "Insert into activity (id, userId,urlPage,activityTime) values (?,?,?,CURRENT_TIMESTAMP);";
            PreparedStatement ps = conn.prepareStatement(queryCreateUser);

            Statement st = conn.createStatement();
            ResultSet rs = st.executeQuery("Select count(*) from activity;");
            int nextId = 0;
            while(rs.next()) {
                nextId = rs.getInt(1);
            }
            ps.setInt(1, nextId+1);
            ps.setInt(2, user);
            ps.setString(3,url);
            ps.execute();

            ps.close();
            st.close();
            rs.close();
            return true;
        } catch (SQLException  throwables) {
            throwables.printStackTrace();
        }
        return false;
    }

    //Get ActLog
    public ArrayList<LogEintrag> actLog() {
        try {
            ArrayList<LogEintrag> act = new ArrayList<>();
            Statement st = conn.createStatement();
            String sql = "select * from activity order by activityTime desc;";
            ResultSet rs = st.executeQuery(sql);
            int nextId = 0;
            while(rs.next()){
                String date = rs.getDate(4).toString();
                String time = rs.getTime(4).toString();
                String datetime = time + ", " +date;
                act.add(new LogEintrag(rs.getInt(1),rs.getInt(2),rs.getString(3),datetime));
            }
            rs.close();
            st.close();
            return act;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }

    //Get Seitenaufrufe
    public int getSeitenAufrufe(){
        try {
            Statement st = conn.createStatement();
            String sql = "select count(*) from user;";
            ResultSet rs = st.executeQuery(sql);
            while(rs.next()){
                return rs.getInt(1);
            }
            rs.close();
            st.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return 0;
    }

    //Get Anzahl durchgeführte Tests
    public int getAnzahlDurchgefuerteTest(){
        try {
            Statement st = conn.createStatement();
            String sql = "select count(*) from user where resultat >0;";
            ResultSet rs = st.executeQuery(sql);
            while(rs.next()){
                return rs.getInt(1);
            }
            rs.close();
            st.close();
        } catch (SQLException  throwables) {
            throwables.printStackTrace();
        }
        return 0;
    }

    //Get Verlassen je nach Item
    public ArrayList<VerlassenPerItem> getVPI(){
        try {
            ArrayList<VerlassenPerItem> data = new ArrayList<>();
            Statement st = conn.createStatement();
            String sql = "SELECT urlPage as Item_Urlpage, count(*) as Anzahl\n" +
                    "FROM activity\n" +
                    "    inner join user\n" +
                    "    on activity.userId = user.id\n" +
                    "WHERE activityTime IN (\n" +
                    "    SELECT MAX(activityTime)\n" +
                    "    FROM activity\n" +
                    "    GROUP BY activity.userId\n" +
                    ")\n" +
                    "    and\n" +
                    "    user.resultat = 0\n" +
                    "group by activity.urlPage;";
            ResultSet rs = st.executeQuery(sql);
            while(rs.next()){
                data.add(new VerlassenPerItem(rs.getString(1),rs.getInt(2)));
            }
            rs.close();
            st.close();
            return data;
        } catch (SQLException  throwables) {
            throwables.printStackTrace();
        }
        return null;
    }

    //Get Items
    public ArrayList<Items> getItems(){
        try{
            ArrayList<Items> items = new ArrayList<>();
            Statement st = conn.createStatement();
            String query = "select * from items;";
            ResultSet rs = st.executeQuery(query);
            while(rs.next()){
                items.add(new Items(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getInt(4),rs.getString(5),rs.getInt(6)));
            }
            rs.close();
            st.close();
            return items;
        }catch (SQLException  throwables) {
            throwables.printStackTrace();
        }
        return null;
    }

    //Get Test Ergbenisse Durchschnitt
    public double getTestErgDurchschnitt(){
        try{
            Statement st = conn.createStatement();
            ResultSet rs = st.executeQuery("select AVG(resultat) from user where resultat>0;");
            double durchschnit = 0;
            while(rs.next()){
                durchschnit= rs.getDouble(1);
            }
            rs.close();
            rs.close();
            return durchschnit;
        }catch (SQLException throwables){
            throwables.printStackTrace();
        }
        return 0;
    }
    //Get Alle Testergebnisse
    public ArrayList<User> getAllTestErgebniss(){
        try {
            ArrayList<User> testErg = new ArrayList<>();
            Statement st = conn.createStatement();
            String sql = "select * from user where resultat > 0;";
            ResultSet rs = st.executeQuery(sql);
            while(rs.next()){
                testErg.add(new User(rs.getInt(1),rs.getDouble(2)));
            }
            rs.close();
            st.close();
            return testErg;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }
}