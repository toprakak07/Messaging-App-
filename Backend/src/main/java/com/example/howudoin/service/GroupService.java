package com.example.howudoin.service;

import com.example.howudoin.model.Group;
import com.example.howudoin.repository.GroupRepository;
import com.example.howudoin.config.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupService {

    private static final Logger logger = LoggerFactory.getLogger(GroupService.class);

    private final GroupRepository groupRepository;
    private final JwtUtil jwtUtil;

    public GroupService(GroupRepository groupRepository, JwtUtil jwtUtil) {
        this.groupRepository = groupRepository;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Creates a new group.
     *
     * @param name       The name of the group.
     * @param members    A list of user IDs representing the initial members of the group.
     * @param creatorId  The ID of the user creating the group.
     * @return The saved group object.
     */
    public Group createGroup(String name, List<String> members, String creatorId) {
        validateGroupName(name);
        validateMembersList(members);

        // Ensure the creator is included in the members list
        if (!members.contains(creatorId)) {
            members.add(creatorId);
        }

        Group group = new Group(name, members);
        Group savedGroup = groupRepository.save(group);

        logger.info("Group created successfully: {}", savedGroup);
        return savedGroup;
    }

    /**
     * Retrieves all groups.
     *
     * @return A list of all groups in the database.
     */
    public List<Group> getAllGroups() {
        List<Group> groups = groupRepository.findAll();
        logger.info("Fetched all groups. Count: {}", groups.size());
        return groups;
    }

    /**
     * Retrieves a group by its ID.
     *
     * @param groupId The ID of the group.
     * @return The group object.
     */
    public Group getGroupById(String groupId) {
        validateGroupId(groupId);

        return groupRepository.findById(groupId)
                .orElseThrow(() -> {
                    logger.error("Group not found with ID: {}", groupId);
                    return new IllegalArgumentException("Group not found with ID: " + groupId);
                });
    }

    /**
     * Adds a user to an existing group.
     *
     * @param groupId The ID of the group.
     * @param userId  The ID of the user to be added.
     */
    public void addMemberToGroup(String groupId, String userId) {
        validateGroupId(groupId);
        validateUserId(userId);

        Group group = getGroupById(groupId);

        if (group.getMembers().contains(userId)) {
            logger.warn("User with ID {} is already a member of the group {}", userId, groupId);
            throw new IllegalArgumentException("User is already a member of the group");
        }

        group.getMembers().add(userId);
        groupRepository.save(group);

        logger.info("User with ID {} added to group {}", userId, groupId);
    }

    /**
     * Retrieves groups by a specific user ID extracted from a JWT token.
     *
     * @param token The JWT token.
     * @return A list of groups the user belongs to.
     */
    public List<Group> getGroupsByToken(String token) {
        String userId = extractUserIdFromToken(token);
        return getGroupsByUserId(userId);
    }

    /**
     * Retrieves groups by a specific user ID.
     *
     * @param userId The ID of the user.
     * @return A list of groups the user belongs to.
     */
    public List<Group> getGroupsByUserId(String userId) {
        validateUserId(userId);

        List<Group> userGroups = groupRepository.findAll()
                .stream()
                .filter(group -> group.getMembers().contains(userId))
                .collect(Collectors.toList());

        logger.info("Fetched {} groups for user {}", userGroups.size(), userId);
        return userGroups;
    }

    /**
     * Extracts the user ID from a JWT token.
     *
     * @param token The JWT token.
     * @return The extracted user ID.
     */
    public String extractUserIdFromToken(String token) {
        if (token == null || token.trim().isEmpty()) {
            throw new IllegalArgumentException("Token cannot be null or empty");
        }
        return jwtUtil.extractUserId(token.replace("Bearer ", ""));
    }

    /**
     * Validates the group name.
     *
     * @param name The name of the group.
     */
    private void validateGroupName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Group name cannot be null or empty");
        }
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
     * Validates the user ID.
     *
     * @param userId The ID of the user.
     */
    private void validateUserId(String userId) {
        if (userId == null || userId.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty");
        }
    }

    /**
     * Validates the members list.
     *
     * @param members A list of member IDs.
     */
    private void validateMembersList(List<String> members) {
        if (members == null || members.isEmpty()) {
            throw new IllegalArgumentException("Group must have at least one member");
        }
    }
}
