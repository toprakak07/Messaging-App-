package com.example.howudoin.controller;

import com.example.howudoin.model.Group;
import com.example.howudoin.service.GroupService;
import com.example.howudoin.config.JwtUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private static final Logger logger = LoggerFactory.getLogger(GroupController.class);

    private final GroupService groupService;
    private final JwtUtil jwtUtil;

    public GroupController(GroupService groupService, JwtUtil jwtUtil) {
        this.groupService = groupService;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Endpoint for creating a group.
     */
    @PostMapping("/create")
    public ResponseEntity<Group> createGroup(@RequestHeader("Authorization") String token,
                                             @RequestBody Map<String, Object> request) {
        try {
            String creatorId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
            String name = (String) request.get("name");
            List<String> members = (List<String>) request.get("members");

            if (name == null || name.trim().isEmpty()) {
                logger.error("Group name cannot be null or empty");
                return ResponseEntity.badRequest().body(null);
            }

            if (members == null || members.isEmpty()) {
                logger.error("Group must have at least one member");
                return ResponseEntity.badRequest().body(null);
            }

            if (!members.contains(creatorId)) {
                members.add(creatorId);
            }

            Group createdGroup = groupService.createGroup(name, members, creatorId);
            logger.info("Group created successfully: {}", createdGroup);
            return ResponseEntity.ok(createdGroup);
        } catch (Exception e) {
            logger.error("Error while creating group", e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    /**
     * Endpoint for listing all groups.
     */
    @GetMapping("/list")
    public ResponseEntity<List<Group>> getAllGroups() {
        try {
            List<Group> groups = groupService.getAllGroups();
            logger.info("Fetched all groups. Count: {}", groups.size());
            return ResponseEntity.ok(groups);
        } catch (Exception e) {
            logger.error("Error while fetching groups", e);
            return ResponseEntity.internalServerError().body(null);
        }
    }

    /**
     * Endpoint for adding a member to a group.
     */
    @PostMapping("/{groupId}/add-member")
    public ResponseEntity<Void> addMemberToGroup(@PathVariable String groupId,
                                                 @RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");

            if (userId == null || userId.trim().isEmpty()) {
                logger.error("User ID cannot be null or empty");
                return ResponseEntity.badRequest().build();
            }

            groupService.addMemberToGroup(groupId, userId);
            logger.info("User {} added to group {}", userId, groupId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error while adding member to group", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Endpoint for getting groups the user is a member of.
     */
    @GetMapping("/my-groups")
    public ResponseEntity<List<Group>> getUserGroups(@RequestHeader("Authorization") String token) {
        try {
            String userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
            List<Group> groups = groupService.getGroupsByUserId(userId);
            logger.info("Fetched groups for user {}. Count: {}", userId, groups.size());
            return ResponseEntity.ok(groups);
        } catch (Exception e) {
            logger.error("Error while fetching user's groups", e);
            return ResponseEntity.internalServerError().body(null);
        }
    }
}
