# ShopNest

ShopNest is a full-stack e-commerce application with a React + Vite frontend and an Express + MongoDB backend. It includes customer shopping flows, authentication, cart and checkout handling, order management, admin tools, analytics, cloud image uploads, and payment integration.

## Live Demo

[https://shopnest-3fgq.onrender.com/]

Seeded login credentials:

- For Admin: `admin@shopnest.com` / `123456`
- For User 1: `john@example.com` / `123456`
- For User 2: `jane@example.com` / `123456`

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, React Router
- Backend: Node.js, Express, MongoDB, Mongoose
- Integrations: Cloudinary, Razorpay, Nodemailer, JWT

## Features

- User registration and login
- Product browsing and product detail pages
- Cart and checkout flow
- Order creation and order history
- Admin dashboard for product, user, and order management
- Sales and analytics views
- Image upload support through Cloudinary
- Payment processing through Razorpay

## Project Structure

- `backend/` - API server, models, controllers, middleware, and utilities
- `Frontend/` - Vite React client, pages, components, Redux store, and styles
- `package.json` - root scripts for running the full app

## Prerequisites

- Node.js 18 or newer
- MongoDB database
- Cloudinary account
- Razorpay account
- Email account for SMTP sending

## Setup

1. Install dependencies from the project root:

   ```bash
   npm run install-all
   ```

2. Create a `.env` file inside `backend/` with the required values:

   ```env
   Mongo_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password_or_app_password
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   ```

3. Start the development servers:

   ```bash
   npm run dev
   ```

## Seed Data

The backend seed script clears the existing `users`, `products`, and `orders` collections, then inserts demo data for:

- 1 admin account
- 2 customer accounts
- 4 sample products
- 2 sample orders

Run the seed script from the project root or from `backend/`:

```bash
npm run seed
```


## Scripts

From the project root:

- `npm run dev` - start backend and frontend together
- `npm run start` - start the backend server
- `npm run build` - build the frontend for production
- `npm run seed` - run the backend seed script
- `npm run install-all` - install root, backend, and frontend dependencies

From `backend/`:

- `npm start` - run the API server
- `npm run dev` - run the API server with Nodemon
- `npm run seed` - seed the database

From `Frontend/`:

- `npm run dev` - start the Vite dev server
- `npm run build` - create a production build
- `npm run lint` - run ESLint

## Production Notes

The backend serves the compiled frontend when `NODE_ENV=production`. Build the frontend before deploying the backend so it can serve the `Frontend/dist` output.

## License

ISC