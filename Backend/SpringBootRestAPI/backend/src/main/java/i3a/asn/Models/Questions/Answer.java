/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.asn.Models.Questions;

/**
 *
 * @author Andrei Oleniuc
 */
public class Answer {

    private int id;
    private String antwort;

    public Answer(int id, String antwort) {
        this.id = id;
        this.antwort = antwort;
    }

    public int getId() {
        return id;
    }

    public String getAntwort() {
        return antwort;
    }

}
