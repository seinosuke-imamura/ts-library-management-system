// UserController.java
package com.example.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.library.model.User;
import com.example.library.service.UserService;

@Controller
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ユーザー一覧表示
    @GetMapping
    public String listUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "user_list";  // ユーザー一覧ページのテンプレート名
    }

    // ユーザー追加ページを表示するメソッド
    @GetMapping("/add")
    public String showAddUserForm(Model model) {
        model.addAttribute("user", new User());
        return "user_form";  // user_form.htmlを指定
    }

    // ユーザーを追加する処理
    @PostMapping("/add")
    public String addUser(@ModelAttribute("user") User user) {
        try {
            userService.save(user);
            return "redirect:/users";  // ユーザー一覧ページにリダイレクト
        } catch (Exception e) {
            return "error";  // エラー発生時はエラーページへ遷移
        }
    }
}
