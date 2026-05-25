package com.example.library.config;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.library.model.Book;
import com.example.library.model.Rental;
import com.example.library.model.Role;
import com.example.library.model.User;
import com.example.library.repository.BookRepository;
import com.example.library.repository.RentalRepository;
import com.example.library.repository.UserRepository;

@Configuration
public class TestDataInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        // ユーザーを初期化
        initUsers();

        // 書籍を初期化
        initBooks();

        // 貸出データを初期化
        initRentals();
    }

    private void initUsers() {
        // 管理者ユーザーを追加
        if (!userRepository.existsByUsername("admin")) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("admin"));
            adminUser.setEnabled(true);
            adminUser.setAccountNonLocked(true);
            adminUser.setRoles(new HashSet<>(Arrays.asList(Role.ADMIN)));
            userRepository.save(adminUser);
        }

        // 一般ユーザーを追加
        if (!userRepository.existsByUsername("user")) {
            User regularUser = new User();
            regularUser.setUsername("user");
            regularUser.setPassword(passwordEncoder.encode("user"));
            regularUser.setEnabled(true);
            regularUser.setAccountNonLocked(true);
            regularUser.setRoles(new HashSet<>(Arrays.asList(Role.USER)));
            userRepository.save(regularUser);
        }

        // 複数のユーザーを追加
        for (int i = 1; i <= 5; i++) {
            String username = "user" + i;
            if (!userRepository.existsByUsername(username)) {
                User user = new User();
                user.setUsername(username);
                user.setPassword(passwordEncoder.encode("password" + i));
                user.setEnabled(true);
                user.setAccountNonLocked(true);
                user.setRoles(new HashSet<>(Arrays.asList(Role.USER)));
                userRepository.save(user);
            }
        }
        // スタッフユーザーを追加
        if (!userRepository.existsByUsername("staff")) {
            User staffUser = new User();
            staffUser.setUsername("staff");
            staffUser.setPassword(passwordEncoder.encode("staff"));
            staffUser.setEnabled(true);
            staffUser.setAccountNonLocked(true);
            staffUser.setRoles(new HashSet<>(Arrays.asList(Role.STAFF)));
            userRepository.save(staffUser);
        }

        // 複数のユーザーを追加
        for (int i = 1; i <= 2; i++) {
            String username = "staff_user" + i;
            if (!userRepository.existsByUsername(username)) {
                User user = new User();
                user.setUsername(username);
                user.setPassword(passwordEncoder.encode("password" + i));
                user.setEnabled(true);
                user.setAccountNonLocked(true);
                user.setRoles(new HashSet<>(Arrays.asList(Role.STAFF)));
                userRepository.save(user);
            }
        }
    }

    private void initBooks() {
        // 書籍データが存在しない場合のみ追加
        if (bookRepository.count() == 0) {
            Book book1 = new Book();
            book1.setTitle("Spring Boot入門");
            book1.setAuthor("田中太郎");
            book1.setPublisher("技術評論社");
            book1.setCategory("プログラミング");
            book1.setQuantity(5);
            bookRepository.save(book1);

            Book book2 = new Book();
            book2.setTitle("Java完全マスター");
            book2.setAuthor("鈴木次郎");
            book2.setPublisher("翔泳社");
            book2.setCategory("プログラミング");
            book2.setQuantity(3);
            bookRepository.save(book2);

            Book book3 = new Book();
            book3.setTitle("Pythonデータ分析");
            book3.setAuthor("佐藤三郎");
            book3.setPublisher("オライリー・ジャパン");
            book3.setCategory("データサイエンス");
            book3.setQuantity(2);
            bookRepository.save(book3);

            for (int i = 1; i <= 10; i++) {
                Book book = new Book();
                book.setTitle("テスト書籍タイトル " + i);
                book.setAuthor("著者 " + i);
                book.setPublisher("出版社 " + i);
                book.setCategory("一般書籍");
                book.setQuantity(10 + i);
                bookRepository.save(book);
            }
        }
    }

    private void initRentals() {
        // 貸出データが存在しない場合のみ追加
        if (rentalRepository.count() == 0) {
            User user = userRepository.findByUsername("user");
            Book book = bookRepository.findById(1L).orElse(null);

            if (user != null && book != null) {
                Rental rental1 = new Rental();
                rental1.setUser(user);
                rental1.setBook(book);
                rental1.setRentedDate(LocalDate.now().minusDays(5));
                rental1.setDueDate(LocalDate.now().plusDays(10));
                rentalRepository.save(rental1);

                Rental rental2 = new Rental();
                rental2.setUser(user);
                rental2.setBook(book);
                rental2.setRentedDate(LocalDate.now().minusDays(15));
                rental2.setDueDate(LocalDate.now().minusDays(5));
                rentalRepository.save(rental2);
            }
        }
    }
}
