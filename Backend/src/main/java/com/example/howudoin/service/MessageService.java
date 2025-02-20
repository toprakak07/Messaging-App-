package com.example.howudoin.service;

import com.example.howudoin.model.Message;
import com.example.howudoin.repository.MessageRepository;
import java.util.stream.Collectors;
import java.util.Comparator;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    // Mesaj gönderme
    public Message sendMessage(String senderId, String receiverId, String content) {
        Message message = new Message(senderId, receiverId, content);
        return messageRepository.save(message);
    }

    // Kullanıcılar arasındaki mesajları alma
    public List<Message> getConversation(String userId1, String userId2) {
        List<Message> sentMessages = messageRepository.findBySenderIdAndReceiverId(userId1, userId2);
        List<Message> receivedMessages = messageRepository.findBySenderIdAndReceiverId(userId2, userId1);
        sentMessages.addAll(receivedMessages);
        sentMessages.sort(Comparator.comparing(Message::getTimestamp));
        return sentMessages;
    }
}