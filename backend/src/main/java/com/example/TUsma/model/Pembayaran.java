package com.example.TUsma.model;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
public class Pembayaran {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID unik untuk setiap entri pembayaran (auto-increment)

    @ManyToOne // Relasi Many-to-One: banyak entri pembayaran bisa dimiliki oleh satu siswa
    @JoinColumn(name = "siswa_id") // Kolom foreign key yang menghubungkan ke ID siswa di tabel Siswa
    private Siswa siswa; // Objek referensi ke entitas Siswa yang melakukan pembayaran

    private String bulan; // Bulan pembayaran, misalnya "Januari"
    private int tahun; // Tahun pembayaran, misalnya 2025
    private int nominal; // Nominal pembayaran dalam satuan rupiah

    @Enumerated(EnumType.STRING)
    private StatusPembayaran status; // Status pembayaran (LUNAS atau BELUM_LUNAS)

    private Date tanggalBayar; // Tanggal pembayaran dilakukan (format SQL date)

    // Enum adalah tipe data khusus di Java yang memiliki nilai tetap (konstan)
    // Dalam kasus ini, status pembayaran hanya bisa memiliki 2 nilai: LUNAS atau
    // BELUM_LUNAS
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
