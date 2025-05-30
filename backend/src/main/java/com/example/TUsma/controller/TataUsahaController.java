package com.example.TUsma.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


import com.example.TUsma.model.TataUsaha;
import com.example.TUsma.repository.TataUsahaRepo;
import com.example.TUsma.utils.JwtUtil;
import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/tata-usaha")
public class TataUsahaController {
    private final TataUsahaRepo TuRepo;

    public TataUsahaController(TataUsahaRepo TuRepo){
        this.TuRepo = TuRepo;
    }

    @GetMapping
    public List<TataUsaha> getAllTataUsaha(){
        return TuRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<TataUsaha> createTu(@RequestBody TataUsaha tu){
        TataUsaha savedTu = TuRepo.save(tu);
        return ResponseEntity.ok(savedTu);
    }

    @PatchMapping("edit/{id}")
    public ResponseEntity<TataUsaha> editTu(@PathVariable Long id , @RequestBody TataUsaha tuDetails){
        Optional<TataUsaha> TuOptional = TuRepo.findById(id);
        
        if(TuOptional.isPresent()){
            TataUsaha Tu =TuOptional.get();
            Tu.setName(tuDetails.getName());
            Tu.setAddress(tuDetails.getAddress());
            Tu.setCountry(tuDetails.getCountry());
            Tu.setCity(tuDetails.getCity());
            TataUsaha updateTu = TuRepo.save(Tu);
            return ResponseEntity.ok(updateTu);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody TataUsaha loginRequest){
        Optional<TataUsaha> tu = TuRepo.findByName(loginRequest.getName());
        Map<String,Object> response = new HashMap<>();

        if(tu.isPresent() && tu.get().getPassword().equals(loginRequest.getPassword())){
            String token = JwtUtil.generateToken(tu.get().getName());
            response.put("status","success");
            response.put("token", token);
            response.put("tata-usaha" , tu.get());
            return ResponseEntity.ok(response);
        }else{
            response.put("status" , "success");
            response.put("message", "invalid username or password");
            return ResponseEntity.status(401).body(response);
        }
    }

    @DeleteMapping("/{id}")
     public ResponseEntity<Void> deleteTu(@PathVariable Long id) {
        Optional<TataUsaha> Tu = TuRepo.findById(id);
        
        if(Tu.isPresent()) {
            TuRepo.delete(Tu.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
