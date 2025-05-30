package com.example.TUsma.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.example.TUsma.model.Admin;
import com.example.TUsma.repository.AdminRepo;
import com.example.TUsma.utils.JwtUtil;

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
  public ResponseEntity<?> login(@RequestBody Admin loginRequest){
    Optional<Admin> admin = adminRepo.findByName(loginRequest.getName());
    Map<String, Object> response = new HashMap<>();

    if(admin.isPresent() && admin.get().getPassword().equals(loginRequest.getPassword())){
        String token = JwtUtil.generateToken(admin.get().getName());

        response.put("status", "success");
        response.put("token", token);
        response.put("admin" , admin.get());
        return ResponseEntity.ok(response);
    } else {
        response.put("status", "error");
        response.put("message", "Invalid username or password");
        return ResponseEntity.status(401).body(response);
    }
  }
    
    // Endpoint untuk memeriksa apakah API berjalan
    @GetMapping("/test")
    public String test() {
        return "API berjalan dengan baik";
    }
}
