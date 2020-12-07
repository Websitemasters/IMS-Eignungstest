package i3a.asn.Database;

import i3a.asn.Models.Admin.LogEintrag;
import i3a.asn.Models.Admin.User;
import i3a.asn.Models.Admin.VerlassenPerItem;

import java.sql.*;
import java.util.ArrayList;

public class Database {

    private final DatabaseCon jdbc;

    public Database() throws SQLException, ClassNotFoundException {
        jdbc = DatabaseCon.getInstance();
    }

    //Add new Visitor
    public int addVisitor(){
        try {
            String queryCreateUser = "Insert into user (id, resultat) values (?,?);";
            Connection conn = jdbc.createConnection();
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

            conn.close();
            st.close();
            rs.close();
            ps.close();
            jdbc.closeConnection();
            return nextId;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return 0;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return 0;
    }

    //Set Testerg for User
    public boolean updateAuswahl(double procent,Long user){
        try {
            Connection conn = jdbc.createConnection();
            Statement st = conn.createStatement();
            st.executeUpdate("update user set resultat =" + procent + " where id = " + user );

            conn.close();
            st.close();
            jdbc.closeConnection();
            return true;
        } catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
        return false;
    }

    //Log Activity
    public boolean logActivity(int user,String url){
        try {
            String queryCreateUser = "Insert into activity (id, userId,urlPage,activityTime) values (?,?,?,CURRENT_TIMESTAMP);";
            Connection conn = jdbc.createConnection();
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
            conn.close();
            jdbc.closeConnection();
            return true;
        } catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
        return false;
    }

    //Get ActLog
    public ArrayList<LogEintrag> actLog() {
        try {
            ArrayList<LogEintrag> act = new ArrayList<>();
            Connection conn = jdbc.createConnection();
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
            conn.close();
            jdbc.closeConnection();
            return act;
        } catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }

    //Get Seitenaufrufe
    public int getSeitenAufrufe(){
        try {
            Connection conn = jdbc.createConnection();
            Statement st = conn.createStatement();
            String sql = "select count(*) from user;";
            ResultSet rs = st.executeQuery(sql);
            while(rs.next()){
                return rs.getInt(1);
            }
            rs.close();
            st.close();
            conn.close();
            jdbc.closeConnection();
        } catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
        return 0;
    }

    //Get Anzahl durchgeführte Tests
    public int getAnzahlDurchgefuerteTest(){
        try {
            Connection conn = jdbc.createConnection();
            Statement st = conn.createStatement();
            String sql = "select count(*) from user where resultat >0;";
            ResultSet rs = st.executeQuery(sql);
            while(rs.next()){
                return rs.getInt(1);
            }
            rs.close();
            st.close();
            conn.close();
            jdbc.closeConnection();
        } catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
        return 0;
    }

    //Get Alle Testergebnisse
    public ArrayList<User> getAllTestErgebniss(){
        try {
            ArrayList<User> testErg = new ArrayList<>();
            Connection conn = jdbc.createConnection();
            Statement st = conn.createStatement();
            String sql = "select * from user where resultat > 0;";
            ResultSet rs = st.executeQuery(sql);
            while(rs.next()){
                testErg.add(new User(rs.getInt(1),rs.getDouble(2)));
            }
            rs.close();
            st.close();
            conn.close();
            jdbc.closeConnection();
            return testErg;
        } catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }

    //Get Verlassen je nach Item
    public ArrayList<VerlassenPerItem> getVPI(){
        try {
            ArrayList<VerlassenPerItem> data = new ArrayList<>();
            Connection conn = jdbc.createConnection();
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
            conn.close();
            jdbc.closeConnection();
            return data;
        } catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }
}