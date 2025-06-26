package com.example.TUsma.model;

import javax.annotation.processing.Generated;

import jakarta.persistence.*;

@Entity
public class SuperAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String idEmployee;
    private String role;
    private String name;
    private String password;
    private String address;
    private String email;
    private String phoneNumber;

    public SuperAdmin(){
        
    }

    public SuperAdmin(String idEmployee , String name, String email , String password){
        this.idEmployee = idEmployee;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = "superAdmin";
    }

    public void setId(long id){
        this.id = id;
    }

    public void setIdEmployee(String idEmployee){
        this.idEmployee = idEmployee;
    }

    public String getIdEmployee(){
        return idEmployee;
    }

    public void setRole(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }

    public long getId(){
        return id;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getPassword(){
        return password;
    }

    public void setAddress(String address){
        this.address = address;
    }

    public String getAddress(){
        return address;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getEmail(){
        return email;
    }

    public void setPhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber(){
        return phoneNumber;
    }


}
