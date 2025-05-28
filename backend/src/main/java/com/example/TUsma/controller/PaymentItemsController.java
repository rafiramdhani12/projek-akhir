package com.example.TUsma.controller;


import com.example.TUsma.model.PaymentItems;
import com.example.TUsma.repository.PaymentItemsRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/payment-items")
public class PaymentItemsController {
    private final PaymentItemsRepo paymentRepo;

    public PaymentItemsController(PaymentItemsRepo paymentRepo){
        this.paymentRepo = paymentRepo;
    }

    @GetMapping
    public List<PaymentItems> getAllPayment(){
        return paymentRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<PaymentItems> createPayment(@RequestBody PaymentItems payment){
        PaymentItems savedPayment = paymentRepo.save(payment);
        return ResponseEntity.ok(savedPayment);
    }

    @PatchMapping("edit/{id}")
    public ResponseEntity<PaymentItems> editPayment(@PathVariable Long id, @RequestBody PaymentItems paymentDetails){
        Optional<PaymentItems> paymentOptional = paymentRepo.findById(id);

        if(paymentOptional.isPresent()){
            PaymentItems payment = paymentOptional.get();
            payment.setTitle(paymentDetails.getTitle());
            payment.setValue(paymentDetails.getValue());
            PaymentItems updatePayment = paymentRepo.save(payment);
            return ResponseEntity.ok(updatePayment);
        } else{
            return ResponseEntity.notFound().build();        
        }

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id){
        Optional<PaymentItems> payment = paymentRepo.findById(id);

        if(payment.isPresent()){
            paymentRepo.delete(payment.get());
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.notFound().build();
        }

    }

}
