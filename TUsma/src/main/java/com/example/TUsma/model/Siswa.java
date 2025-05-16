package com.example.TUsma.model;

import java.util.List;
import java.util.Map;

import jakarta.persistence.*;

@Entity
public class Siswa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nama;
    private String kelas;
    private String nisn;
    private int balance;

    @OneToMany(mappedBy = "siswa" , cascade = CascadeType.ALL)
    private List<Pembayaran> riwayatPembayaran;

  
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId(){    
        return id;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getNama(){
        return nama;
    }

    public void setKelas(String kelas) {
        this.kelas = kelas;
    }

    public String getKelas(){
        return  kelas;
    }

    public void setNisn(String nisn) {
        this.nisn = nisn;
    }

    public String getNisn(){
        return  nisn;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public int getBalance(){
        return  balance;
    }

}
