package com.example.TUsma.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.example.TUsma.model.TataUsaha;
import com.example.TUsma.repository.TataUsahaRepo;
import com.example.TUsma.utils.JwtUtil;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/tata-usaha")
public class TataUsahaController {
    private final TataUsahaRepo TuRepo;

    public TataUsahaController(TataUsahaRepo TuRepo){
        this.TuRepo = TuRepo;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody TataUsaha loginRequest){
        Optional<TataUsaha> tu = TuRepo.findByUsername(loginRequest.getUsername());
        Map<String,Object> response = new HashMap<>();

        if(tu.isPresent() && tu.get().getPassword().equals(loginRequest.getPassword())){
            String token = JwtUtil.generateToken(tu.get().getUsername());
            response.put("status","success");
            response.put("token", token);
            response.put("admin" , tu.get());
            return ResponseEntity.ok(response);
        }else{
            response.put("status" , "success");
            response.put("message", "invalid username or password");
            return ResponseEntity.status(401).body(response);
        }
    }

}
