---
description: Generate comprehensive API documentation from code
agent: docs
---

# API Documentation Generation Prompt

Generate detailed API documentation by analyzing the codebase and extracting API endpoints, parameters, and responses.

## Documentation Scope

Specify what to document:
- [ ] REST API endpoints
- [ ] GraphQL schema
- [ ] gRPC services
- [ ] WebSocket events
- [ ] Public libraries/SDKs
- [ ] CLI commands

## Analysis Phase

1. **Discover API Surface**
   - Find all public endpoints/methods
   - Extract route definitions
   - Identify request/response schemas
   - Locate authentication requirements
   - Find error codes and messages

2. **Extract Details**
   - Parameter types and validation rules
   - Request body schemas
   - Response formats and status codes
   - Headers and authentication
   - Rate limits and pagination
   - Deprecation notices

## Documentation Format

Choose output format:
- **OpenAPI/Swagger** (REST APIs)
- **Markdown** (General documentation)
- **AsyncAPI** (Event-driven APIs)
- **JSDoc/TSDoc** (Code comments)
- **Postman Collection**

## Generated Documentation Structure

### For REST APIs (OpenAPI/Markdown):

```markdown
# [API Name] Documentation

## Overview
[Brief description of the API]

**Base URL:** `https://api.example.com/v1`
**Authentication:** [Bearer Token / API Key / OAuth2]

---

## Endpoints

### GET /users
Retrieve a list of users with optional filtering.

**Authentication Required:** Yes

**Query Parameters:**
| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| page | integer | No | Page number (default: 1) | `?page=2` |
| limit | integer | No | Items per page (default: 10, max: 100) | `?limit=20` |
| role | string | No | Filter by role | `?role=admin` |

**Response:**

**Status: 200 OK**
```json
{
  "data": [
    {
      "id": 123,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "createdAt": "2025-12-23T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

**Status: 401 Unauthorized**
```json
{
  "error": "invalid_token",
  "message": "Authentication token is invalid or expired"
}
```

**Example Request:**
```bash
curl -X GET "https://api.example.com/v1/users?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### POST /users
Create a new user account.

**Authentication Required:** Yes (Admin only)

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "name": "Jane Doe",
  "role": "user",
  "password": "securePassword123"
}
```

**Validation Rules:**
- `email`: Required, valid email format, unique
- `name`: Required, 2-100 characters
- `role`: Optional, one of: "admin", "user", "guest" (default: "user")
- `password`: Required, minimum 8 characters, must include letter and number

**Response:**

**Status: 201 Created**
```json
{
  "id": 124,
  "email": "newuser@example.com",
  "name": "Jane Doe",
  "role": "user",
  "createdAt": "2025-12-23T12:00:00Z"
}
```

**Status: 400 Bad Request**
```json
{
  "error": "validation_error",
  "message": "Email already exists",
  "field": "email"
}
```

**Example Request:**
```bash
curl -X POST "https://api.example.com/v1/users" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "name": "Jane Doe",
    "password": "securePassword123"
  }'
```

---

## Authentication

### Bearer Token
Include your API token in the Authorization header:
```
Authorization: Bearer YOUR_API_TOKEN
```

**Get a token:**
```bash
POST /auth/login
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Token Expiration:** 24 hours
**Refresh Token:** Available at `/auth/refresh`

---

## Error Codes

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | validation_error | Request validation failed |
| 401 | invalid_token | Authentication token is invalid |
| 401 | token_expired | Authentication token has expired |
| 403 | forbidden | Insufficient permissions |
| 404 | not_found | Resource not found |
| 429 | rate_limit_exceeded | Too many requests |
| 500 | internal_error | Server error occurred |

---

## Rate Limiting

- **Rate Limit:** 100 requests per minute per API key
- **Headers:**
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Timestamp when limit resets

---

## Pagination

For list endpoints, use `page` and `limit` query parameters:
- **Default page size:** 10 items
- **Maximum page size:** 100 items
- **Response includes:** `pagination` object with total count and pages

---

## Versioning

Current version: **v1**

Version is specified in the URL path: `/v1/endpoint`

**Deprecation Policy:** Old versions supported for 6 months after new version release.

---

## SDKs & Libraries

- **JavaScript/TypeScript:** `npm install @example/api-client`
- **Python:** `pip install example-api-client`
- **.NET:** `dotnet add package Example.ApiClient`

---

## Support

- **API Status:** https://status.example.com
- **Support Email:** api-support@example.com
- **Discord Community:** https://discord.gg/example
```

## Quality Checks

After generating documentation:
- [ ] All endpoints documented
- [ ] Request/response examples provided
- [ ] Authentication clearly explained
- [ ] Error codes defined
- [ ] Rate limits documented
- [ ] Examples are copy-paste ready
- [ ] Schema definitions complete
- [ ] Validation rules specified

## Additional Outputs

Consider generating:
- OpenAPI/Swagger JSON/YAML file
- Postman collection export
- Code examples in multiple languages
- Interactive API explorer (Swagger UI)
- Changelog for API versions
