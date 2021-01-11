package i3a.asn.Models.Admin;

/**
 * Benutzer Modelklasse
 * @author 1810g, Andrei Oleniuc
 */

public class User {
    private int id;
    private double testresults;

    public User(int id, double testresults) {
        this.id = id;
        this.testresults = testresults;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getTestresults() {
        return testresults;
    }

    public void setTestresults(double testresults) {
        this.testresults = testresults;
    }
}