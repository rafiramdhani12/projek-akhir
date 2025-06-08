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
    private String name;
    private String address;
    private String country;
    private String city;
    private String password;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountry() {
        return country;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCity() {
        return city;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
