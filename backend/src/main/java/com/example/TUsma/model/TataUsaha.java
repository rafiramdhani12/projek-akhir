package com.example.TUsma.model;

import jakarta.persistence.*;

@Entity
public class TataUsaha{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;


    public void setId(long id){
        this.id = id;
    }

    public long getId(){
        return id;
    }

    public void setUsername(String username){
        this.username = username; 
    }


    public String getUsername(){
        return username;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getPassword(){
        return password;
    }

}