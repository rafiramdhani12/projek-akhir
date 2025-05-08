package com.example.TUsma.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.example.TUsma.model.Admin;
import com.example.TUsma.repository.AdminRepo;

@RestController
@CrossOrigin(origins = "*") // Penting untuk mengizinkan request dari domain yang berbeda
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminRepo adminRepo;
    
    public AdminController(AdminRepo adminRepo) {
        this.adminRepo = adminRepo;
    }
    
    // Endpoint untuk login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin loginRequest) {
        System.out.println("Login request diterima: " + loginRequest.getUsername()); // Log untuk debugging
        
        // Cari admin berdasarkan username
        Optional<Admin> admin = adminRepo.findByUsername(loginRequest.getUsername());
        
        Map<String, Object> response = new HashMap<>();
        
        if (admin.isPresent()) {
            // Verifikasi password
            if (admin.get().getPassword().equals(loginRequest.getPassword())) {
                response.put("status", "success");
                response.put("message", "Login berhasil");
                response.put("admin", admin.get());
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "Password salah");
                return ResponseEntity.ok(response);
            }
        } else {
            response.put("status", "error");
            response.put("message", "Username tidak ditemukan");
            return ResponseEntity.ok(response);
        }
    }
    
    // Endpoint untuk memeriksa apakah API berjalan
    @GetMapping("/test")
    public String test() {
        return "API berjalan dengan baik";
    }
}
