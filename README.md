# Pratibha Public School Basna - Official Website

A complete, production-ready, full-stack school website with React frontend, Node.js/Express backend, MongoDB database, and a comprehensive admin panel.

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router, Swiper.js, AOS
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Cloudinary, Nodemailer
**Admin Panel:** React-based dashboard with full CRUD operations

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

3. Configure environment variables:
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. Seed the admin user:
   ```bash
   cd server
   npm run seed
   ```

5. Start the backend:
   ```bash
   cd server
   npm run dev
   ```

6. Start the frontend:
   ```bash
   cd client
   npm run dev
   ```

7. Open http://localhost:5173 for the website
8. Open http://localhost:5173/admin for the admin panel

## Default Admin Credentials
- Email: admin@ppsbasna.com
- Password: PPS@admin2025

## Deployment

- Frontend: Vercel / Netlify
- Backend: Render / Railway
- Database: MongoDB Atlas
- Images: Cloudinary

## Features

- 20+ homepage sections
- 10+ content pages
- Full admin panel with CRUD
- Responsive design
- Dark mode
- Multi-language support
- SEO optimized
- PWA ready
- And much more...

## License

© 2025 Pratibha Public School Basna. All Rights Reserved.
