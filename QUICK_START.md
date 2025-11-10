# AEstruct - Quick Start Guide

## 🚀 Getting Started (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Database
Make sure your `.env` file has the correct `DATABASE_URL`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/aestruct"
```

### Step 3: Run Database Migrations
```bash
# Create database tables
npx prisma migrate dev --name add_contact_fields

# Generate Prisma Client
npx prisma generate
```

### Step 4: Seed Sample Data
```bash
# Populates 4 success metrics and 7 sample tools
npm run db:seed
```

### Step 5: Start Development Server
```bash
npm run dev
```

### Step 6: Visit Your Site
Open your browser to: **http://localhost:3000**

---

## 📄 Pages Available

| Page | URL | Description |
|------|-----|-------------|
| **Home** | `/` | Hero, metrics, value props, testimonials, CTA |
| **About** | `/about` | Bio, 30-year timeline, differentiators, target market |
| **Tools** | `/tools` | 7 Claude Skills with details and pricing |
| **Contact** | `/contact` | Enhanced contact form with validation |
| **Admin - Metrics** | `/admin/metrics` | Manage success metrics |
| **Admin - Tools** | `/admin/tools` | Manage Claude Skills |

---

## 🔧 Admin Interfaces

### Manage Success Metrics
1. Visit: http://localhost:3000/admin/metrics
2. Click "Add New Metric"
3. Fill in:
   - Metric Name (e.g., "Time Savings")
   - Metric Value (e.g., "20-40%")
   - Display Order (e.g., 1, 2, 3...)
4. Click "Create Metric"

**Note:** Changes appear immediately on the home page!

### Manage Tools
1. Visit: http://localhost:3000/admin/tools
2. Click "Add New Tool"
3. Fill in:
   - Tool Name
   - Price
   - Type (Skill/Consulting/Template)
   - Description (use line breaks, add bullet points with -)
   - Optional: Skill File URL, Prompt Content
4. Click "Create Tool"

**Note:** Changes appear immediately on the tools page!

---

## 📝 Sample Data Included

### Success Metrics (4)
1. ROI: 800-1500%
2. Time Savings: 20-40%
3. Production-Ready Tools: 7
4. Industry Experience: 30+ years

### Tools (7 Claude Skills)
1. **Script Analysis Pro** - $299.99
2. **Rights & Clearance Assistant Pro** - $399.99
3. **Budget Forecasting Pro** - $499.99
4. **Call Sheet Generator** - $199.99
5. **Production Report Automator** - $249.99
6. **Location Scout Intelligence** - $349.99
7. **Crew Scheduler Pro** - $279.99

---

## ✅ Quick Testing Checklist

### Home Page
- [ ] Hero section displays
- [ ] Success metrics show with animated counters
- [ ] Value proposition section (3 columns)
- [ ] Testimonials section
- [ ] Final CTA section

### About Page
- [ ] Bio with logo placeholder
- [ ] Timeline with 4 eras (1990s, 2000s, 2010s, 2020s)
- [ ] 6 differentiator cards
- [ ] Target market section

### Tools Page
- [ ] 7 tools display in grid
- [ ] Click "Learn More" opens modal
- [ ] Modal shows full details
- [ ] "Coming Soon" badge visible
- [ ] Price displays correctly

### Contact Page
- [ ] All 5 fields display
- [ ] Email validation works
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Form clears after submit

### Mobile Responsive
- [ ] Test at 375px (mobile)
- [ ] Test at 768px (tablet)
- [ ] Test at 1024px+ (desktop)

---

## 🎨 Customization Guide

### Update Brand Colors
Edit: `tailwind.config.ts`
```typescript
colors: {
  primary: {
    DEFAULT: "#1B4D89",  // Deep cobalt blue
    dark: "#153A6A",
    light: "#2461A7",
  },
  accent: {
    DEFAULT: "#D97228",  // Burnt orange
    dark: "#B85E20",
    light: "#E68A45",
  },
}
```

### Update About Page Content
Edit files in: `components/about/`
- `BioSection.tsx` - Company bio and story
- `TimelineSection.tsx` - Update timeline eras and descriptions
- `DifferentiatorsSection.tsx` - Update differentiator text
- `TargetMarketSection.tsx` - Update target market messaging

### Update Tool Descriptions
Option 1: Via Admin Interface
- Visit `/admin/tools`
- Click "Edit" on any tool
- Update description

Option 2: Via Database Seed
- Edit `prisma/seed.ts`
- Re-run `npm run db:seed`

### Update Contact Information
Edit: `app/contact/page.tsx`
- Lines 136-148: Update email, LinkedIn, response time

---

## 🐛 Troubleshooting

### Database Connection Error
**Error:** `Can't reach database server`
**Fix:**
1. Make sure PostgreSQL is running
2. Check `.env` has correct `DATABASE_URL`
3. Create database: `createdb aestruct`

