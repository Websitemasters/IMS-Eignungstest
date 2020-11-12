/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package adapterpattern.Adapterpattern;

/**
 *
 * @author 1810g
 */
public class OldAdapter implements Book{
	private OldBook book;

	public OldAdapter(OldBook book) {
		this.book = book;
	}
	
	public int getPageCount() {
		return book.pages.length;
	}
	

	
}
