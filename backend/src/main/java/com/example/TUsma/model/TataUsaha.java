package com.example.TUsma.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TataUsaha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String idEmployee;
    private String role;
    private String name;
    private String address;
    private String email;
    private String phoneNumber;
    private String password;

    public TataUsaha() {

    }

    public TataUsaha(String idEmployee , String name, String email , String password){
        this.idEmployee = idEmployee;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = "tata-usaha";
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    private void setIdEmployee(String idEmployee) {
        this.idEmployee = idEmployee;
    }

    public String getIdEmployee() {
        return idEmployee;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
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

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }
}
