# Blog API Documentation

## Base URL
```
http://localhost:4000/api
```

## Endpoints

### 1. User Registration

**Endpoint:** `/users/signup`  
**Method:** `POST`  
**Description:** Register a new user.

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```

**Response:**
```json
{
    "token": "jwt_token_here",
    "user": {
        "_id": "user_id_here",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "avatar": "",
        "bio": "",
        "role": "user"
    },
    "message": "Registration successful."
}
```

### 2. User Login

**Endpoint:** `/users/login`  
**Method:** `POST`  
**Description:** Login an existing user.

**Request Body:**
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

**Response:**
```json
{
    "token": "jwt_token_here",
    "user": {
        "_id": "user_id_here",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "avatar": "",
        "bio": "",
        "role": "user"
    },
    "message": "Login successful."
}
```

### 3. User Logout

**Endpoint:** `/users/logout`  
**Method:** `POST`  
**Description:** Logout the current user.

**Response:**
```json
{
    "message": "Logout successful."
}
```

### 4. Get User Profile

**Endpoint:** `/users/profile`  
**Method:** `POST`  
**Description:** Get the profile of the logged-in user.

**Response:**
```json
{
    "user": {
        "_id": "user_id_here",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "avatar": "",
        "bio": "",
        "role": "user"
    }
}
```

## Error Responses

### Validation Errors
**Status Code:** `400 Bad Request`  
**Response:**
```json
{
    "errors": [
        {
            "msg": "Error message here",
            "param": "field_name",
            "location": "body"
        }
    ]
}
```

### User Already Exists
**Status Code:** `409 Conflict`  
**Response:**
```json
{
    "message": "User already exists."
}
```

### Invalid Email or Password
**Status Code:** `404 Not Found` or `400 Bad Request`  
**Response:**
```json
{
    "message": "Invalid email or password."
}
```

### Unauthorized
**Status Code:** `401 Unauthorized`  
**Response:**
```json
{
    "message": "Unauthorized."
}
```