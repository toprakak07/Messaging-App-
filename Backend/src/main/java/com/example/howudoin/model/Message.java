package com.example.howudoin.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "messages") // Mesajların MongoDB'de "messages" koleksiyonunda saklanacağını belirtir
public class Message {

    @Id
    private String id; // Mesajın benzersiz kimliği
    private String senderId; // Mesajı gönderen kullanıcının ID'si
    private String receiverId; // Mesajın gönderildiği kullanıcının ID'si
    private String content; // Mesajın içeriği
    private LocalDateTime timestamp; // Mesajın gönderildiği zaman

    // Parametresiz Constructor (Spring Data MongoDB için gerekli)
    public Message() {}

    // Parametreli Constructor (Kolaylık için)
    public Message(String senderId, String receiverId, String content) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.timestamp = LocalDateTime.now(); // Mesaj oluşturulduğunda otomatik olarak zaman atanır
    }

    // Getter ve Setter Metodları

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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    // Override edilen toString metodu (Debugging için)
    @Override
    public String toString() {
        return "Message{" +
                "id='" + id + '\'' +
                ", senderId='" + senderId + '\'' +
                ", receiverId='" + receiverId + '\'' +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
