# TempSupe

TempSupe is a full-stack MERN application inspired by superhero service platforms. Users can browse superhero profiles, leave reviews, request superhero support, and view service requests submitted by the community.

## Features

* User sign-up, sign-in, and JWT authentication
* Browse **The Seven** and legacy **Payback** heroes
* Individual hero profiles with powers, biographies, achievements, themed styling, and media
* Create, edit, and delete hero reviews
* Submit superhero service requests
* Dashboard showing the logged-in user's requests
* Edit and delete your own service requests
* View service requests submitted by all users
* Loading animations and responsive styling

## Technologies Used

**Frontend**

* React
* React Router
* CSS

**Backend**

* Node.js
* Express
* MongoDB
* Mongoose
* JWT

## Installation

Clone the repository and install the dependencies for both the frontend and backend:

```bash
npm install
```

Create a `.env` file in the frontend:

```env
VITE_BACK_END_SERVER_URL=http://localhost:3000
```

Add the required backend environment variables for MongoDB and JWT authentication.

Start the backend and frontend:

```bash
npm run dev
```

## Main Data Models

* **User**: authenticated application users
* **Hero**: superhero information with embedded reviews
* **ServiceRequest**: requests submitted by users for superhero assistance

## Future Improvements

* Community discussion forum
* Additional hero media and animations
* More superhero generations and profiles
* Further UI and responsive improvements

## Contributors

TempSupe was developed as a collaborative MERN stack project.
