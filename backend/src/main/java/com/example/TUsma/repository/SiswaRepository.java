package com.example.TUsma.repository;

import com.example.TUsma.model.Siswa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// * dan disini adalah repository siswa yg di extends jpa repository jadi mempunyai semua fungsi / method dari jpaRepository dan kita jg bisa membuat fungsi sendiri
@Repository
public interface SiswaRepository extends JpaRepository<Siswa, Long> {
    
}
