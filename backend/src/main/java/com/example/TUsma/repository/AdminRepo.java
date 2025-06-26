package com.example.TUsma.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.TUsma.model.Admin;

public interface AdminRepo extends JpaRepository<Admin, Long> {
    Optional<Admin> findByName(String name);
    Optional<Admin> findByIdEmployee(String idEmployee);
}
