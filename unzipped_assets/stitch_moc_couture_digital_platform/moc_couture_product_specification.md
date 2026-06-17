# MoC Couture: Product Design Specification
This document serves as the foundational blueprint for MoC Couture, strictly defining the purpose, users, and structure of the application before any implementation.
## Step 1: Define the User
**Visitor**
- Wants to discover products
- Wants to view collections
- Wants to learn about the brand
- May want to buy later
**Admin**
- Wants to upload products
- Wants to create collections
- Wants to manage content
---
## Step 2: Information Architecture & Site Map
```text
HOME
│
├── Collections
│   └── Collection Detail
│
├── Shop
│   └── Product Detail
│
├── Lookbook
│
├── About
│
├── Contact
│   
└── Admin
    ├── Dashboard
    ├── Products
    ├── Collections
    └── Settings
```
---
## Step 3: User Flows
### Visitor Flow
```text
Landing Page
    ↓
Featured Collection
    ↓
Collection Page
    ↓
Product Page
    ↓
Inquiry / Purchase
```
### Admin Flow
```text
Login
    ↓
Dashboard
    ↓
Products
    ↓
Add Product
    ↓
Publish
```
---
## Step 4: Wireframes (Structural)
### Home Page
```text
------------------------------------------------
LOGO                     MENU
------------------------------------------------
HERO IMAGE
"Handcrafted Crochet Fashion"
[Shop Collection]
------------------------------------------------
FEATURED COLLECTIONS
[Card] [Card] [Card]
------------------------------------------------
ABOUT MOC COUTURE
------------------------------------------------
FOOTER
------------------------------------------------
```
### Product Page
```text
------------------------------------------------
IMAGE GALLERY
------------------------------------------------
Product Name
Description
Materials
Price
[Inquire]
[Add to Cart]
------------------------------------------------
Related Products
------------------------------------------------
```
### Admin Products
```text
------------------------------------------------
Products
[Add Product]
------------------------------------------------
Table
Name
Category
Status
Edit
Delete
------------------------------------------------
```
---
## Core Development Philosophy
Before building any new screen, we must answer:
1. **What is the purpose of this screen?**
2. **Who uses it?**
3. **What actions can they take?**
4. **Where do they go next?**
If these four questions cannot be answered clearly, the screen is not designed yet and code should not be written.