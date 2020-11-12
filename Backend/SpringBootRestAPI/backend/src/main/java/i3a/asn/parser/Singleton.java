/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.asn.parser;

/**
 *
 * @author 1810g
 */
public  class Singleton {
	public static Singleton instance;
	private int x;
	private int lastX=0;
	private boolean valid=false;

	public boolean isValid() {
		return valid;
	}

	public void setValid(boolean valid) {
		this.valid = valid;
	}



	
	public int getX() {
		return x;
	}

	public void setX(int x) {
		lastX=this.x;
		this.x = x;
	}

	public void resetX(){
		System.out.println("Went back");
		x=lastX;
	}

	
	private Singleton() {
	}
	
	public static Singleton getInstance() {
		if (instance == null) {
			instance = new Singleton();
		}
		return instance;
	}




}
