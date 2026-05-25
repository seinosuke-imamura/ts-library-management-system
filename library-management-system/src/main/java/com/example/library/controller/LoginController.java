package com.example.library.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    // ログイン成功後、ダッシュボードにリダイレクト
    @GetMapping("/login-success")
    public String loginSuccess() {
        return "redirect:/dashboard";
    }

    // ダッシュボードの表示
    @GetMapping("/dashboard")
    public String showDashboard() {
        return "dashboard";
    }
}
