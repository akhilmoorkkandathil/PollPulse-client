# PollPulse: Real-Time Polling Application with Chat Feature
This project is a real-time polling application that integrates a voting system with a chat feature. Users can participate in live polls, view real-time results, and engage in chat conversations with other users. The application leverages WebSockets using Socket.IO for real-time communication and is built with a clean architecture approach using TypeScript in both frontend (Angular) and backend (Node.js).

## Features

## 1. Real-Time Polling System
Vote on Topics: Users can participate in live polls by voting on various options.
Live Poll Updates: Poll results are updated in real-time and broadcasted to all connected users.
Broadcasting: As users vote, the updated poll data is broadcasted to all other users immediately.
## 2. Real-Time Chat Feature
Send & Receive Messages: A live chat interface is integrated alongside the polling system, allowing users to communicate in real time.
Broadcasted Messages: All connected users can view the chat messages sent by others.
## 3. User Authentication
User Registration & Login: Basic authentication system using email verification to ensure unique user profiles.
Associate Usernames: Each chat message is associated with the user who sent it.
## 4. Data Management
Poll Data: The server stores poll options and keeps track of user votes.
Chat Messages: Chat history is stored on the server for display in real-time.
## 5. Frontend (Angular)
Interactive UI: Built using Angular, the interface is responsive, clean, and user-friendly.
Polling Interface: Users can view poll options, current vote counts, and cast their votes with ease.
Chat Interface: Users can send and receive chat messages in real-time while participating in the poll.
## 6. Backend (Node.js + TypeScript)
Express & Socket.IO: The backend is built with Express and Socket.IO for managing real-time WebSocket connections.
Clean Architecture: Organized codebase with separation of concerns, making it easy to maintain and extend.
Real-time Communication: Socket.IO ensures efficient real-time communication for both voting and chat functionalities.
## 7. Bonus Features
Persistent User Profiles: Users can log in and maintain their profiles.
Persistent Chat History: Message history can be retrieved even after users disconnect.
Mute Chat: Users have the option to mute or disable chat.



# Project Setup
## Prerequisites
### 1. Node.js 
### 2. Angular 
### 3. MongoDB 

## Installation
1. Clone the repository
2. Install dependencies
    npm install

