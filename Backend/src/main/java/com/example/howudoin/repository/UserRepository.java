package com.example.howudoin.repository;

import com.example.howudoin.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    // Query to find a user by email
    Optional<User> findByEmail(String email);

    // Add other queries if needed, e.g., check if email already exists
    boolean existsByEmail(String email);
}
