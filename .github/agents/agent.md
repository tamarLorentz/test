# Payment Request Management System

## Tech Stack
- React (with functional components)
- TypeScript
- Tailwind CSS
- Lucide React Icons
- React Router

## General Rules
- Use RTL layout (Hebrew)
- All UI text must be in Hebrew
- Clean, modern, minimal design
- Professional blue color palette
- Use "Inter" font
- Fully responsive

## Architecture
- Use component-based structure
- Separate pages and reusable components
- Keep components small and reusable

## Features

### Authentication (Mock)
- Login screen with:
  - First Name (שם פרטי)
  - Last Name (שם משפחה)
- Validation: Hebrew letters only
- Store user in local state
- No backend

### Roles
- Employee
- Consultant
- אפשרות להחלפת משתמש (role switch)

### Pages

#### Login Page
- Simple centered form
- Validation
- Submit redirects to dashboard

#### Dashboard (Request List)
- List of requests
- Search bar
- Filter by status
- Each request shown as a card

#### Request Details
- Full request info
- Status display
- Actions:
  - אשר
  - דחה
  - בקש הבהרה
- Show history log

#### New Request
- Form with validation
- Create new request

#### SLA Dashboard
- Statistics:
  - Open
  - Closed
  - Overdue
- Visual chart (pie or similar)

## UI Components

### Header
- Sticky top
- Welcome message: "שלום {name}"
- Button: "החלף משתמש"

### RequestCard
- Title
- Date
- Status badge
- Action buttons

### StatusBadge
- Color-coded statuses:
  - Pending (blue)
  - Approved (green)
  - Rejected (red)
  - Clarification (yellow)

## State Management
- Use React useState (no Redux)
- Mock data (array of requests)

## Navigation
- Use React Router:
  - /login
  - /dashboard
  - /new
  - /request/:id
  - /sla

## Code Style
- Use TypeScript types
- Keep code clean and readable
- Use Tailwind classes (no inline CSS)