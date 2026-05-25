package com.example.library.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.library.model.Rental;
import com.example.library.repository.RentalRepository;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    // 全てのレンタル記録を取得
    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    // 特定のレンタル記録を取得
    public Rental getRentalById(Long id) {
        return rentalRepository.findById(id).orElse(null);
    }

    // レンタル記録を保存
    public Rental saveRental(Rental rental) {
        return rentalRepository.save(rental);
    }

    // レンタル記録を削除
    public void deleteRental(Long id) {
        rentalRepository.deleteById(id);
    }
}
