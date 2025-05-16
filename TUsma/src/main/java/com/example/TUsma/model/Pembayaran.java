package com.example.TUsma.model;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
public class Pembayaran {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "siswa_id")
    private Siswa siswa;

    private String bulan; // Contoh: "Januari"
    private int tahun;
    private int nominal;

    @Enumerated(EnumType.STRING)
    private StatusPembayaran status;

    private Date tanggalBayar;

    public enum StatusPembayaran {
        LUNAS,
        BELUM_LUNAS
    }

  
    // Getter & Setter 


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Siswa getSiswa() {
        return siswa;
    }

    public void setSiswa(Siswa siswa) {
        this.siswa = siswa;
    }

    public String getBulan() {
        return bulan;
    }

    public void setBulan(String bulan) {
        this.bulan = bulan;
    }

    public int getTahun() {
        return tahun;
    }

    public void setTahun(int tahun) {
        this.tahun = tahun;
    }

    public int getNominal() {
        return nominal;
    }

    public void setNominal(int nominal) {
        this.nominal = nominal;
    }

    public StatusPembayaran getStatus() {
        return status;
    }

    public void setStatus(StatusPembayaran status) {
        this.status = status;
    }

    public Date getTanggalBayar() {
        return tanggalBayar;
    }

    public void setTanggalBayar(Date tanggalBayar) {
        this.tanggalBayar = tanggalBayar;
    }
}
