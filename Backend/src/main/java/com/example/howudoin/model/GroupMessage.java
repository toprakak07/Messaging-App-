package com.example.howudoin.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "group_messages")
public class GroupMessage {

    @Id
    private String id; // MongoDB tarafından otomatik oluşturulacak benzersiz kimlik
    private String groupId; // Mesajın ait olduğu grup ID'si
    private String senderId; // Mesajı gönderen kullanıcının ID'si
    private String content; // Mesaj içeriği
    private LocalDateTime timestamp; // Mesajın gönderildiği tarih ve saat

    // Parametreli Constructor
    public GroupMessage(String groupId, String senderId, String content) {
        if (groupId == null || groupId.trim().isEmpty()) {
            throw new IllegalArgumentException("Group ID cannot be null or empty");
        }
        if (senderId == null || senderId.trim().isEmpty()) {
            throw new IllegalArgumentException("Sender ID cannot be null or empty");
        }
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Content cannot be null or empty");
        }

        this.groupId = groupId;
        this.senderId = senderId;
        this.content = content;
        this.timestamp = LocalDateTime.now(); // Varsayılan olarak şu anki zaman
    }

    // Default Constructor (Spring Data için gereklidir)
    public GroupMessage() {
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        if (groupId == null || groupId.trim().isEmpty()) {
            throw new IllegalArgumentException("Group ID cannot be null or empty");
        }
        this.groupId = groupId;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        if (senderId == null || senderId.trim().isEmpty()) {
            throw new IllegalArgumentException("Sender ID cannot be null or empty");
        }
        this.senderId = senderId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Content cannot be null or empty");
        }
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
