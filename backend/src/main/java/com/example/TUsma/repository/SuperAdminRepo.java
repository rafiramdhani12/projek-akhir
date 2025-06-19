package com.example.TUsma.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.TUsma.model.SuperAdmin;

public interface SuperAdminRepo extends JpaRepository<SuperAdmin,Long> {
    Optional<SuperAdmin> findByName(String name);
}
