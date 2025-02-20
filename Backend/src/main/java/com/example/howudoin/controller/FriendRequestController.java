package com.example.howudoin.controller;

import com.example.howudoin.model.FriendRequest;
import com.example.howudoin.repository.UserRepository;
import com.example.howudoin.service.FriendRequestService;
import com.example.howudoin.config.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:8081", allowedHeaders = "*", exposedHeaders = "Authorization")
@RestController
@RequestMapping("/api/friends")
public class FriendRequestController {

    private final FriendRequestService friendRequestService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public FriendRequestController(FriendRequestService friendRequestService, UserRepository userRepository, JwtUtil jwtUtil) {
        this.friendRequestService = friendRequestService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendFriendRequest(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, String> request
    ) {
        String receiverId = request.get("receiverId"); // Body'den receiverId alınıyor
        System.out.println("Receiver ID from API Request: " + receiverId);

        if (receiverId == null || receiverId.isEmpty()) {
            return ResponseEntity.badRequest().body("Receiver ID must be provided.");
        }

        try {
            String email = jwtUtil.validateToken(token.replace("Bearer ", ""));
            String senderId = userRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("Sender not found."))
                    .getId(); // Token'dan sender ID alınıyor
            System.out.println("Sender ID from JWT: " + senderId);

            FriendRequest friendRequest = friendRequestService.sendFriendRequest(senderId, receiverId);
            return ResponseEntity.ok(friendRequest);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/friends")
    public ResponseEntity<?> getFriends(@RequestHeader("Authorization") String token) {
        try {
            String userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
            List<Map<String, String>> friends = friendRequestService.getFriendList(userId);
            return ResponseEntity.ok(friends);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/all-users")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String token) {
        try {
            String userId = jwtUtil.validateToken(token.replace("Bearer ", ""));
            List<Map<String, String>> users = friendRequestService.getAllUsersExceptCurrent(userId).stream()
                    .map(user -> Map.of(
                            "id", user.getId(),
                            "email", user.getEmail()
                    )).collect(Collectors.toList());
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingFriendRequests(@RequestHeader("Authorization") String token) {
        try {
            // JWT'den oturum açan kullanıcının ID'sini alın (Bu kullanıcı alıcıdır)
            String receiverId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
            System.out.println("Receiver ID from JWT: " + receiverId);

            // Servisten "PENDING" durumundaki istekleri al
            List<FriendRequest> pendingRequests = friendRequestService.getPendingRequests(receiverId);
            System.out.println("Pending requests for Receiver ID: " + receiverId + " -> " + pendingRequests);

            // Gelen arkadaşlık isteklerini response formatına dönüştür
            List<Map<String, Object>> response = pendingRequests.stream().map(request -> {
                Map<String, Object> data = new HashMap<>();
                data.put("id", request.getId());
                userRepository.findById(request.getSenderId()).ifPresent(sender -> {
                    data.put("senderEmail", sender.getEmail());
                    System.out.println("Sender Email Found: " + sender.getEmail());
                });
                return data;
            }).collect(Collectors.toList());

            System.out.println("Final Response to Frontend: " + response);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




    @PostMapping("/accept")
    public ResponseEntity<?> acceptFriendRequest(@RequestBody Map<String, String> request) {
        String requestId = request.get("requestId");
        if (requestId == null || requestId.isEmpty()) {
            return ResponseEntity.badRequest().body("Request ID must be provided.");
        }

        try {
            FriendRequest updatedRequest = friendRequestService.acceptFriendRequest(requestId);
            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reject")
    public ResponseEntity<?> rejectFriendRequest(@RequestBody Map<String, String> request) {
        String requestId = request.get("requestId");
        if (requestId == null || requestId.isEmpty()) {
            return ResponseEntity.badRequest().body("Request ID must be provided.");
        }

        try {
            friendRequestService.rejectFriendRequest(requestId);
            return ResponseEntity.ok("Friend request rejected.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
