// src/main/java/com/example/library/repository/UserRepository.java

package com.example.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.library.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // ユーザー名でユーザーが存在するかどうかを確認するメソッドを追加
    boolean existsByUsername(String username);
    
    
    User findByUsername(String username);
}
