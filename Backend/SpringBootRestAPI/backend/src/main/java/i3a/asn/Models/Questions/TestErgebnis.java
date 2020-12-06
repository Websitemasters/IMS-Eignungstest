package i3a.asn.Models;

public class TestErgebnis {
    private Long id;
    private double answers;

    public TestErgebnis(Long id, double answers) {
        this.id = id;
        this.answers = answers;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getAnswers() {
        return answers;
    }

    public void setAnswers(double answers) {
        this.answers = answers;
    }
}
