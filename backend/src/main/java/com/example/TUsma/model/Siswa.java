package com.example.TUsma.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

/*
 * Model Siswa adalah representasi entitas siswa dalam database.
 * Properti yang dimiliki: id, nama, kelas, nisn, dan balance.
 * Model ini dianotasi dengan @Entity, yang berarti akan direpresentasikan sebagai tabel di database.
 * Relasi OneToMany dengan Pembayaran menunjukkan bahwa satu siswa dapat memiliki banyak riwayat pembayaran.
 */

@Entity
public class Siswa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nama;
    private String kelas;
    private String nisn;
    private int balance;

    // Relasi OneToMany: satu siswa dapat memiliki banyak entri pembayaran
    // (riwayat).
    // mappedBy = "siswa" menunjukkan bahwa relasi ini dikendalikan oleh atribut
    // 'siswa' di kelas Pembayaran.
    // cascade = CascadeType.ALL memastikan semua operasi (persist, remove, dll.)
    // juga dilakukan pada pembayaran terkait.

    @OneToMany(mappedBy = "siswa", cascade = CascadeType.ALL) // artinya ini terhubung ke table siswa jadi siswa ini
                                                              // bisa melakukan 1 ke banyak tempat
    private List<Pembayaran> riwayatPembayaran; // ini adalah generic gunanya untuk melindungi tipe data dari
                                                // typecasting yg sembarangan jadi hanya bisa menggunakan tipe data yg
                                                // ada didalam pembayaran aja

    // Menggunakan generic List<Pembayaran> untuk menyimpan daftar pembayaran milik
    // siswa.
    // Dengan generic, hanya objek bertipe Pembayaran yang dapat dimasukkan ke dalam
    // list ini, mencegah typecasting yang salah.

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getNama() {
        return nama;
    }

    public void setKelas(String kelas) {
        this.kelas = kelas;
    }

    public String getKelas() {
        return kelas;
    }

    public void setNisn(String nisn) {
        this.nisn = nisn;
    }

    public String getNisn() {
        return nisn;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public int getBalance() {
        return balance;
    }

}
