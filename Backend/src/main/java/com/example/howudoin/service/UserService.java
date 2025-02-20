package com.example.howudoin.service;

import com.example.howudoin.model.User;
import com.example.howudoin.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Tüm kullanıcıları listeleme
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Kullanıcı kaydı
    public User createUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalStateException("Email already in use.");
        }
        return userRepository.save(user);
    }

    // Kullanıcı giriş işlemi
    public User login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get(); // Şifre doğru, kullanıcıyı döndür
        }
        throw new IllegalArgumentException("Invalid email or password.");
    }

    // E-posta adresine göre kullanıcı ID'sini bulma
    public String getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getId) // Kullanıcı bulunduysa ID'sini döndür
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }

    // Kullanıcıyı e-posta ile bulma
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }
}
