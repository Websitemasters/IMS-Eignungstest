/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.granoa.kasseprojekt;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author 1810g Singleton Klasse
 */
public class Bestellung {

	private static Bestellung instance;

	private List<Item>bestellungsListe=new ArrayList();

	public Bestellung() {
	}


	public void addItem(Item i){
		bestellungsListe.add(i);
	}

	public List<Item>getBestellung(){
		return bestellungsListe;
	}

	public double getTotalPreis(){
		double retVal=0.0;
		for(Item t:bestellungsListe){
			retVal+=Double.parseDouble(t.getPreis());
		}
		return retVal;
	}

	public static Bestellung getInstance() {
		if (instance == null) {
			instance = new Bestellung();
		}

		return instance;
	}
}
