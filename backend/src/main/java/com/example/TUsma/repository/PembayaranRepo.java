package com.example.TUsma.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.TUsma.model.Pembayaran;

public interface PembayaranRepo extends JpaRepository<Pembayaran, Long> {
    List<Pembayaran> findBySiswaIdAndTahun(Long siswaId , int tahun);
}
