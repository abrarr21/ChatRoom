# CHATROOM

A real-time chat application that allows user to send and receive messages instantly.

## Features

- Real-time messaging using **Socket.io**
- Backend built with **Node.js**, **Express.js**, and **TypeScript**
- Frontend built with **React.js** and **TypeScript**
- Database management using **PostgreSQL** and **Prisma**
- User authentication and authorization
- Responsive and modern UI

## Technologies Used

- **PostgreSQL** - Database
- **Express.js** - Backend framework
- **React.js** - Frontend framework
- **Node.js** - Backend runtime
- **Socket.io** - Real-time communication
- **TypeScript** - Type safety across the application
- **Prisma** - ORM for PostgreSQL
- **Docker** - Containerization (optional)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/abrarr21/ChatRoom.git
   cd chatroom
   ```

2. **Install dependencies** using pnpm:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/chatroomdb

   JWT_SECRET=your_jwt_secret
   SOCKET_PORT=3001
   NODE_ENV=development
   NODE_ENV=production
   ```

4. **Set up the database**:

   Run the Prisma migrations to set up the PostgreSQL database:

   ```bash
   pnpm prisma migrate dev
   ```

5. **Start the backend server**:

   ```bash
   pnpm run dev
   ```

6. **Navigate to the frontend**:

   ```bash
   cd frontend
   pnpm install
   pnpm run dev
   ```

## Usage

- Open your browser and navigate to `http://localhost:6969`
- Register or log in
- Start chatting in real-time!

## Project Structure

```bash
chatroom/
│
├── backend/            # Express server with Socket.io
│   ├── src/
│   ├── prisma/
│   ├── .env
│   └── package.json
│
├── frontend/           # React frontend
│   ├── src/
│   └── package.json
│
├── README.md           # This file
└── package.json        # Root package.json





```
