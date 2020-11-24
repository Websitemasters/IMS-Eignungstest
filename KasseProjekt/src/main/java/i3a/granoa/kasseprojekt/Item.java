/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.granoa.kasseprojekt;

/**
 *
 * @author 1810g
 */
public class Item {
	private String name;
	private String preis;

	public Item(String name, String preis) {
		this.name = name;
		this.preis = preis;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPreis() {
		return preis;
	}

	public void setPreis(String preis) {
		this.preis = preis;
	}


	
}
