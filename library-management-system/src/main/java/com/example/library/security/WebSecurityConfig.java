// src/main/java/com/example/library/security/WebSecurityConfig.java
package com.example.library.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.library.service.UserService;

@Configuration
public class WebSecurityConfig {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public WebSecurityConfig(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/login", "/css/**", "/js/**").permitAll()  // ログインページと静的リソースは全員に許可
                .requestMatchers("/users/**").hasRole("ADMIN")  // 管理者のみがユーザー管理ページにアクセス可能
                .requestMatchers("/books/add", "/books/edit/**", "/books/delete/**").hasRole("ADMIN")  // 管理者のみが書籍の追加・編集・削除可能
                .requestMatchers("/books/**").hasAnyRole("STAFF", "ADMIN")  // スタッフと管理者が書籍管理にアクセス可能
                .anyRequest().authenticated()  // その他のリクエストは認証が必要
            )
            .formLogin(form -> form
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .failureUrl("/login?error")  // ログイン失敗時のリダイレクト先
                .defaultSuccessUrl("/", true)  // ログイン成功後のリダイレクト先
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout")  // ログアウト成功時のリダイレクト先
                .permitAll()
            )
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/h2-console/**")  // H2コンソールに対してCSRF保護を無効化
            );

        // 認証プロバイダの設定
        http.authenticationProvider(authenticationProvider());

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService);  // ユーザー情報を取得
        authProvider.setPasswordEncoder(passwordEncoder);  // パスワード暗号化
        return authProvider;
    }

   
}
