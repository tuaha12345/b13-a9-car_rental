# B13 A9 Car Rental

A modern car rental website built with Next.js, React, Tailwind CSS, and MongoDB. This project provides a client-side car rental experience with authentication, car management, booking views, and an attractive responsive interface.

## Live Site URL (Client Side)

https://b13-a9-car-rental.vercel.app


## Features

- User registration and authentication with Better Auth and Google sign-in
- Add new cars and manage listings from the dashboard
- Browse available cars and explore car details
- View personal booking history and manage car reservations, view user profile
- Responsive UI using Hero UI components and Tailwind CSS
- Real-time feedback with `react-toastify` notifications

## Technologies Used

- Next.js 16.2.6
- React 19.2.4
- Tailwind CSS v4
- MongoDB
- Better Auth for authentication
- React Icons for iconography
- React Toastify for toast notifications
- @heroui/react and @heroui/styles for UI components

## Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd b13-a9-car_rental
```

2. Install dependencies

```bash
npm install
```

3. Create environment variables

```bash
copy example.env .env
```

4. Update `.env` with your own values:

- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `MONGODB_URI`
- `GOOGLE_CLIENTID`
- `GOOGLE_SECRET`
- `NEXT_PUBLIC_SERVER_URL`

5. Run the development server

```bash
npm run dev
```

6. Open the app in your browser

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Run the app in development mode
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint checks

## Notes

- Make sure MongoDB is accessible from `MONGODB_URI`
- Ensure Google OAuth credentials are configured if you use Google sign-in
- If you host the frontend and backend separately, update `NEXT_PUBLIC_SERVER_URL` accordingly