### Prisma Client Not Generated
**Error:** `Cannot find module '@prisma/client'`
**Fix:**
```bash
npx prisma generate
```

### Seed Fails
**Error:** Unique constraint or foreign key error
**Fix:**
```bash
# Clear database and re-seed
npx prisma migrate reset
npm run db:seed
```

### Tools/Metrics Not Showing
**Issue:** Pages show "No items found"
**Fix:**
1. Check database has data: `npx prisma studio`
2. Re-run seed: `npm run db:seed`
3. Check browser console for API errors

### Admin Changes Not Appearing
**Issue:** Edit/create works but doesn't show
**Fix:**
1. Refresh the page (hard refresh: Cmd+Shift+R)
2. Check browser console for errors
3. Verify API route is working

---

## 📁 Project Structure

```
aestruct-app/
├── app/
│   ├── page.tsx                 # Home page
│   ├── about/page.tsx           # About page
│   ├── tools/page.tsx           # Tools page
│   ├── contact/page.tsx         # Contact page
│   ├── admin/
│   │   ├── metrics/page.tsx     # Admin: Metrics
│   │   └── tools/page.tsx       # Admin: Tools
│   └── api/
│       ├── metrics/route.ts     # GET metrics
│       ├── tools/route.ts       # GET tools
│       ├── contact/route.ts     # POST contact
│       └── admin/
│           ├── metrics/route.ts # CRUD metrics
│           └── tools/route.ts   # CRUD tools
├── components/
│   ├── home/                    # Home page components
│   ├── about/                   # About page components
│   ├── tools/                   # Tools page components
│   └── layout/                  # Header, Footer
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Sample data
└── lib/
    └── prisma.ts                # Prisma client singleton
```

---

## 🚦 Next Steps

### Immediate (Phase 1 Complete)
1. ✅ Run migrations and seed
2. ✅ Test all pages
3. ✅ Customize content
4. ✅ Update contact information
5. ✅ Replace logo placeholder

### Phase 2 (E-commerce & Auth)
1. Add NextAuth.js authentication
2. Protect admin routes
3. Integrate Stripe payments
4. Implement purchase/download flow
5. Add email notifications (Resend/SendGrid)

### Phase 3 (Advanced Features)
1. Blog functionality
2. User dashboard
3. Analytics integration
4. SEO optimization
5. Performance monitoring

---

## 📞 Support

For questions or issues:
1. Check `PAGES_IMPLEMENTATION.md` for detailed documentation
2. Check `HOME_PAGE_IMPLEMENTATION.md` for home page details
3. Review `NEXT_STEPS.md` for general project info

---

## 🎉 You're All Set!

Your AEstruct MVP is ready to go. All four pages (Home, About, Tools, Contact) are fully functional with:
- ✅ Database integration
- ✅ Admin interfaces
- ✅ Responsive design
- ✅ Professional animations
- ✅ Form validation
- ✅ Sample data

**Happy coding!** 🚀
