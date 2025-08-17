# Overview

This is a personal portfolio website for Intesar Husain, a product builder and creative leader. The site showcases projects through an interactive Kanban wall format, displaying career highlights, testimonials, and providing contact functionality. The application is built as a full-stack web application with a React frontend and Express backend, designed to help startup recruiters, collaborators, and freelance clients understand Intesar's story as a builder and product thinker.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for interactive animations and transitions
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Framework**: Express.js with TypeScript running in ESM mode
- **API Design**: RESTful API endpoints for projects, timeline, testimonials, and contact submissions
- **Storage**: In-memory storage implementation with interface for future database integration
- **Development Setup**: Hot reload using Vite middleware integration for seamless development experience

## Data Storage Solutions
- **ORM**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Database**: PostgreSQL (configured but currently using in-memory storage for development)
- **Schema**: Well-defined schemas for users, projects, timeline items, testimonials, and contacts with proper typing

## Authentication and Authorization
- **Current State**: Basic user schema defined but authentication not yet implemented
- **Prepared Infrastructure**: User management schema ready for future authentication integration

## Component Architecture
- **Design System**: shadcn/ui components with custom brand colors (Indigo primary, Amber accent)
- **Layout Pattern**: Mobile-first responsive design with section-based homepage layout
- **Interactive Elements**: Kanban wall with drag-and-drop ready structure, project sidebar for detailed views
- **Reusable Components**: Modular component structure with proper TypeScript interfaces

## Content Management
- **Static Content**: Constants file for passions/strengths data
- **Dynamic Content**: API-driven content for projects, timeline, and testimonials
- **Future CMS**: Architecture prepared for headless CMS integration (references to Sanity in documentation)

## Build and Deployment
- **Development**: Concurrent frontend and backend development with Vite dev server
- **Production Build**: Vite for frontend bundling, esbuild for backend compilation
- **Asset Management**: Attached assets folder for design guidelines and implementation documentation
- **Environment**: Replit-optimized with development banner integration

# External Dependencies

## UI and Styling
- **Radix UI**: Comprehensive primitive components for accessibility and interaction patterns
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Google Fonts**: Space Grotesk and Inter typography integration
- **Framer Motion**: Animation library for smooth interactions and page transitions

## Database and ORM
- **Neon Database**: Serverless PostgreSQL provider with connection pooling
- **Drizzle ORM**: Type-safe ORM with migrations support
- **connect-pg-simple**: PostgreSQL session store for future session management

## Development Tools
- **Replit Integration**: Development environment optimizations and error handling
- **Vite Plugins**: Runtime error overlay and cartographer for enhanced development experience
- **TypeScript**: Full type safety across frontend, backend, and shared schemas

## Form and Validation
- **React Hook Form**: Performance-optimized form handling
- **Zod**: Schema validation for type-safe data handling
- **@hookform/resolvers**: Integration layer between React Hook Form and Zod

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx & class-variance-authority**: Conditional CSS class management
- **embla-carousel**: Touch-friendly carousel implementation for mobile experience