package com.example.howudoin.controller;

import com.example.howudoin.model.Message;
import com.example.howudoin.service.MessageService;
import com.example.howudoin.config.JwtUtil; // JwtUtil sınıfını içe aktarın
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final JwtUtil jwtUtil; // jwtUtil değişkeni

    public MessageController(MessageService messageService, JwtUtil jwtUtil) { // jwtUtil'i constructor'a ekleyin
        this.messageService = messageService;
        this.jwtUtil = jwtUtil;
    }

    // Mesaj gönderme
    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestHeader("Authorization") String token,
                                               @RequestBody Map<String, String> request) {
        String senderId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
        String receiverId = request.get("receiverId");
        String content = request.get("content");
        return ResponseEntity.ok(messageService.sendMessage(senderId, receiverId, content));
    }

    // Mesajlaşma geçmişini alma
    @GetMapping("/conversation")
    public ResponseEntity<List<Message>> getConversation(@RequestHeader("Authorization") String token,
                                                         @RequestParam String friendId) {
        String userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
        return ResponseEntity.ok(messageService.getConversation(userId, friendId));
    }
}
