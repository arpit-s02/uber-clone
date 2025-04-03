# Backend API documentation

## `/users/register` Endpoint

### Description

Registers a new user

### HTTP Method

`POST`

### Request Body

The request should be in JSON format and include

- `firstName` (string, required): User's first name (min 3 character)
- `lastName` (string, optional): User's last name
- `email` (string, required): User's email address
- `password` (string, required): User's password (min 8 characters)
- `confirmPassword` (string, required): Confirm password

### Example Response

- `user` (object):
  - `id` (number): User id
  - `firstName` (string): User's first name
  - `lastName` (string | null): User's last name
  - `email` (string): User's email address
  - `socketId` (string | null): Socket id
- `token` (string): JWT token
