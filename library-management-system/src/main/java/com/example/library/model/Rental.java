package com.example.library.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "rentals")
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ユーザーを参照するフィールド
    @ManyToOne(fetch = FetchType.EAGER)  // EAGERでユーザー情報を一緒に取得
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 図書を参照するフィールド
    @ManyToOne(fetch = FetchType.EAGER)  // EAGERで図書情報を一緒に取得
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    // 貸出日
    private LocalDate rentedDate;

    // 返却期限
    private LocalDate dueDate;

    // コンストラクタ
    public Rental() {
    }

    public Rental(User user, Book book, LocalDate rentedDate, LocalDate dueDate) {
        this.user = user;
        this.book = book;
        this.rentedDate = rentedDate;
        this.dueDate = dueDate;
    }

    // id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // user
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // book
    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    // rentedDate
    public LocalDate getRentedDate() {
        return rentedDate;
    }

    public void setRentedDate(LocalDate rentedDate) {
        this.rentedDate = rentedDate;
    }

    // dueDate
    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
}
