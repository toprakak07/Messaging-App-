# Howudoin Project - Messaging Application

## Project Overview

Howudoin is a **fully developed real-time messaging application** inspired by WhatsApp, built using **Spring Boot** for the backend and **React Native** for the frontend. The project includes:

1. **Backend (Spring Boot & MongoDB)** - Implements user authentication, friend requests, messaging, and group chat functionalities.
2. **Frontend (React Native & Redux)** - Provides a seamless mobile experience for messaging, friend management, and group interactions.

## Technologies Used

### Backend:

- **Java (Spring Boot)** - REST API development
- **MongoDB** - NoSQL database for user, message, and group storage
- **JWT (JSON Web Tokens)** - Authentication and authorization
- **WebSockets** - Real-time messaging

### Frontend:

- **React Native** - Cross-platform mobile development (iOS & Android)
- **Redux** - State management
- **Axios** - API requests
- **React Navigation** - Screen transitions

---

## Features

### **Backend (Spring Boot & MongoDB)**

✔️ User Registration & JWT-based Login\
✔️ Friend Request System\
✔️ Real-time Messaging with WebSockets\
✔️ MongoDB Storage for Users, Groups, and Messages\
✔️ Group Messaging & Group Management\
✔️ Secure Authentication & Role-Based Access

### **Frontend (React Native & Redux)**

✔️ User Registration & Login Screen\
✔️ Friend Request & Friends List Screens\
✔️ Private & Group Chat Interfaces\
✔️ Real-time Updates for Conversations\
✔️ Group Creation & Management\
✔️ Smooth UI/UX with React Navigation

---

## API Endpoints

### **Authentication APIs**

- `POST /register` - User registration
- `POST /login` - Authenticate and return JWT token

### **Friend APIs**

- `POST /friends/add` - Send a friend request
- `POST /friends/accept` - Accept a friend request
- `GET /friends` - Retrieve the friend list

### **Messaging APIs**

- `POST /messages/send` - Send a private message
- `GET /messages` - Retrieve chat history

### **Group APIs**

- `POST /groups/create` - Create a new group
- `POST /groups/{groupId}/add-member` - Add a member to a group
- `POST /groups/{groupId}/send` - Send a message to the group
- `GET /groups/{groupId}/messages` - Get group message history

---

## Installation & Running the Project

### **Backend Setup (Spring Boot)**

1. Clone the repository:
   ```sh
   git clone https://github.com/toprakak07/Howudoin.git
   cd Howudoin/backend
   ```
2. Configure MongoDB in `application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/howudoin
   ```
3. Build and run the application:
   ```sh
   mvn spring-boot:run
   ```

### **Frontend Setup (React Native)**

1. Clone the frontend repository:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   cd "path-to-frontend-folder"
   npm start
   ```

---

## Project Completion

✅ **Phase I (Backend) Completed**\
✅ **Phase II (Frontend) Completed**\
✅ **Full Integration & Deployment Successful**

## Contributors

- **Toprak Aktepe** (GitHub: [toprakak07](https://github.com/toprakak07))

