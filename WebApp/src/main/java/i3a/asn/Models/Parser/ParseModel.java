/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.asn.Models.Parser;

import java.util.ArrayList;

/**
 * Modelklasse für den Code der geparst werden soll 
 * @author 1810g, Andrei Oleniuc
 */
public class ParseModel {
	int id;
	String text;
	public ParseModel(int id,String text){
		this.id=id;
		this.text=text;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
