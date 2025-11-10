# Blog & CMS Implementation Guide

## Overview

This document describes the Phase 1 MVP implementation of the Blog functionality with a lightweight CMS for the AEstruct application.

## Features Implemented

### 1. Blog Listing Page (`/blog`)

- **Location**: `app/blog/page.tsx`
- **Component**: `components/blog/BlogList.tsx`
- **Features**:
  - Grid layout displaying all published blog posts
  - Card view with:
    - Featured image (optional)
    - Title
    - Excerpt (first 150 characters)
    - Publication date
    - Author name
    - "Read More" link
  - Pagination (10 posts per page)
  - Automatic sorting (newest first)
  - Responsive design (mobile, tablet, desktop)

### 2. Individual Blog Post Page (`/blog/[slug]`)

- **Location**: `app/blog/[slug]/page.tsx`
- **Components**:
  - `components/blog/MarkdownContent.tsx` - Renders markdown with syntax highlighting
  - `components/blog/SocialShare.tsx` - Social sharing buttons
- **Features**:
  - Full post display with markdown rendering
  - Rich text formatting support
  - Code syntax highlighting (using highlight.js with GitHub Dark theme)
  - Featured image display
  - Author information section with avatar
  - Social sharing buttons (LinkedIn, Twitter/X)
  - "Back to Blog" navigation
  - Publication date display

### 3. Blog CMS Admin Interface (`/admin/blog`)

- **Main Page**: `app/admin/blog/page.tsx`
- **New Post**: `app/admin/blog/new/page.tsx`
- **Edit Post**: `app/admin/blog/edit/[id]/page.tsx`
- **Components**:
  - `components/admin/AdminAuth.tsx` - Simple password authentication
  - `components/admin/BlogPostForm.tsx` - Reusable form for creating/editing posts

#### Features:

- **List View**:
  - Display all blog posts (published, draft, archived)
  - Filter by status
  - Table view with columns: Title, Author, Status, Date, Actions
  - Edit and Delete actions
  - Status badges with color coding

- **Create/Edit Interface**:
  - Title input
  - Slug (auto-generated from title, editable)
  - Excerpt field (optional)
  - Featured image URL input
  - Content editor (markdown textarea with monospace font)
  - Author field (default: "Emil")
  - Status dropdown (draft/published/archived)
  - Publication date (auto-set when publishing)
  - Save as Draft / Publish buttons
  - Autosave draft functionality (localStorage backup every 2 seconds)
  - Restore autosaved content on page load

- **Authentication**:
  - Simple password protection for all `/admin` routes
  - Password stored in localStorage for session persistence
  - Configurable via `ADMIN_PASSWORD` environment variable
  - Default password: `admin123`
  - Logout functionality

## Database Schema

### BlogPost Model

```prisma
model BlogPost {
  id            String    @id @default(cuid())
  title         String
  slug          String    @unique
  content       String    @db.Text
  excerpt       String?   @db.Text
  featuredImage String?   @map("featured_image")
  author        String    @default("Emil")
  publishedDate DateTime? @map("published_date")
  status        String    @default("draft")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  @@map("blog_posts")
}
```

## API Routes

### Public Routes

#### `GET /api/blog`
- Fetch all published blog posts
- Query params:
  - `page` (default: 1)
  - `limit` (default: 10)
- Returns: `{ posts: [], pagination: { page, limit, totalCount, totalPages } }`

#### `GET /api/blog/[slug]`
- Fetch a single published blog post by slug
- Returns: Blog post object or 404

### Admin Routes (Requires Authentication)

All admin routes require `Authorization: Bearer <password>` header.

#### `GET /api/admin/blog`
- List all blog posts (including drafts)
- Query params:
  - `status` (optional): filter by status
- Returns: Array of blog posts

#### `POST /api/admin/blog`
- Create a new blog post
- Body: `{ title, content, excerpt?, featuredImage?, author?, status?, slug? }`
- Returns: Created blog post

