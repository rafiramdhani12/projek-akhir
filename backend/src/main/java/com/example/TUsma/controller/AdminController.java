package com.example.TUsma.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

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

    @GetMapping
    public List<Admin> getAllAdmin() {
        return adminRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        Optional<Admin> admin = adminRepo.findById(id);
        return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin savedAdmin = adminRepo.save(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    @PatchMapping("edit/{id}")
    public ResponseEntity<Admin> editAdmin(@PathVariable Long id, @RequestBody Admin adminDetails) {
        Optional<Admin> adminOptional = adminRepo.findById(id);

        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            admin.setName(adminDetails.getName());
            admin.setPassword(adminDetails.getPassword());
            admin.setAddress(adminDetails.getAddress());
            admin.setEmail(adminDetails.getEmail());
            admin.setPhoneNumber(adminDetails.getPhoneNumber());
            Admin updatedAdmin = adminRepo.save(admin);
            return ResponseEntity.ok(updatedAdmin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
   // Endpoint untuk login
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Admin loginRequest){
    Optional<Admin> admin = adminRepo.findByIdEmployee(loginRequest.getIdEmployee());
    Map<String, Object> response = new HashMap<>();

    if(admin.isPresent() && admin.get().getPassword().equals(loginRequest.getPassword())){
        String token = JwtUtil.generateToken(admin.get().getIdEmployee());

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

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
    Optional<Admin> admin = adminRepo.findById(id);
    
    if(admin.isPresent()) {
        adminRepo.delete(admin.get());
        return ResponseEntity.ok().build();
    } else {
        return ResponseEntity.notFound().build();
    }
}
    
    
}
