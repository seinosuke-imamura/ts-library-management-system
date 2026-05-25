// LibraryManagementSystemApplication.java
package com.example.library;

import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.library.model.Role;
import com.example.library.model.User;
import com.example.library.service.UserService;

@SpringBootApplication
public class LibraryManagementSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementSystemApplication.class, args);
    }

    @Bean
    public CommandLineRunner dataLoader(UserService userService) {
        return args -> {
            if (userService.findByUsername("admin") == null) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword("adminpassword"); // 後でエンコードされます
                admin.setRoles(Set.of(Role.ADMIN));
                userService.save(admin);
            }
        };
    }
}
