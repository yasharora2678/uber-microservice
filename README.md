# User Service API Documentation

## Register User
Creates a new user account in the system.

### Endpoint
```
POST /users/register
```

### Request Body Validation Rules
| Field | Validation Rules |
|-------|-----------------|
| fullname.firstname | - Required<br>- Minimum 3 characters<br>- String |
| fullname.lastname | - Optional<br>- Minimum 3 characters if provided<br>- String |
| email | - Required<br>- Valid email format<br>- Minimum 6 characters<br>- Unique in database |
| password | - Required<br>- Minimum 6 characters |

### Request Body
```json
{
    "fullname": {
        "firstname": "string (required, min 3 characters)",
        "lastname": "string (optional, min 3 characters if provided)"
    },
    "email": "string (required, valid email format, min 6 characters)",
    "password": "string (required, min 6 characters)"
}
```

### Response Codes
| Status Code | Description |
|-------------|-------------|
| 201 | User successfully created |
| 400 | Bad request - Invalid input data |
| 409 | Conflict - Email already exists |
| 500 | Internal server error |

### Example Request
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

### Example Success Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "65ab12d4e8b91234567890",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

## Login User
Authenticates a user and returns a JWT token.

### Endpoint
```
POST /users/login
```

### Request Body Validation Rules
| Field | Validation Rules |
|-------|-----------------|
| email | - Required<br>- Valid email format |
| password | - Required |

### Request Body
```json
{
    "email": "string (required, valid email format)",
    "password": "string (required)"
}
```

### Response Codes
| Status Code | Description |
|-------------|-------------|
| 200 | Login successful |
| 400 | Bad request - Invalid credentials or missing fields |
| 500 | Internal server error |

### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

### Example Success Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "65ab12d4e8b91234567890",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

## Get User Profile
Retrieves the authenticated user's profile information.

### Endpoint
```
GET /users/profile
```

### Authentication
Requires JWT token in either:
- Cookie: `token`
- Header: `Authorization: Bearer <token>`

### Response Codes
| Status Code | Description |
|-------------|-------------|
| 200 | Profile retrieved successfully |
| 401 | Unauthorized - Invalid or missing token |
| 500 | Internal server error |

### Example Success Response
```json
{
    "_id": "65ab12d4e8b91234567890",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com"
}
```

## Logout User
Logs out the current user and invalidates their token.

### Endpoint
```
GET /users/logout
```

### Authentication
Requires JWT token in either:
- Cookie: `token`
- Header: `Authorization: Bearer <token>`

### Response Codes
| Status Code | Description |
|-------------|-------------|
| 200 | Logout successful |
| 401 | Unauthorized - Invalid or missing token |
| 500 | Internal server error |

### Example Success Response
```json
{
    "message": "Logged out successfully"
}
```
