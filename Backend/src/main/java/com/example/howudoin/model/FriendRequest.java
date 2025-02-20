package com.example.howudoin.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "friendRequests")
public class FriendRequest {

    @Id
    private String id; // FriendRequest ID
    private String senderId; // Sender's User ID
    private String receiverId; // Receiver's User ID
    private String status; // Status: PENDING, ACCEPTED, REJECTED

    // No-Argument Constructor (Required by Spring Data)
    public FriendRequest() {}

    // Parameterized Constructor
    public FriendRequest(String senderId, String receiverId, String status) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.status = status;
    }

    // Getter and Setter Methods
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Overridden toString Method for Debugging
    @Override
    public String toString() {
        return "FriendRequest{" +
                "id='" + id + '\'' +
                ", senderId='" + senderId + '\'' +
                ", receiverId='" + receiverId + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
