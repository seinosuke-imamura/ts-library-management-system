// src/main/java/com/example/library/model/Book.java
package com.example.library.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// 図書エンティティを定義
@Entity
@Table(name = "book") // テーブル名を指定
public class Book {

    // 主キー
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // タイトル（必須項目）
    @Column(nullable = false)
    private String title;

    // 著者名（必須項目）
    @Column(nullable = false)
    private String author;

    // 出版社名（必須項目）
    @Column(nullable = false)
    private String publisher;

    // 分類（必須項目）
    @Column(nullable = false)
    private String category;

    // 在庫数（必須項目）
    @Column(nullable = false)
    private int quantity;

    // ISBNコード（ユニーク制約）
    @Column(unique = true)
    private String isbn;

    // 出版年
    private int publicationYear;

    // 新しく追加するフィールド（在庫数）
    @Column(nullable = false, columnDefinition = "int default 0")
    private int stock;

    // デフォルトコンストラクタ（JPAの要件）
    public Book() {}

    // パラメータを持つコンストラクタ（必要に応じてフィールドを初期化）
    public Book(String title, String author, String publisher, String category, int quantity, String isbn, int publicationYear, int stock) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.category = category;
        this.quantity = quantity;
        this.isbn = isbn;
        this.publicationYear = publicationYear;
        this.stock = stock;
    }

    // ゲッターとセッター
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public int getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(int publicationYear) {
        this.publicationYear = publicationYear;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    // デバッグやロギングに便利な toString メソッド
    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", publisher='" + publisher + '\'' +
                ", category='" + category + '\'' +
                ", quantity=" + quantity +
                ", isbn='" + isbn + '\'' +
                ", publicationYear=" + publicationYear +
                ", stock=" + stock +
                '}';
    }
}
