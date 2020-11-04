/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.Models;

/**
 *
 * @author Andrei Oleniuc
 */
public class Answer {

    private int id;
    private String percent;

    public Answer(int id, String percent) {
        this.id = id;
        this.percent = percent;
    }

    public int getId() {
        return id;
    }

    public String getPercent() {
        return percent;
    }

}
