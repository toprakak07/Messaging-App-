package com.example.howudoin.repository;

import com.example.howudoin.model.FriendRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface FriendRequestRepository extends MongoRepository<FriendRequest, String> {

    // Fetch friend requests with a specific status for a receiver
    List<FriendRequest> findByReceiverIdAndStatus(String receiverId, String status);

    // Check if a friend request already exists between sender and receiver
    boolean existsBySenderIdAndReceiverId(String senderId, String receiverId);

    // Find all accepted friend relationships involving a user
    @Query("{ $or: [ { 'senderId': ?0 }, { 'receiverId': ?0 } ], 'status': 'ACCEPTED' }")
    List<FriendRequest> findAcceptedFriends(String userId);
}
