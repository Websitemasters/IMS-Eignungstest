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
public class NewBook implements Book{
	int pageCount=10;


	public NewBook(int count){
		this.pageCount=count;
	}
	public int getPageCount() {
	return pageCount;
	}
	
}
