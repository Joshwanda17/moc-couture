# MoC Couture

<div align="center">
  <h3>A Digital Fashion Boutique</h3>
  <p>Showcasing handcrafted crochet and fabric designs through curated collections, storytelling, and a premium shopping experience.</p>
</div>

---

## Brand Philosophy

MoC Couture is more than an e-commerce platform; it is a digital fashion house. Our platform is designed to echo the meticulous craftsmanship of our physical pieces. We prioritize visual storytelling, editorial aesthetics, and an effortless user experience. Every interaction is tailored to reflect the luxury and care woven into our garments.

## Platform Architecture

The MoC Couture platform operates on a scalable, modern **Monorepo** architecture, cleanly separating the customer-facing boutique from our core API and data services.

### ✦ The Frontend (Client Application)
A visually rich, highly responsive storefront and administrative portal built for performance and elegance.
- **Framework**: React 18 & TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS & Custom CSS variables for a refined, editorial aesthetic
- **UI Components**: Radix UI / shadcn-ui

### ✦ The Backend (API & Data)
A robust, lightweight RESTful API server handling product catalogs, collections, and editorial media.
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (Local development and prototyping)

---

## Features & Ecosystem

### The Customer Experience
- **Editorial Lookbook**: A masonry-grid layout emphasizing high-quality styling and photography.
- **Curated Collections**: Seasonal and thematic groupings that guide the narrative of our designs.
- **The Shop**: A comprehensive, filterable catalog of all available pieces.
- **Brand Storytelling**: Immersive 'About' and 'Contact' portals for wholesale, bespoke commissions, and customer care.

### The Administrative House
A secure, multi-tab administrative dashboard designed for seamless brand management:
- **Product Management**: Complete control over inventory, pricing, and categorizations.
- **Collection Curation**: Create and define seasonal themes, uploading editorial cover imagery, and assigning specific garments.
- **Media Archiving**: Manage the visual assets driving the Lookbook.
- **Boutique Settings**: Toggle store visibility and manage core brand contact configurations.

---

## Development Guide

### Prerequisites
Ensure your local development environment meets the following requirements:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Joshwanda17/moc-couture.git
   cd moc-couture
   ```

2. **Install all dependencies**
   Our monorepo utilizes a single command to install dependencies across both the frontend and backend architectures:
   ```bash
   npm run install:all
   ```

### Running the Platform

To launch the full stack (Frontend Client and Backend API) simultaneously from the root directory:

```bash
npm run dev
```

This command provisions:
- The **Client Server** on `http://localhost:8080` (or the next available port).
- The **API Server** on `http://localhost:5000`.

*Note: Upon initial backend startup, the SQLite database (`backend/database.sqlite`) is automatically provisioned with the required schema tables.*

### Granular Execution
Should you need to isolate environments for specific development tasks:
- **Frontend Isolation**: `cd frontend && npm run dev`
- **Backend Isolation**: `cd backend && npm run dev`

---

## Database Schema Overview
The current iteration leverages SQLite for rapid, persistent prototyping. The schema includes:
- `products`: Core catalog items (pricing, status, description, featured flags).
- `collections`: Thematic groupings (season, editorial cover, philosophy).
- `media`: Independent visual assets utilized in the Lookbook.

---

<div align="center">
  <p>© 2026 MoC Couture. All rights reserved.</p>
  <p><i>Crafted with precision. Designed for the bold.</i></p>
</div>
