// BookRepository.java
package com.example.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.library.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // タイトルに基づいて書籍を検索するメソッド
    List<Book> findByTitleContaining(String title);

    // 著者名で図書を検索
    List<Book> findByAuthorContaining(String author);

    // 出版社名で図書を検索
    List<Book> findByPublisherContaining(String publisher);

    // 分類で図書を検索
    List<Book> findByCategoryContaining(String category);
}
