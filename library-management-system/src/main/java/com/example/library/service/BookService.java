package com.example.library.service;

import java.util.List; // Listをインポート

import com.example.library.model.Book;

public interface BookService {

    // 全ての書籍を取得するメソッド
    List<Book> getAllBooks();

    // IDで書籍を取得するメソッド
    Book getBookById(Long id);

    // 書籍を保存するメソッド
    Book saveBook(Book book);

    // 書籍を削除するメソッド
    void deleteBook(Long id);

    // 書籍を検索するメソッド（キーワードで検索）
    List<Book> searchBooks(String keyword);  

    // 書籍を追加するメソッド
    Book addBook(Book book);
}
