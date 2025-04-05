# HUST Research Project Management System

A bilingual (English/Chinese) research project management platform for Huazhong University of Science and Technology's Mechanical Engineering Department, built with Next.js and React.

## Features {user@hust.edu.cn}

- **Dual Interface System:**

  - Student interface for project tracking, research courses, and evaluation
  - Instructor interface for student management, grading, and project publishing
- **Bilingual Support:**

  - Complete language toggle between Chinese (中文) and English
  - Context-aware translations for all UI elements
- **Authentication:**

  - Role-based login (student/instructor)
  - Secure authentication flow
- **Dashboard:**

  - Project tracking with progress visualization
  - Upcoming deadlines and timeline view
  - Stats cards with key metrics
- **AI Research Mentor:**

  - AI assistant for research guidance
  - Support for research methodology and publishing guidance
- **12-Step Research Method:**

  - Structured project progress tracking
  - Clear visualization of research progress

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React (icons)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Run the development server:**

   ```bash
   npm run dev
   ```
4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

- `app/components/` - React components for the UI
- `app/context/` - React context providers for state management
- `app/hooks/` - Custom React hooks
- `app/utils/` - Utility functions
- `app/page.tsx` - Main entry point for the application
- `app/layout.tsx` - Root layout component with providers

## Authentication

For demo purposes, the system includes mock authentication:

- **Student Login:** Any email/password with student role selection
- **Instructor Login:** Any email/password with instructor role selection

## Responsive Design

The application is fully responsive with:

- Mobile menu toggle for smaller screens
- Collapsible sidebar for maximum content space
- Responsive grid layouts that adapt to various screen sizes
