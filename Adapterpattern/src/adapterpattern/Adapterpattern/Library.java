/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package adapterpattern.Adapterpattern;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author 1810g
 */
public class Library {
List<Book>allBooks=new ArrayList();	

public void addBook(Book b){
	allBooks.add(b);
}
public int[] getAllCounts(){
	int[]retArr=new int[allBooks.size()];
	for(int i=0;i<allBooks.size();i++){
		retArr[i]=allBooks.get(i).getPageCount();
	}


	return retArr;
}
}
