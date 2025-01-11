# Blog Project

This is a blog project built using the MERN stack (MongoDB, Express, React, Node.js).

## Prerequisites

- Node.js
- npm or yarn
- MongoDB

## Getting Started

### Server

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add your environment variables:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the server:

   ```bash
   npm start
   ```

### Client

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the client:

   ```bash
   npm run dev
   ```

## Project Structure

### Server

- `app.js`: Main application setup and middleware configuration.
- `server.js`: Server setup and error handling.
- `db/db.js`: Database connection setup.
- `routes/user.routes.js`: User-related routes.
- `routes/category.routes.js`: Category-related routes.
- `routes/blog.routes.js`: Blog-related routes.

### Client

- `App.jsx`: Main application component with routing setup.
- `main.jsx`: Entry point for the React application.
- `components/`: Reusable UI components.
- `layouts/`: Layout components.
- `pages/`: Page components.

## Dependencies

### Server

- bcrypt
- cookie-parser
- cors
- dotenv
- express
- express-validator
- jsonwebtoken
- mongoose
- morgan

### Client

- @hookform/resolvers
- @radix-ui/react-avatar
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-label
- @radix-ui/react-separator
- @radix-ui/react-slot
- @radix-ui/react-tooltip
- @reduxjs/toolkit
- axios
- class-variance-authority
- clsx
- lucide-react
- react
- react-dom
- react-hook-form
- react-redux
- react-router-dom
- react-toastify
- redux-persist
- tailwind-merge
- tailwindcss-animate
- zod

## Developer

This project is developed by Gaurav Sahu.
