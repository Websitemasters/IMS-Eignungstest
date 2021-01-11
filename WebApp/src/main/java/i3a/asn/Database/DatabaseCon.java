package i3a.asn.Database;

import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Singleton Klasse für die Datenbankverbindung
 * @author 1810g, Andrei Oleniuc
 */

public class DatabaseCon {
    private static DatabaseCon instance = null;
    private final String USERNAME = "root";
    private final String PASSWORD = "";
    private final String DB_CONNECTION_STRING = "jdbc:mysql://localhost/imseignungstest";
    private final String DRIVER = "com.mysql.cj.jdbc.Driver";
    private java.sql.Connection cn = null;

    private DatabaseCon() {

    }

    public static DatabaseCon getInstance() {
        if (instance == null) {
            instance = new DatabaseCon();
        }
        return instance;
    }

    public java.sql.Connection createConnection() throws SQLException, ClassNotFoundException {
        if (cn == null) {
            Class.forName(DRIVER);
            cn =  DriverManager.getConnection(DB_CONNECTION_STRING, USERNAME, PASSWORD);
        }
        return cn;
    }

    public void closeConnection() throws SQLException {
        cn.close();
        cn = null;
    }
}
