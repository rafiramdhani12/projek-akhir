package com.example.TUsma.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.TUsma.model.PaymentItems;
import org.springframework.stereotype.Repository;

// * dan disini adalah repository siswa yg di extends jpa repository jadi mempunyai semua fungsi / method dari jpaRepository dan kita jg bisa membuat fungsi sendiri
@Repository
public interface PaymentItemsRepo extends JpaRepository<PaymentItems,Long> {
    
}