#### `GET /api/admin/blog/[id]`
- Get a single blog post by ID (for editing)
- Returns: Blog post object

#### `PUT /api/admin/blog/[id]`
- Update a blog post
- Body: `{ title?, content?, excerpt?, featuredImage?, author?, status?, slug? }`
- Returns: Updated blog post

#### `DELETE /api/admin/blog/[id]`
- Delete a blog post
- Returns: `{ success: true }`

## Utility Functions

### `lib/slugify.ts`
- `slugify(text)`: Convert text to URL-friendly slug
- `generateUniqueSlug(baseSlug, existingSlugs)`: Ensure slug uniqueness

### `lib/auth.ts`
- `checkAdminAuth(request)`: Verify admin authentication
- `createUnauthorizedResponse()`: Return 401 response

### `lib/prisma.ts`
- Prisma client singleton

## Dependencies Added

```json
{
  "react-markdown": "^9.0.0",
  "rehype-highlight": "^7.0.0",
  "rehype-raw": "^7.0.0",
  "remark-gfm": "^4.0.0"
}
```

## Environment Variables

Add these to your `.env` file:

```bash
# Admin password for CMS access
ADMIN_PASSWORD="admin123"

# Base URL for the application (for blog post fetching)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## Setup Instructions

### 1. Configure Database

Update your `.env` file with a valid PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
```

### 2. Run Prisma Migration

```bash
npx prisma migrate dev --name add_blog_fields
```

This will:
- Create the `blog_posts` table with all fields
- Generate the Prisma client

### 3. (Optional) Seed Sample Data

Create a file `prisma/seed-blog.ts` to add sample blog posts, or create them through the admin interface.

### 4. Start Development Server

```bash
npm run dev
```

### 5. Access the Application

- **Blog**: http://localhost:3000/blog
- **Admin CMS**: http://localhost:3000/admin/blog
  - Default password: `admin123` (or value from `ADMIN_PASSWORD` env var)

## Usage Guide

### Creating a Blog Post

1. Navigate to `/admin/blog`
2. Log in with admin password
3. Click "Create New Post"
4. Fill in the form:
   - Title (required)
   - Slug (auto-generated, can be edited)
   - Excerpt (optional, auto-generated from content if empty)
   - Featured Image URL (optional)
   - Content in Markdown (required)
   - Author (defaults to "Emil")
   - Status (draft/published)
5. Click "Save as Draft" or "Publish"

### Editing a Blog Post

1. Navigate to `/admin/blog`
2. Click "Edit" on any post
3. Modify the fields
4. Click "Save as Draft" or "Publish"

### Markdown Features

The content editor supports:
- **Headings**: `# H1`, `## H2`, etc.
- **Bold**: `**bold**`
- **Italic**: `*italic*`
- **Links**: `[text](url)`
- **Images**: `![alt](url)`
- **Code blocks**: ` ```language ... ``` `
- **Inline code**: `` `code` ``
- **Lists**: `- item` or `1. item`
- **Tables**: GitHub-flavored markdown tables
- **Blockquotes**: `> quote`

### Code Syntax Highlighting

Code blocks automatically get syntax highlighting:

```markdown
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`
```

Supported languages include: JavaScript, TypeScript, Python, Java, C++, and many more.

### Autosave Feature

- Drafts are automatically saved to browser localStorage every 2 seconds
- When returning to an editing page, you'll be prompted to restore unsaved changes
- Autosave is cleared when a post is successfully saved or published

### Social Sharing

Each blog post includes sharing buttons for:
- **LinkedIn**: Share on LinkedIn
- **Twitter/X**: Share on Twitter/X

The share URL and title are automatically populated from the post data.

## Security Notes

### Phase 1 (Current)

- Simple password authentication using Bearer tokens
- Password stored in localStorage (client-side)
- Not suitable for production with sensitive data
- Suitable for single-user MVP

### Phase 2 (Future Enhancement)

Will be replaced with:
- NextAuth.js authentication
- User roles and permissions
- Session management
- OAuth providers (Google, GitHub, etc.)
- Proper server-side session handling

## Customization

### Changing the Admin Password

Update the `.env` file:

```bash
ADMIN_PASSWORD="your-secure-password"
```

### Changing Pagination Limit

In `components/blog/BlogList.tsx`, modify:

```typescript
const response = await fetch(`/api/blog?page=${page}&limit=10`);
```

### Customizing Author Bio

Edit the author section in `app/blog/[slug]/page.tsx`:

```tsx
<p className="text-gray-600 mt-2">
  Your custom author bio here
