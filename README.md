# Simple Social Media API in Mongoose

## Description
---
This api assignment builds a sample backend for a social network application. With it, users can share their thoughts, react to their friend's thoughts, and create a friend list. It's built using the Mongoose ODM (Object-Document Mapping) and Express.js framework for routing, providing a solid foundation for creating and interacting with user-generated content.
## Languages and Technologies
JavaScript, MongoDB, Mongoose, Node.js, Express.js

## Table of Contents
---
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Walkthrough Video](#walkthrough-video)
    

## Installation
---
- Clone git repository
- Type `npm i` or  `npm install` in terminal to install necessary dependencies.

## Usage
---
- Type `npm run start` or `npm run dev` to run the server.
- To use this API, it can be meshed with a social media front-end in development or Postman can be used to test routes and manipulate the database. A walkthrough is provided showing routes users and thoughts.
- You can find the routes below if you would rather test them yourself!

<details id="api-endpoints">
<summary> <b>API Endpoints </b></summary>
Users:

- GET http://localhost:3001/api/users Get a list of all users.
- GET http://localhost:3001/api/users/:id Get a single user by ID.
- POST http://localhost:3001/api/users Create a new user.
- PUT http://localhost:3001/api/users/:id Update user information.
- DELETE http://localhost:3001/api/users/:id Delete a user account.

Friendships:

- POST http://localhost:3001/api/users/:userId/friends/:friendId Add a friend.
- DELETE http://localhost:3001/api/users/:userId/friends/:friendId Remove a friend.

Thoughts:

- GET http://localhost:3001/api/thoughts Get a list of all thoughts.
- GET http://localhost:3001/api/thoughts/:id Get a single thought by ID.
- POST http://localhost:3001/api/thoughts Post a new thought.
- PUT http://localhost:3001/api/thoughts/:id Update a thought.
- DELETE http://localhost:3001/api/thoughts/:id Delete a thought.

Reactions:

- POST http://localhost:3001/api/thoughts/:thoughtId/reactions Add a reaction to a thought.
- DELETE http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId Delete a reaction from a thought.

</details>


## Walkthrough Video
---
[Video Walkthrough](https://drive.google.com/file/d/1G2hmPIxVBK_7mCZXRlkF3vsEutzJWj3t/view)

I apologize for the run-time of this walkthrough, there were many routes to test and I wanted to show all of them.
