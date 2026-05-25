// src/main/java/com/example/library/controller/AuthController.java
package com.example.library.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {

    @GetMapping("/login")
    public String showLoginForm(Model model) {
        // ログインエラーの表示のため、エラー情報をモデルに追加
        return "login"; // templates/login.html を表示
    }

    // ログアウトの処理（必要に応じて）
    @GetMapping("/logout")
    public String logout() {
        return "redirect:/login?logout";
    }
}
