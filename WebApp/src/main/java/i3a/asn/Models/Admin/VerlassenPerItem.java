package i3a.asn.Models.Admin;

/**
 * Modelklasse um die anzahl verlassenen versuche pro item
 * @author 1810g
 */

public class VerlassenPerItem {
    private String url;
    private int anzahl;

    public VerlassenPerItem(String url, int anzahl) {
        this.url = url;
        this.anzahl = anzahl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getAnzahl() {
        return anzahl;
    }

    public void setAnzahl(int anzahl) {
        this.anzahl = anzahl;
    }
}