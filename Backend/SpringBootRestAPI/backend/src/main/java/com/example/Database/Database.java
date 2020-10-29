package com.example.Database;

import java.sql.SQLException;

public class Database {
    private final DatabaseCon jdbc;

    public Database() throws SQLException, ClassNotFoundException {
        jdbc = DatabaseCon.getInstance();
        jdbc.createConnection();
        jdbc.closeConnection();
    }
}
