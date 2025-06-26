package com.example.TUsma.controller;

import com.example.TUsma.model.Admin;
import com.example.TUsma.model.TataUsaha;
import com.example.TUsma.model.SuperAdmin;
import com.example.TUsma.repository.AdminRepo;
import com.example.TUsma.repository.TataUsahaRepo;
import com.example.TUsma.repository.SuperAdminRepo;
import com.example.TUsma.utils.JwtUtil;
import com.example.TUsma.dto.LoginDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UniversalLoginController {

	private final AdminRepo adminRepo;
	private final TataUsahaRepo tuRepo;
	private final SuperAdminRepo saRepo;

	public UniversalLoginController(AdminRepo adminRepo, TataUsahaRepo tuRepo, SuperAdminRepo saRepo) {
		this.adminRepo = adminRepo;
		this.tuRepo = tuRepo;
		this.saRepo = saRepo;
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO loginRequest) {
		String id = loginRequest.getIdEmployee();
		String password = loginRequest.getPassword();

		Map<String, Object> response = new HashMap<>();

		// Cek di Admin
		Optional<Admin> admin = adminRepo.findByIdEmployee(id);
		if (admin.isPresent() && admin.get().getPassword().equals(password)) {
			String token = JwtUtil.generateToken(admin.get().getIdEmployee());
			response.put("status", "success");
			response.put("token", token);
			response.put("user", Map.of(
					"id", admin.get().getId(),
					"name", admin.get().getName(),
					"role", "admin"
			));
			return ResponseEntity.ok(response);
		}

		// Cek di Tata Usaha
		Optional<TataUsaha> tu = tuRepo.findByIdEmployee(id);
		if (tu.isPresent() && tu.get().getPassword().equals(password)) {
			String token = JwtUtil.generateToken(tu.get().getIdEmployee());
			response.put("status", "success");
			response.put("token", token);
			response.put("user", Map.of(
					"id", tu.get().getId(),
					"name", tu.get().getName(),
					"role", "tata-usaha"
			));
			return ResponseEntity.ok(response);
		}

		// Cek di Super Admin
		Optional<SuperAdmin> sa = saRepo.findByIdEmployee(id);
		if (sa.isPresent() && sa.get().getPassword().equals(password)) {
			String token = JwtUtil.generateToken(sa.get().getIdEmployee());
			response.put("status", "success");
			response.put("token", token);
			response.put("user", Map.of(
					"id", sa.get().getId(),
					"name", sa.get().getName(),
					"role", "superadmin"
			));
			return ResponseEntity.ok(response);
		}

		response.put("status", "error");
		response.put("message", "ID atau password salah");
		return ResponseEntity.status(401).body(response);
	}
}
