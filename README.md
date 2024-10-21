# Task Manager API

## Overview

This is a simple Task Management API built using **Node.js** and **PostgreSQL**. The API allows users to register, log in, and manage their tasks. Users can create, read, update, and delete tasks. Additionally, users can filter tasks by due date and mark tasks as completed. The API uses JWT (JSON Web Token) for user authentication and authorization.

## Features

- **User Registration**: Allows users to sign up with their email and password.
- **User Authentication**: Secures routes using JWT tokens.
- **Task Management**:
  - Create, update, delete, and retrieve tasks.
  - Assign due dates and filter tasks based on dates.
  - Mark tasks as completed.
- **Database**: The API uses PostgreSQL as the database.

## Technologies Used

- **Node.js**: Backend framework for building the API.
- **Express.js**: Web framework for handling HTTP requests.
- **PostgreSQL**: Relational database for storing user and task information.
- **pg**: PostgreSQL client for Node.js.
- **JWT**: JSON Web Tokens for user authentication and authorization.
- **dotenv**: For environment variable management.

## Getting Started

### Prerequisites

- **Node.js** installed on your local machine.
- **PostgreSQL** database set up.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ekefrancisokechukwu/task-manager-pg
   cd task-manager-pg
   ```
