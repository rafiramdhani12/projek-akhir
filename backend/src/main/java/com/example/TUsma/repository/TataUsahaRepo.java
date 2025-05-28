package com.example.TUsma.repository;

import java.util.Optional;
import com.example.TUsma.model.TataUsaha;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TataUsahaRepo extends JpaRepository<TataUsaha,Long>{
    Optional<TataUsaha> findByUsername(String username);
}
