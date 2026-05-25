// src/main/resources/static/js/validation.js

// ドキュメントの読み込み完了後にイベントを設定
document.addEventListener('DOMContentLoaded', function() {
    // 図書フォームの入力検証
    var bookForm = document.querySelector('#bookForm');
    if (bookForm) {
        bookForm.addEventListener('submit', function(event) {
            var isValid = validateBookForm();
            if (!isValid) {
                event.preventDefault(); // フォームの送信を中止
            }
        });
    }

    // ユーザーフォームの入力検証
    var userForm = document.querySelector('#userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(event) {
            var isValid = validateUserForm();
            if (!isValid) {
                event.preventDefault(); // フォームの送信を中止
            }
        });

        // パスワードの強度チェック
        var passwordField = document.querySelector('#password');
        if (passwordField) {
            passwordField.addEventListener('input', function() {
                var strengthMessage = document.querySelector('#password-strength');
                var strength = checkPasswordStrength(passwordField.value);
                strengthMessage.textContent = 'パスワードの強度: ' + strength;
            });
        }

        // 役割の選択によるフォームの動的変更
        var rolesSelect = document.querySelector('#roles');
        if (rolesSelect) {
            rolesSelect.addEventListener('change', function() {
                toggleAdminFields();
            });
            // 初期表示時にも実行
            toggleAdminFields();
        }
    }

    // 削除ボタンの確認ダイアログ
    var deleteLinks = document.querySelectorAll('.delete-link');
    deleteLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            var confirmed = confirm('本当に削除しますか？');
            if (!confirmed) {
                event.preventDefault(); // リンクの動作を中止
            }
        });
    });
});

// 図書フォームの入力検証関数
function validateBookForm() {
    var isValid = true;
    var titleField = document.querySelector('#title');
    var authorField = document.querySelector('#author');
    var publisherField = document.querySelector('#publisher');
    var categoryField = document.querySelector('#category');
    var quantityField = document.querySelector('#quantity');

    // 各フィールドの検証とエラーメッセージ表示
    if (titleField.value.trim() === '') {
        showError(titleField, 'タイトルを入力してください。');
        isValid = false;
    } else {
        clearError(titleField);
    }

    if (authorField.value.trim() === '') {
        showError(authorField, '著者名を入力してください。');
        isValid = false;
    } else {
        clearError(authorField);
    }

    if (publisherField.value.trim() === '') {
        showError(publisherField, '出版社名を入力してください。');
        isValid = false;
    } else {
        clearError(publisherField);
    }

    if (categoryField.value.trim() === '') {
        showError(categoryField, '分類を入力してください。');
        isValid = false;
    } else {
        clearError(categoryField);
    }

    if (quantityField.value === '' || isNaN(quantityField.value) || parseInt(quantityField.value) < 0) {
        showError(quantityField, '在庫数には0以上の数値を入力してください。');
        isValid = false;
    } else {
        clearError(quantityField);
    }

    return isValid;
}

// ユーザーフォームの入力検証関数
function validateUserForm() {
    var isValid = true;
    var usernameField = document.querySelector('#username');
    var passwordField = document.querySelector('#password');
    var rolesField = document.querySelector('#roles');

    if (usernameField.value.trim() === '') {
        showError(usernameField, 'ユーザー名を入力してください。');
        isValid = false;
    } else {
        clearError(usernameField);
    }

    if (passwordField) {
        if (passwordField.value === '') {
            showError(passwordField, 'パスワードを入力してください。');
            isValid = false;
        } else if (passwordField.value.length < 6) {
            showError(passwordField, 'パスワードは6文字以上で入力してください。');
            isValid = false;
        } else {
            clearError(passwordField);
        }
    }

    if (rolesField.selectedOptions.length === 0) {
        showError(rolesField, '少なくとも一つの役割を選択してください。');
        isValid = false;
    } else {
        clearError(rolesField);
    }

    return isValid;
}

// エラーメッセージを表示する関数
function showError(element, message) {
    var errorElement = element.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
    } else {
        // エラーメッセージ要素が存在しない場合は作成
        errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.classList.add('error');
        errorElement.textContent = message;
        element.parentElement.appendChild(errorElement);
    }
    element.classList.add('error-input');
}

// エラーメッセージをクリアする関数
function clearError(element) {
    var errorElement = element.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
        // エラーメッセージ要素を削除する場合
        // element.parentElement.removeChild(errorElement);
    }
    element.classList.remove('error-input');
}

// パスワードの強度をチェックする関数
function checkPasswordStrength(password) {
    var strength = '弱い';
    var regexWeak = /^(?=.*[a-zA-Z]).{6,}$/;
    var regexMedium = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    var regexStrong = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (regexStrong.test(password)) {
        strength = '強い';
    } else if (regexMedium.test(password)) {
        strength = '中';
    } else if (regexWeak.test(password)) {
        strength = '弱い';
    } else {
        strength = '非常に弱い';
    }

    return strength;
}

// 管理者専用フィールドの表示・非表示を切り替える関数
function toggleAdminFields() {
    var rolesSelect = document.querySelector('#roles');
    var selectedRoles = Array.from(rolesSelect.selectedOptions).map(option => option.value);
    var adminFields = document.querySelectorAll('.admin-only');

    if (selectedRoles.includes('ADMIN')) {
        adminFields.forEach(function(field) {
            field.style.display = 'block';
        });
    } else {
        adminFields.forEach(function(field) {
            field.style.display = 'none';
        });
    }
}
