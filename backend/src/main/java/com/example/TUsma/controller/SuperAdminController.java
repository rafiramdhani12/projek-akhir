package com.example.TUsma.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
import com.example.TUsma.model.SuperAdmin;
import com.example.TUsma.repository.SuperAdminRepo;
import com.example.TUsma.utils.JwtUtil;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/superadmin")
public class SuperAdminController {
    
    private final SuperAdminRepo superAdminRepo;

    public SuperAdminController(SuperAdminRepo superAdminRepo) {
        this.superAdminRepo = superAdminRepo;
    }

    @GetMapping
    public List<SuperAdmin> getAllSuperAdmin(){
    return superAdminRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuperAdmin> getSuperAdminById(@PathVariable Long id) {
        Optional<SuperAdmin> superAdmin = superAdminRepo.findById(id);
        return superAdmin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SuperAdmin> createSuperAdmin(@RequestBody SuperAdmin superAdmin) {
        SuperAdmin savedSuperAdmin = superAdminRepo.save(superAdmin);
        return ResponseEntity.ok(savedSuperAdmin);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<SuperAdmin> editSuperAdmin(@PathVariable Long id, @RequestBody SuperAdmin superAdminDetails) {
        Optional<SuperAdmin> superAdminOptional = superAdminRepo.findById(id);

        if (superAdminOptional.isPresent()) {
            SuperAdmin superAdmin = superAdminOptional.get();
            superAdmin.setName(superAdminDetails.getName());
            superAdmin.setPassword(superAdminDetails.getPassword());
            superAdmin.setAddress(superAdminDetails.getAddress());
            superAdmin.setEmail(superAdminDetails.getEmail());
            superAdmin.setPhoneNumber(superAdminDetails.getPhoneNumber());
            SuperAdmin updatedSuperAdmin = superAdminRepo.save(superAdmin);
            return ResponseEntity.ok(updatedSuperAdmin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

@PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody SuperAdmin loginRequest){
    Optional<SuperAdmin> superAdmin = superAdminRepo.findByIdEmployee(loginRequest.getIdEmployee());
    Map<String, Object> response = new HashMap<>();

    if(superAdmin.isPresent() && superAdmin.get().getPassword().equals(loginRequest.getPassword())){
        String token = JwtUtil.generateToken(superAdmin.get().getIdEmployee());

        response.put("status", "success");
        response.put("token", token);
        response.put("superAdmin" , superAdmin.get());
        return ResponseEntity.ok(response);
    } else {
        response.put("status", "error");
        response.put("message", "Invalid username or password");
        return ResponseEntity.status(401).body(response);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
    Optional<SuperAdmin> superAdmin = superAdminRepo.findById(id);
    
    if(superAdmin.isPresent()) {
        superAdminRepo.delete(superAdmin.get());
        return ResponseEntity.ok().build();
    } else {
        return ResponseEntity.notFound().build();
    }
  }

}
