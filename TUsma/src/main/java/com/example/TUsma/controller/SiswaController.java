package com.example.TUsma.controller;

import com.example.TUsma.model.Siswa;
import com.example.TUsma.repository.SiswaRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/siswa")
public class SiswaController {
    private final SiswaRepository siswaRepository;
    
    public SiswaController(SiswaRepository siswaRepository){
        this.siswaRepository = siswaRepository;
    }
    
    @GetMapping
    public List<Siswa> getAllSiswa(){
        return siswaRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Siswa> getSiswaById(@PathVariable Long id) {
        Optional<Siswa> siswa = siswaRepository.findById(id);
        if(siswa.isPresent()) {
            return ResponseEntity.ok(siswa.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<Siswa> createSiswa(@RequestBody Siswa siswa){
        Siswa savedSiswa = siswaRepository.save(siswa);
        return ResponseEntity.ok(savedSiswa);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Siswa> updateSiswa(@PathVariable Long id, @RequestBody Siswa siswaDetails) {
        Optional<Siswa> siswaOptional = siswaRepository.findById(id);
        
        if(siswaOptional.isPresent()) {
            Siswa siswa = siswaOptional.get();
            // Update siswa fields here
            // Example: siswa.setNama(siswaDetails.getNama());
            // Add all required field updates
            
            Siswa updatedSiswa = siswaRepository.save(siswa);
            return ResponseEntity.ok(updatedSiswa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSiswa(@PathVariable Long id) {
        Optional<Siswa> siswa = siswaRepository.findById(id);
        
        if(siswa.isPresent()) {
            siswaRepository.delete(siswa.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
