# Blog API Documentation

## Base URL
```
http://localhost:4000/api
```

## Endpoints

### User Routes

#### 1. User Registration

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

#### 2. User Login

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

#### 3. User Logout

**Endpoint:** `/users/logout`  
**Method:** `POST`  
**Description:** Logout the current user.

**Response:**
```json
{
    "message": "Logout successful."
}
```

#### 4. Get User Profile

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

#### 5. Update User

**Endpoint:** `/users/:id`  
**Method:** `PATCH`  
**Description:** Update the details of an existing user.

**Request Body:**
```json
{
    "name": "John Doe",
    "avatar": "avatar_url_here",
    "bio": "User bio here",
    "password": "newpassword123"
}
```

**Response:**
```json
{
    "message": "Updated user.",
    "user": {
        "_id": "user_id_here",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "avatar": "avatar_url_here",
        "bio": "User bio here",
        "role": "user"
    }
}
```

### Category Routes

#### 1. Create Category

**Endpoint:** `/categories/create`  
**Method:** `POST`  
**Description:** Create a new category.

**Request Body:**
```json
{
    "name": "Technology"
}
```

**Response:**
```json
{
    "message": "Category created successfully.",
    "category": {
        "_id": "category_id_here",
        "name": "Technology"
    }
}
```

#### 2. Get All Categories

**Endpoint:** `/categories/all`  
**Method:** `GET`  
**Description:** Get all categories.

**Response:**
```json
{
    "message": "Fetched categories successfully",
    "categories": [
        {
            "_id": "category_id_here",
            "name": "Technology"
        }
    ]
}
```

#### 3. Update Category

**Endpoint:** `/categories/update/:id`  
**Method:** `PATCH`  
**Description:** Update an existing category.

**Request Body:**
```json
{
    "name": "Tech"
}
```

**Response:**
```json
{
    "message": "Updated category successfully.",
    "category": {
        "_id": "category_id_here",
        "name": "Tech"
    }
}
```

#### 4. Delete Category

**Endpoint:** `/categories/delete/:id`  
**Method:** `DELETE`  
**Description:** Delete an existing category.

**Response:**
```json
{
    "message": "Deleted category successfully."
}
```

### Blog Routes

#### 1. Create Blog

**Endpoint:** `/blogs/create`  
**Method:** `POST`  
**Description:** Create a new blog post.

**Request Body:**
```json
{
    "title": "Blog Title",
    "content": "Blog content here...",
    "image": "image_url_here",
    "category": "category_id_here",
    "author": "author_id_here"
}
```

**Response:**
```json
{
    "message": "Blog created successfully.",
    "blog": {
        "_id": "blog_id_here",
        "title": "Blog Title",
        "content": "Blog content here...",
        "image": "image_url_here",
        "category": "category_id_here",
        "author": "author_id_here"
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