package i3a.asn.Models.Items;

/**
 * Modeklasse für die Items
 * @author 1810g, Andrei Oleniuc
 */

public class Items {
    private int id;
    private String frage;
    private String kategorie;
    private int gewichtung;
    private String code;
    private int antwort;

    public Items(int id, String frage, String kategorie, int gewichtung, String code, int antwort) {
        this.id = id;
        this.frage = frage;
        this.kategorie = kategorie;
        this.gewichtung = gewichtung;
        this.code = code;
        this.antwort = antwort;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFrage() {
        return frage;
    }

    public void setFrage(String frage) {
        this.frage = frage;
    }

    public String getKategorie() {
        return kategorie;
    }

    public void setKategorie(String kategorie) {
        this.kategorie = kategorie;
    }

    public int getGewichtung() {
        return gewichtung;
    }

    public void setGewichtung(int gewichtung) {
        this.gewichtung = gewichtung;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getAntwort() {
        return antwort;
    }

    public void setAntwort(int antwort) {
        this.antwort = antwort;
    }
}
