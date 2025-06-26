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
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/spp")
public class PembayaranController {

    public static class PembayaranRequest {
        public String bulan;
        public int tahun;
        public int nominal;
    }

    @Autowired
    private SiswaRepository siswaRepo;

    @Autowired
    private PembayaranRepo pembayaranRepo;

    @GetMapping
    public List<Pembayaran> getAllPembayaran() {
        return pembayaranRepo.findAll();
    }

    @GetMapping("/siswa/{id}")
    public List<Pembayaran> getPembayaranBySiswaId(@PathVariable Long id) {
        return pembayaranRepo.findBySiswaId(id);
    }

    @PatchMapping("/siswa/{id}/bayar/{bulan}")
    public ResponseEntity<?> bayarSpp(
            @PathVariable Long id,
            @RequestBody PembayaranRequest request) {

        // 1. Cek siswa
        Optional<Siswa> siswaOpt = siswaRepo.findById(id);
        if (siswaOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Siswa tidak ditemukan");
        }
        Siswa siswa = siswaOpt.get();

        // 2. Cek apakah sudah bayar bulan ini di tahun yang sama
        int tahun = request.tahun > 0 ? request.tahun : LocalDate.now().getYear();
        boolean sudahBayar = pembayaranRepo
                .findBySiswaIdAndTahun(id, tahun)
                .stream()
                .anyMatch(p -> p.getBulan().equalsIgnoreCase(request.bulan));

        if (sudahBayar) {
            return ResponseEntity.badRequest().body("SPP bulan " + request.bulan + " sudah dibayar");
        }

        // 3. Simpan pembayaran baru (TIDAK potong balance!)
        Pembayaran pembayaran = new Pembayaran();
        pembayaran.setSiswa(siswa);
        pembayaran.setBulan(request.bulan);
        pembayaran.setTahun(tahun);
        pembayaran.setNominal(request.nominal); // Nominal dari frontend
        pembayaran.setStatus(StatusPembayaran.LUNAS);
        pembayaran.setTanggalBayar(Date.valueOf(LocalDate.now()));

        pembayaranRepo.save(pembayaran);

        // Catatan: balance tidak digunakan untuk pembayaran bulanan SPP
        return ResponseEntity.ok("Pembayaran SPP bulan " + request.bulan + " berhasil");
    }
}
