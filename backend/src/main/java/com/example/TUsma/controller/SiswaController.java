package com.example.TUsma.controller;

import com.example.TUsma.model.Siswa;
import com.example.TUsma.repository.SiswaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/*
 * Controller untuk entitas Siswa.
 * Berfungsi sebagai penghubung antara model (Siswa), business logic, dan view (frontend).
 * Semua endpoint yang berhubungan dengan data siswa didefinisikan di sini.
 */

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Mengizinkan permintaan CORS dari frontend (Vite) yang berjalan di
                                                // port 5173
@RequestMapping("/api/siswa") // Prefix endpoint API siswa, misalnya: GET /api/siswa
public class SiswaController {

    private final SiswaRepository siswaRepository;

    // Constructor untuk meng-inject dependency repository siswa
    public SiswaController(SiswaRepository siswaRepository) {
        this.siswaRepository = siswaRepository;
    }

    // Endpoint untuk mengambil seluruh data siswa
    @GetMapping
    public List<Siswa> getAllSiswa() {
        return siswaRepository.findAll();
    }

    // Endpoint untuk mengambil data siswa berdasarkan ID
    @GetMapping("/{id}")
    public ResponseEntity<Siswa> getSiswaById(@PathVariable Long id) {
        Optional<Siswa> siswa = siswaRepository.findById(id);
        return siswa.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint untuk menambahkan data siswa baru
    @PostMapping
    public ResponseEntity<Siswa> createSiswa(@RequestBody Siswa siswa) {
        Siswa savedSiswa = siswaRepository.save(siswa);
        return ResponseEntity.ok(savedSiswa);
    }

    // Endpoint untuk memperbarui balance siswa (misalnya pelunasan)
    @PatchMapping("pelunasan/{id}")
    public ResponseEntity<Siswa> pelunasanSiswa(@PathVariable Long id, @RequestBody Siswa siswaDetails) {
        Optional<Siswa> siswaOptional = siswaRepository.findById(id);

        if (siswaOptional.isPresent()) {
            Siswa siswa = siswaOptional.get();
            siswa.setBalance(siswaDetails.getBalance());
            Siswa updatedSiswa = siswaRepository.save(siswa);
            return ResponseEntity.ok(updatedSiswa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint untuk mengedit data siswa (nama, kelas, nisn)
    @PatchMapping("edit/{id}")
    public ResponseEntity<Siswa> editSiswa(@PathVariable Long id, @RequestBody Siswa siswaDetails) {
        Optional<Siswa> siswaOptional = siswaRepository.findById(id);

        if (siswaOptional.isPresent()) {
            Siswa siswa = siswaOptional.get();
            siswa.setNama(siswaDetails.getNama());
            siswa.setKelas(siswaDetails.getKelas());
            siswa.setNisn(siswaDetails.getNisn());
            Siswa updatedSiswa = siswaRepository.save(siswa);
            return ResponseEntity.ok(updatedSiswa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint untuk menghapus data siswa berdasarkan ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSiswa(@PathVariable Long id) {
        Optional<Siswa> siswa = siswaRepository.findById(id);

        if (siswa.isPresent()) {
            siswaRepository.delete(siswa.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
