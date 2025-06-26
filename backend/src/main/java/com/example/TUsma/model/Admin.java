package com.example.TUsma.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // library dari jakarta persistance untuk membuat table di database entity itu mewakilkan tabel di database
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // generate id automatis 
    private Long id;
    private String idEmployee;
    private String role;
    private String name;
    private String address;
    private String email;
    private String phoneNumber;
    private String password;

    public Admin(){
        
    }

    public Admin(String idEmployee , String name, String email , String password){
        this.idEmployee = idEmployee;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = "admin";
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdEmployee() {
        return idEmployee;
    }

    public void setIdEmployee(String idEmployee) {
        this.idEmployee = idEmployee;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

      public void setAddress(String address) { 
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
