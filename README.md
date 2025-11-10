# AEstruct Web Application

A Next.js web application for AEstruct, a consultancy specializing in AI tools and Claude Skills for the media & entertainment industry.

## Tech Stack

- **Frontend**: Next.js 16+ (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with custom AEstruct brand colors
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Phase 2)
- **Payments**: Stripe (Phase 2)
- **Email**: Resend/SendGrid (Phase 2)

## Project Structure

```
aestruct-app/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   │   └── contact/       # Contact form submission
│   ├── blog/              # Blog listing page
│   ├── contact/           # Contact page with form
│   ├── tools/             # Claude Skills showcase
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with Tailwind
├── components/
│   ├── layout/            # Layout components
│   │   ├── Header.tsx     # Navigation header
│   │   └── Footer.tsx     # Site footer
│   └── ui/                # Reusable UI components
├── lib/
│   ├── prisma.ts          # Prisma client singleton
│   └── utils.ts           # Utility functions
├── prisma/
│   └── schema.prisma      # Database schema
└── public/                # Static assets

```

## Database Schema

The application includes the following database tables:

- **users**: User accounts with authentication
- **products**: Claude Skills and services
- **orders**: Purchase records with Stripe integration
- **success_metrics**: Editable homepage metrics
- **blog_posts**: Blog content management
- **contact_submissions**: Contact form submissions

## Brand Colors

- **Primary**: Deep cobalt blue (#1B4D89)
- **Accent**: Burnt orange (#D97228)
- **Highlight**: Yellow (#F2C94C)
- **Font**: Aptos (with fallback to system sans-serif)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL connection string

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment to Replit

This application is designed to be deployed on Replit:

1. Import the repository to Replit
2. Replit will auto-detect the Next.js project
3. Configure PostgreSQL using Replit's native database support
4. Set environment variables in Replit Secrets
5. Run the application

## Development Phases

### Phase 1 (MVP - Current)
- ✅ Core marketing pages (Home, About, Tools, Blog, Contact)
- ✅ Database schema and Prisma ORM setup
- ✅ Basic UI with brand styling
- ✅ Contact form with database storage
- 🔄 CMS for content management

### Phase 2 (E-commerce)
- ⬜ User authentication with NextAuth.js
- ⬜ Stripe payment integration
- ⬜ Digital product delivery system
- ⬜ Email notifications
- ⬜ User dashboard

## License

Private - All rights reserved
