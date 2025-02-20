package com.example.howudoin.service;

import com.example.howudoin.model.GroupMessage;
import com.example.howudoin.repository.GroupMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupMessageService {

    private static final Logger logger = LoggerFactory.getLogger(GroupMessageService.class);
    private final GroupMessageRepository groupMessageRepository;

    public GroupMessageService(GroupMessageRepository groupMessageRepository) {
        this.groupMessageRepository = groupMessageRepository;
    }

    /**
     * Sends a message to a group.
     *
     * @param groupId  The ID of the group.
     * @param senderId The ID of the sender.
     * @param content  The message content.
     * @return The saved GroupMessage object.
     */
    public GroupMessage sendGroupMessage(String groupId, String senderId, String content) {
        validateGroupId(groupId);
        validateSenderId(senderId);
        validateContent(content);

        GroupMessage message = new GroupMessage(groupId, senderId, content);
        GroupMessage savedMessage = groupMessageRepository.save(message);

        logger.info("Message sent successfully: {}", savedMessage);
        return savedMessage;
    }

    /**
     * Retrieves the message history of a group.
     *
     * @param groupId The ID of the group.
     * @return A list of messages for the given group ID.
     */
    public List<GroupMessage> getGroupMessages(String groupId) {
        validateGroupId(groupId);

        List<GroupMessage> messages = groupMessageRepository.findByGroupId(groupId);

        if (messages.isEmpty()) {
            logger.warn("No messages found for group ID: {}", groupId);
        } else {
            logger.info("Fetched {} messages for group ID: {}", messages.size(), groupId);
        }

        return messages;
    }

    /**
     * Validates the group ID.
     *
     * @param groupId The ID of the group.
     */
    private void validateGroupId(String groupId) {
        if (groupId == null || groupId.trim().isEmpty()) {
            throw new IllegalArgumentException("Group ID cannot be null or empty");
        }
    }

    /**
     * Validates the sender ID.
     *
     * @param senderId The ID of the sender.
     */
    private void validateSenderId(String senderId) {
        if (senderId == null || senderId.trim().isEmpty()) {
            throw new IllegalArgumentException("Sender ID cannot be null or empty");
        }
    }

    /**
     * Validates the content of the message.
     *
     * @param content The content of the message.
     */
    private void validateContent(String content) {
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Message content cannot be null or empty");
        }
    }
}
