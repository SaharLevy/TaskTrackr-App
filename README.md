# TaskTrackr-App

TaskTrackr-App is a task management application that allows users to create, manage, and track their tasks efficiently. The app provides user authentication, task categorization, and a drag-and-drop interface for marking tasks as completed.

## Live Demo

You can access the deployed version of TaskTrackr-App here: [TaskTrackr-App Live](https://task-trackr-app-frontend.onrender.com)

## Features

- **User Authentication**: Users can register and log in securely using JWT authentication.

- **Task Management**: Users can create, update, and delete tasks.

- **Personalized Tasks**: Tasks are tied to individual users, ensuring privacy.

- **Drag-and-Drop Delete**: Users can delete tasks by dragging them into a designated area.

- **Responsive Design**: Works well on different screen sizes using Bootstrap.

## Tech Stack

### Frontend:

- React with TypeScript
- React Hook Form
- React Router
- Bootstrap
- dnd-kit (for drag-and-drop functionality)

### Backend:

- Node.js with TypeScript
- Express.js
- MongoDB (for user and task storage)
- JWT Authentication

### Deployment:

- Render (for frontend and backend hosting)
- MongoDB database hosted on Atlas

## Setup and Installation

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/TaskTrackr-App.git
   cd TaskTrackr-App
   ```

2. Install dependencies for both frontend and backend:

   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the backend folder and add the necessary environment variables:
     ```env
     MongoConnectionString=
     Port=
     SECRET=
     ```

4. Start the backend server:

   ```sh
   cd backend
   npm start
   ```

5. Start the frontend server:

   ```sh
   cd frontend
   npm start
   ```

## Usage

- Register or log in to your account.
- Create, update, and delete tasks.
- Drag tasks to the designated area to delete.
