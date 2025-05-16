package com.example.TUsma.controller;

import com.example.TUsma.model.Pembayaran;
import com.example.TUsma.model.Pembayaran.StatusPembayaran;
import com.example.TUsma.model.Siswa;
import com.example.TUsma.repository.PembayaranRepo;

import com.example.TUsma.repository.SiswaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api/spp")
public class PembayaranController {

    @Autowired
    private SiswaRepository siswaRepo;

    @Autowired
    private PembayaranRepo pembayaranRepo;

    private final int NOMINAL_SPP = 170000;

    @PatchMapping("/siswa/{id}/bayar/{bulan}")
    public ResponseEntity<?> bayarSpp(
            @PathVariable Long id,
            @PathVariable String bulan) {

        // 1. Cek siswa
        Optional<Siswa> siswaOpt = siswaRepo.findById(id);
        if (siswaOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Siswa tidak ditemukan");
        }
        Siswa siswa = siswaOpt.get();

        // 2. Cek apakah sudah bayar bulan ini
        int tahun = LocalDate.now().getYear();
        boolean sudahBayar = pembayaranRepo
                .findBySiswaIdAndTahun(id, tahun)
                .stream()
                .anyMatch(p -> p.getBulan().equalsIgnoreCase(bulan));

        if (sudahBayar) {
            return ResponseEntity.badRequest().body("SPP bulan " + bulan + " sudah dibayar");
        }

        // 3. Cek saldo cukup
        if (siswa.getBalance() < NOMINAL_SPP) {
            return ResponseEntity.badRequest().body("Saldo tidak mencukupi");
        }

        // 4. Simpan pembayaran baru
        Pembayaran pembayaran = new Pembayaran();
        pembayaran.setSiswa(siswa);
        pembayaran.setBulan(bulan);
        pembayaran.setTahun(tahun);
        pembayaran.setNominal(NOMINAL_SPP);
        pembayaran.setStatus(StatusPembayaran.LUNAS);
        pembayaran.setTanggalBayar(Date.valueOf(LocalDate.now()));

        pembayaranRepo.save(pembayaran);

        // 5. Update saldo siswa
        siswa.setBalance(siswa.getBalance() - NOMINAL_SPP);
        siswaRepo.save(siswa);

        return ResponseEntity.ok("Pembayaran SPP bulan " + bulan + " berhasil");
    }
}
