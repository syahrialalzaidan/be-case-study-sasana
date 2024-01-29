# API Documentation

This documentation provides an overview of the available API endpoints for user authentication and management.

## Table of Contents

- [Forgot Password](#forgot-password)
- [New Password](#new-password)
- [Login](#login)
- [Login Verification](#login-verification)
- [Signup](#signup)
- [Signup Verification](#signup-verification)
- [NextAuth](#nextauth)
- [Creator](#creator)

## Forgot Password

### Change Forgot Password Token (PATCH)

`/api/forgotpassword`

This endpoint is used to change the forgot password token of a user.

## New Password

### Change Password (PATCH)

`/api/forgotpassword/new`

This endpoint is used to change the password of a user.

## Login

### Change Login OTP (PATCH)

`/api/login`

This endpoint is used to change the login OTP of a user.

## Login Verification

### Nullify Login OTP (PATCH)

`/api/login/verification`

This endpoint is used to nullify the login OTP if the login is successful.

## Signup

### Create New User (POST)

`/api/signup`

This endpoint is used to create a new user.

## Signup Verification

### Change User's Verified Status After Signup (PATCH)

`/api/signup/verification`

This endpoint is used to change a user's verified status after signup.

## NextAuth

### NextAuth Needs

`/api/auth/[...nextauth]`

This endpoint is for NextAuth requirements.

## Creator

- Creator: Mochamad Syahrial Alzaidan
