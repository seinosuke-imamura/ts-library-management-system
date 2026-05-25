// RentalController.java
package com.example.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.library.service.RentalService;

@Controller
public class RentalController {

    @Autowired
    private RentalService rentalService;

    // レンタル記録一覧の表示
    @GetMapping("/rentals")
    public String listRentals(Model model) {
        model.addAttribute("rentals", rentalService.getAllRentals());
        return "rental_list";
    }
}
