package com.example.howudoin.controller;

import com.example.howudoin.model.GroupMessage;
import com.example.howudoin.service.GroupMessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/groups")
public class GroupMessageController {

    private static final Logger logger = LoggerFactory.getLogger(GroupMessageController.class);
    private final GroupMessageService groupMessageService;

    public GroupMessageController(GroupMessageService groupMessageService) {
        this.groupMessageService = groupMessageService;
    }

    /**
     * Endpoint for sending a group message.
     */
    @PostMapping("/{groupId}/send-message")
    public ResponseEntity<GroupMessage> sendGroupMessage(
            @PathVariable String groupId,
            @RequestBody Map<String, String> request) {

        try {
            String senderId = request.get("senderId");
            String content = request.get("content");

            if (senderId == null || senderId.trim().isEmpty()) {
                logger.error("Sender ID cannot be null or empty");
                return ResponseEntity.badRequest().build();
            }

            if (content == null || content.trim().isEmpty()) {
                logger.error("Content cannot be null or empty");
                return ResponseEntity.badRequest().build();
            }

            GroupMessage message = groupMessageService.sendGroupMessage(groupId, senderId, content);
            logger.info("Message sent successfully to group {}: {}", groupId, message);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            logger.error("Error sending message to group {}", groupId, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Endpoint for fetching group message history.
     */
    @GetMapping("/{groupId}/messages")
    public ResponseEntity<List<GroupMessage>> getGroupMessages(@PathVariable String groupId) {
        try {
            List<GroupMessage> messages = groupMessageService.getGroupMessages(groupId);
            logger.info("Fetched {} messages for group {}", messages.size(), groupId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            logger.error("Error fetching messages for group {}", groupId, e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
