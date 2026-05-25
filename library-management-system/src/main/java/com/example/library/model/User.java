package com.example.library.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    // 新しく追加
    private boolean enabled;

    // アカウントのロック関連のフィールド
    private boolean accountNonLocked;
    private int failedAttempt;
    private Date lockTime;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();

    // デフォルトコンストラクタ（JPAで使用）
    public User() {}

    // ユーザー名とパスワードのみを初期化するコンストラクタ
    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.enabled = true;
        this.accountNonLocked = true;
        this.failedAttempt = 0;
    }

    // フルコンストラクタ
    public User(String username, String password, Set<Role> roles, boolean accountNonLocked, int failedAttempt, boolean enabled) {
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.accountNonLocked = accountNonLocked;
        this.failedAttempt = failedAttempt;
        this.enabled = enabled;
    }

    // ゲッターとセッター

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // enabled
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    // accountNonLocked
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    // failedAttempt
    public int getFailedAttempt() {
        return failedAttempt;
    }

    public void setFailedAttempt(int failedAttempt) {
        this.failedAttempt = failedAttempt;
    }

    // lockTime
    public Date getLockTime() {
        return lockTime;
    }

    public void setLockTime(Date lockTime) {
        this.lockTime = lockTime;
    }

    // roles
    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
