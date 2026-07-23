
# NexTalk

A real-time MERN-stack chat application with instant messaging, image sharing, and online presence — built as a full end-to-end learning project covering authentication, REST APIs, WebSockets, and cloud deployment.

## Live Demo

Try the live application at [https://nextalk-u0olz.sevalla.app/login](https://nextalk-u0olz.sevalla.app/login)

> **Note:** Welcome emails are limited to the developer's verified address on the live demo — this doesn't affect registration or login, so feel free to sign up and try it out.

## Features

- **Authentication** — secure registration and login with hashed passwords (bcrypt) and JWT-based sessions stored in HTTP-only cookies
- **Real-time messaging** — instant message delivery via Socket.IO, with messages persisted even when the recipient is offline
- **Image sharing** — send images in chat and set a profile picture, both uploaded via Cloudinary
- **Online presence** — see which contacts are currently online
- **Contacts & chat history** — browse all registered users or jump straight to your active conversations
- **Welcome emails** — new users receive a welcome email via Resend on registration
- **Bot & abuse protection** — API routes are protected with Arcjet (rate limiting and bot detection)
- **Responsive UI** — adapts from mobile to desktop, including a WhatsApp-style single-panel view on small screens

## Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS 4 + daisyUI
- Zustand for state management
- React Router for navigation
- Socket.IO client for real-time updates
- Axios for API requests

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO for WebSocket connections
- JSON Web Tokens (JWT) for auth
- bcryptjs for password hashing
- Cloudinary for image uploads
- Resend for transactional email
- Arcjet for rate limiting and bot protection

## Project Structure

```
NexTalk/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers (auth, messages)
│   │   ├── middleware/     # Auth guards, Arcjet protection
│   │   ├── models/         # Mongoose schemas (User, Message)
│   │   ├── routes/         # Express route definitions
│   │   ├── lib/            # DB connection, sockets, Cloudinary, env config
│   │   ├── emails/         # Transactional email templates & sending logic
│   │   └── server.js       # App entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI building blocks
│   │   ├── pages/          # Route-level pages (Login, Register, Chat)
│   │   ├── store/          # Zustand stores (auth, chat)
│   │   └── lib/            # Axios instance config
│   └── package.json
└── package.json            # Root scripts to run both apps together
```

## Getting Started

### Prerequisites

- Node.js v20 or higher
- A MongoDB database (e.g. [MongoDB Atlas](https://www.mongodb.com/atlas))
- Accounts for [Cloudinary](https://cloudinary.com), [Resend](https://resend.com), and [Arcjet](https://arcjet.com) (all have free tiers)

### Installation

Clone the repository and install dependencies for both the backend and frontend:

```bash
git clone https://github.com/hemjaygfx/NexTalk.git
cd NexTalk
npm install --prefix backend
npm install --prefix frontend
```

### Environment Variables

Create a `.env` file inside the `backend/` folder with the following:

```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_sender_email
EMAIL_FROM_NAME=NexTalk

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
```

> **Note:** Resend's free tier only allows sending emails to your own verified address until you verify a custom domain at [resend.com/domains](https://resend.com/domains).

### Running Locally

From the project root, start both the backend and frontend together:

```bash
npm run dev
```

This runs the backend on `http://localhost:3000` and the frontend on `http://localhost:5173`.

Alternatively, run each independently:

```bash
# Backend only
npm run dev --prefix backend

# Frontend only
npm run dev --prefix frontend
```

### Building for Production

```bash
npm run build
npm start
```

This builds the frontend into static assets and serves them directly from the Express backend on a single port.

## Deployment

NexTalk is set up to deploy as a single service (the Express backend serves the built frontend). It has been tested with [Sevalla](https://sevalla.com) using Nixpacks, but should work on any Node.js hosting platform that supports a custom build/start command.

Make sure all environment variables listed above are configured in your hosting platform's dashboard before deploying.

## Contributing

This project was built as a learning exercise and is open for anyone to explore, fork, or use as a reference for their own MERN-stack projects. If you spot a bug or have a suggestion, feel free to open an issue or submit a pull request.


## Acknowledgements

Built as a learning project to explore full-stack real-time application development with the MERN stack and Socket.IO.