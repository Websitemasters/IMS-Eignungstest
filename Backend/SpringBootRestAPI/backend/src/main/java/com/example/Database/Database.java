package com.example.Database;

import java.sql.*;

public class Database {
    private final DatabaseCon jdbc;

    public Database() throws SQLException, ClassNotFoundException {
        jdbc = DatabaseCon.getInstance();
        jdbc.createConnection();
        jdbc.closeConnection();
    }

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
}
