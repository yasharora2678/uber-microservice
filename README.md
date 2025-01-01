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

# Captain Service API Documentation

## Register Captain
Creates a new captain account in the system.

### Endpoint
```
POST /captains/register
```

### Request Body Validation Rules
| Field | Validation Rules |
|-------|-----------------|
| fullname.firstname | - Required<br>- Minimum 3 characters<br>- String |
| fullname.lastname | - Optional<br>- Minimum 3 characters if provided<br>- String |
| email | - Required<br>- Valid email format<br>- Minimum 6 characters<br>- Unique in database |
| password | - Required |
| vehicle.color | - Required<br>- Minimum 3 characters |
| vehicle.plate | - Required<br>- Minimum 3 characters |
| vehicle.capacity | - Required<br>- Minimum value: 1<br>- Integer |
| vehicle.type | - Required<br>- Must be one of: ['car', 'motorcycle', 'bicycle'] |

### Request Body
```json
{
    "fullname": {
        "firstname": "string (required, min 3 characters)",
        "lastname": "string (optional, min 3 characters if provided)"
    },
    "email": "string (required, valid email format)",
    "password": "string (required)",
    "vehicle": {
        "color": "string (required, min 3 characters)",
        "plate": "string (required, min 3 characters)",
        "capacity": "number (required, min 1)",
        "type": "string (required, one of: car, motorcycle, bicycle)"
    },
    "location": {
        "lat": "number (optional)",
        "lng": "number (optional)"
    }
}
```

### Response Codes
| Status Code | Description |
|-------------|-------------|
| 201 | Captain successfully created |
| 400 | Bad request - Invalid input data |
| 409 | Conflict - Email already exists |
| 500 | Internal server error |

### Example Request
```json
{
    "fullname": {
        "firstname": "Mike",
        "lastname": "Smith"
    },
    "email": "mike.smith@example.com",
    "password": "securePassword123",
    "vehicle": {
        "color": "black",
        "plate": "ABC123",
        "capacity": 4,
        "type": "car"
    },
    "location": {
        "lat": 40.7128,
        "lng": -74.0060
    }
}
```

### Example Success Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "_id": "65ab12d4e8b91234567890",
        "fullname": {
            "firstname": "Mike",
            "lastname": "Smith"
        },
        "email": "mike.smith@example.com",
        "vehicle": {
            "color": "black",
            "plate": "ABC123",
            "capacity": 4,
            "type": "car"
        },
        "isAvailable": "inactive",
        "location": {
            "lat": 40.7128,
            "lng": -74.0060
        }
    }
}
```

## Login Captain
Authenticates a captain and returns a JWT token.

### Endpoint
```
POST /captains/login
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
    "email": "mike.smith@example.com",
    "password": "securePassword123"
}
```

### Example Success Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "_id": "65ab12d4e8b91234567890",
        "fullname": {
            "firstname": "Mike",
            "lastname": "Smith"
        },
        "email": "mike.smith@example.com",
        "vehicle": {
            "color": "black",
            "plate": "ABC123",
            "capacity": 4,
            "type": "car"
        },
        "isAvailable": "inactive"
    }
}
```

## Get Captain Profile
Retrieves the authenticated captain's profile information.

### Endpoint
```
GET /captains/profile
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
        "firstname": "Mike",
        "lastname": "Smith"
    },
    "email": "mike.smith@example.com",
    "vehicle": {
        "color": "black",
        "plate": "ABC123",
        "capacity": 4,
        "type": "car"
    },
    "isAvailable": "inactive",
    "location": {
        "lat": 40.7128,
        "lng": -74.0060
    }
}
```

## Logout Captain
Logs out the current captain and invalidates their token.

### Endpoint
```
GET /captains/logout
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
