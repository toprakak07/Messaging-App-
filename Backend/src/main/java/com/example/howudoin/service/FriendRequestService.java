package com.example.howudoin.service;

import com.example.howudoin.model.FriendRequest;
import com.example.howudoin.model.User;
import java.util.Map;
import java.util.HashMap;
import com.example.howudoin.repository.FriendRequestRepository;
import com.example.howudoin.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FriendRequestService {

    private final FriendRequestRepository friendRequestRepository;
    private final UserRepository userRepository;

    public FriendRequestService(FriendRequestRepository friendRequestRepository, UserRepository userRepository) {
        this.friendRequestRepository = friendRequestRepository;
        this.userRepository = userRepository;
    }

    // Send a friend request
    public FriendRequest sendFriendRequest(String senderId, String receiverId) {
        System.out.println("Sender ID: " + senderId);
        System.out.println("Receiver ID: " + receiverId);

        if (senderId.equals(receiverId)) {
            throw new IllegalStateException("You cannot send a friend request to yourself.");
        }

        if (friendRequestRepository.existsBySenderIdAndReceiverId(senderId, receiverId)) {
            throw new IllegalStateException("A friend request has already been sent.");
        }

        FriendRequest request = new FriendRequest(senderId, receiverId, "PENDING");
        System.out.println("FriendRequest Object: " + request);

        return friendRequestRepository.save(request);
    }

    // Fetch all users except the current one
    public List<User> getAllUsersExceptCurrent(String currentUserId) {
        return userRepository.findAll().stream()
                .filter(user -> !user.getId().equals(currentUserId))
                .collect(Collectors.toList());
    }

    public List<Map<String, String>> getFriendList(String userId) {
        List<FriendRequest> friendRequests = friendRequestRepository.findAcceptedFriends(userId);

        return friendRequests.stream().map(request -> {
            Map<String, String> friendData = new HashMap<>();
            String friendId = userId.equals(request.getSenderId()) ? request.getReceiverId() : request.getSenderId();

            userRepository.findById(friendId).ifPresent(user -> {
                friendData.put("id", user.getId());
                friendData.put("email", user.getEmail());
                friendData.put("name", user.getName()); // Varsayılan bir isim alanı
            });

            return friendData;
        }).collect(Collectors.toList());
    }


    // Fetch pending friend requests for a receiver
    public List<FriendRequest> getPendingRequests(String receiverId) {
        System.out.println("Fetching pending requests for Receiver ID: " + receiverId);
        List<FriendRequest> requests = friendRequestRepository.findByReceiverIdAndStatus(receiverId, "PENDING");
        System.out.println("Requests Found: " + requests);
        return requests;
    }

    // Accept a friend request
    public FriendRequest acceptFriendRequest(String requestId) {
        FriendRequest request = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Friend request not found."));
        if (!"PENDING".equals(request.getStatus())) {
            throw new IllegalStateException("Only pending friend requests can be accepted.");
        }
        request.setStatus("ACCEPTED");
        return friendRequestRepository.save(request);
    }

    // Reject a friend request
    public void rejectFriendRequest(String requestId) {
        FriendRequest request = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Friend request not found."));
        if (!"PENDING".equals(request.getStatus())) {
            throw new IllegalStateException("Only pending friend requests can be rejected.");
        }
        friendRequestRepository.delete(request);
    }
}