</p>
```

### Styling

The blog uses Tailwind CSS classes. Colors are defined in `tailwind.config.ts`:
- `primary`: Main brand color
- `secondary`: Accent color

Update these in your Tailwind config to match your brand.

### Syntax Highlighting Theme

The code blocks use `highlight.js` with the GitHub Dark theme. To change:

1. Import a different theme in `components/blog/MarkdownContent.tsx`:

```typescript
import "highlight.js/styles/github.css"; // or any other theme
```

Available themes: https://highlightjs.org/static/demo/

## File Structure

```
app/
├── blog/
│   ├── page.tsx                 # Blog listing page
│   └── [slug]/
│       └── page.tsx             # Individual blog post
├── admin/
│   └── blog/
│       ├── page.tsx             # Admin blog list
│       ├── new/
│       │   └── page.tsx         # Create new post
│       └── edit/
│           └── [id]/
│               └── page.tsx     # Edit existing post
└── api/
    ├── blog/
    │   ├── route.ts             # GET all published posts
    │   └── [slug]/
    │       └── route.ts         # GET post by slug
    └── admin/
        └── blog/
            ├── route.ts         # GET all posts, POST new post
            └── [id]/
                └── route.ts     # GET, PUT, DELETE by ID

components/
├── blog/
│   ├── BlogList.tsx             # Blog listing component
│   ├── MarkdownContent.tsx      # Markdown renderer
│   └── SocialShare.tsx          # Social sharing buttons
└── admin/
    ├── AdminAuth.tsx            # Authentication wrapper
    └── BlogPostForm.tsx         # Blog post form (create/edit)

lib/
├── prisma.ts                    # Prisma client
├── auth.ts                      # Admin auth helpers
└── slugify.ts                   # Slug generation utilities

prisma/
└── schema.prisma                # Database schema
```

## Troubleshooting

### Database Connection Error

If you see `P1013: The provided database string is invalid`:
- Check your `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Verify the connection string format

### Posts Not Showing on Blog Page

Check that:
- Posts have `status: "published"`
- Posts have `publishedDate` set (or will be set automatically when publishing)
- `publishedDate` is not in the future

### 401 Unauthorized in Admin

- Clear localStorage and log in again
- Check that `ADMIN_PASSWORD` matches in `.env` and admin login
- Verify the password is being sent in API requests

### Autosave Not Working

- Check browser console for errors
- Ensure localStorage is enabled in your browser
- Try clearing localStorage: `localStorage.clear()`

## Next Steps (Phase 2)

Future enhancements to consider:

1. **Authentication**:
   - Implement NextAuth.js
   - Add user roles (admin, editor, viewer)
   - Multi-user support

2. **Blog Features**:
   - Categories and tags
   - Search functionality
   - Related posts
   - Comments system
   - RSS feed
   - SEO optimization (meta tags, OpenGraph)

3. **CMS Enhancements**:
   - Rich text WYSIWYG editor
   - Image upload and management
   - Draft preview
   - Scheduled publishing
   - Post analytics
   - Bulk actions

4. **Performance**:
   - Static site generation (SSG)
   - Image optimization with Next.js Image
   - CDN integration

## Support

For issues or questions:
- Check this documentation
- Review the code comments
- Check the Next.js and Prisma documentation
- Review the console for error messages
