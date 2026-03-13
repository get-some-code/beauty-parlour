# Technical Design Document: Luxury Salon UI Enhancement

## Overview

This design document specifies the technical implementation for a comprehensive UI enhancement of the Habibs Hair & Beauty luxury salon website. The enhancement addresses critical bugs, implements a refined design system with Tailwind CSS v4 compatibility, and delivers a production-grade user experience across all pages and components.

### Goals

1. Fix critical bugs affecting navbar visibility and flex layout rendering
2. Implement Tailwind v4 compatible global styles and theme configuration
3. Establish a consistent luxury design system across all components
4. Enhance all major components (Navbar, Hero, Services, Testimonials, Gallery, etc.)
5. Implement comprehensive accessibility features (WCAG AA compliance)
6. Optimize performance with image optimization and code splitting
7. Implement SEO best practices with metadata and structured data
8. Create a smooth animation system using Framer Motion
9. Ensure mobile responsiveness across all viewport sizes

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Animation**: Framer Motion
- **Image Optimization**: next/image component
- **Icons**: lucide-react
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Backend**: Supabase (existing integration)

### Design System

#### Color Palette

```css
--champagne: #E9DBBD;
--soft-gold: #CBB682;
--muted-gold: #A08C5B;
--deep-bronze: #785F37;
--luxury-black: #181510;
```

#### Typography

- **Headings**: Playfair Display (serif, elegant)
- **Body Text**: DM Sans (sans-serif, readable)
- **Font Sizes**: Responsive scale from 14px (mobile) to 18px (desktop) for body text
- **Line Heights**: 1.6 for body text, 1.2 for headings

#### Border Radius

- **Buttons**: rounded-full (fully rounded)
- **Cards**: rounded-2xl (24px)
- **Inputs**: rounded-xl (16px)
- **Images**: rounded-2xl (24px)

#### Spacing

- Consistent use of Tailwind's spacing scale (4px increments)
- Section padding: py-16 (mobile), py-24 (desktop)
- Container max-width: 1280px with px-4 (mobile), px-8 (desktop)

#### Responsive Grid Pattern

```
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
```

## Architecture

### Component Hierarchy

```
app/
├── layout.tsx (Root layout with fonts, metadata, skip-to-content)
├── page.tsx (Homepage)
├── about/page.tsx
├── services/page.tsx
├── gallery/page.tsx
├── contact/page.tsx
├── booking/page.tsx
└── globals.css (Tailwind v4 theme configuration)

components/
├── Navbar.tsx (Navigation with scroll behavior)
├── Footer.tsx (Site footer with links and contact)
├── FloatingCTA.tsx (Fixed WhatsApp and booking buttons)
├── AboutContent.tsx
├── ServicesContent.tsx
├── GalleryContent.tsx
├── ContactContent.tsx
├── BookingContent.tsx
└── sections/
    ├── Hero.tsx (Homepage hero section)
    ├── FeaturedServices.tsx (Service cards grid)
    ├── NailShowcase.tsx (Nail art gallery)
    ├── Testimonials.tsx (Customer reviews)
    └── LocationMap.tsx (Map and contact info)
```

### State Management Strategy

- **Local Component State**: Use useState for component-specific state (form inputs, modals, filters)
- **URL State**: Use URL parameters for shareable state (service pre-selection in booking)
- **Scroll State**: Use useEffect with scroll listeners for navbar transparency
- **Form State**: Manage multi-step forms with useState and validation functions
- **No Global State**: Avoid prop drilling by keeping state close to where it's used

### Client vs Server Components

- **Server Components** (default): All page components, static sections
- **Client Components** ('use client'): Interactive components requiring hooks
  - Navbar (scroll listener)
  - BookingContent (multi-step form)
  - ContactContent (form submission)
  - GalleryContent (lightbox modal)
  - FloatingCTA (scroll behavior)
  - All sections with Framer Motion animations

## Components and Interfaces

### 1. Global Styles (globals.css)

**Purpose**: Define Tailwind v4 compatible theme with custom colors, animations, and component classes.

**Implementation**:

```css
@import "tailwindcss";

@theme {
  /* Custom Colors */
  --color-champagne: #E9DBBD;
  --color-soft-gold: #CBB682;
  --color-muted-gold: #A08C5B;
  --color-deep-bronze: #785F37;
  --color-luxury-black: #181510;
  
  /* Custom Animations */
  --animate-fade-in: fadeIn 0.6s ease-out;
  --animate-slide-up: slideUp 0.6s ease-out;
  --animate-shimmer: shimmer 2s infinite;
  --animate-pulse-gold: pulseGold 2s infinite;
  --animate-bounce-slow: bounceSlow 3s infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

@keyframes pulseGold {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Component Classes */
.btn-primary {
  background: linear-gradient(135deg, var(--color-soft-gold), var(--color-muted-gold));
  color: var(--color-luxury-black);
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(203, 182, 130, 0.3);
}

.btn-outline {
  border: 2px solid var(--color-soft-gold);
  color: var(--color-soft-gold);
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s ease;
  background: transparent;
}

.btn-outline:hover {
  background: var(--color-soft-gold);
  color: var(--color-luxury-black);
}

.card-luxury {
  background: rgba(24, 21, 16, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(203, 182, 130, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.card-luxury:hover {
  border-color: rgba(203, 182, 130, 0.4);
  transform: translateY(-4px);
}

.input-luxury {
  background: rgba(24, 21, 16, 0.4);
  border: 1px solid rgba(203, 182, 130, 0.3);
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  color: var(--color-champagne);
  transition: all 0.3s ease;
}

.input-luxury:focus {
  outline: none;
  border-color: var(--color-soft-gold);
  box-shadow: 0 0 0 3px rgba(203, 182, 130, 0.1);
}

.input-luxury::placeholder {
  color: rgba(233, 219, 189, 0.5);
}

/* Accessibility */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-soft-gold);
  color: var(--color-luxury-black);
  padding: 0.5rem 1rem;
  text-decoration: none;
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--color-luxury-black);
}

::-webkit-scrollbar-thumb {
  background: var(--color-muted-gold);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-soft-gold);
}
```

**Validates**: Requirements 3.1-3.6, 4.1-4.8

### 2. Root Layout (app/layout.tsx)

**Purpose**: Configure fonts, metadata, structured data, and global layout elements.

**TypeScript Interface**:

```typescript
interface RootLayoutProps {
  children: React.ReactNode;
}
```

**Implementation Details**:

- Import Playfair Display and DM Sans from next/font/google
- Apply font variables to html element
- Include skip-to-content link before main content
- Add JSON-LD structured data for LocalBusiness
- Configure viewport for mobile devices
- Set lang="en" on html element

**Metadata Configuration**:

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Habibs Hair & Beauty - Luxury Salon in Birmingham',
    template: '%s | Habibs Hair & Beauty'
  },
  description: 'Experience luxury hair and beauty services in Birmingham. Expert stylists, premium treatments, and exceptional customer care.',
  keywords: ['hair salon', 'beauty salon', 'Birmingham', 'luxury salon', 'hair styling', 'nail art'],
  authors: [{ name: 'Habibs Hair & Beauty' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://habibshairandbeauty.com',
    siteName: 'Habibs Hair & Beauty',
    title: 'Habibs Hair & Beauty - Luxury Salon in Birmingham',
    description: 'Experience luxury hair and beauty services in Birmingham.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Habibs Hair & Beauty Salon'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habibs Hair & Beauty - Luxury Salon in Birmingham',
    description: 'Experience luxury hair and beauty services in Birmingham.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-verification-code'
  }
};
```

**JSON-LD Structured Data**:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: 'Habibs Hair & Beauty',
  image: 'https://habibshairandbeauty.com/logo.jpg',
  '@id': 'https://habibshairandbeauty.com',
  url: 'https://habibshairandbeauty.com',
  telephone: '+44-XXX-XXX-XXXX',
  priceRange: '££',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Your Street Address',
    addressLocality: 'Birmingham',
    postalCode: 'B1 XXX',
    addressCountry: 'GB'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.4862,
    longitude: -1.8904
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '17:00'
    }
  ],
  sameAs: [
    'https://www.facebook.com/habibshairandbeauty',
    'https://www.instagram.com/habibshairandbeauty'
  ]
};
```

**Validates**: Requirements 21.1-21.9, 22.1-22.8

### 3. Navbar Component

**Purpose**: Provide site navigation with scroll-based transparency and mobile menu.

**TypeScript Interface**:

```typescript
interface NavbarProps {
  // No props needed - self-contained component
}

interface NavLink {
  href: string;
  label: string;
}
```

**State Management**:

```typescript
const [isScrolled, setIsScrolled] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
```

**Implementation Details**:

1. **Scroll Behavior**:
   - Listen to scroll events with useEffect
   - Set isScrolled to true when scrollY > 50
   - Apply different styles based on isScrolled state

2. **Transparent Mode** (isScrolled = false):
   - Background: transparent
   - Text color: champagne (#E9DBBD)
   - Logo: light version
   - Border: none

3. **Solid Mode** (isScrolled = true):
   - Background: luxury-black with opacity 0.95
   - Backdrop filter: blur(10px)
   - Border bottom: 1px solid soft-gold with opacity 0.2
   - Smooth transition: 300ms

4. **Mobile Menu**:
   - Hamburger icon (Menu from lucide-react)
   - Full-screen overlay with backdrop blur
   - Slide-in animation from right
   - Close on link click or outside click
   - Prevent body scroll when open

5. **Accessibility**:
   - ARIA labels on all buttons
   - Skip-to-content link
   - Keyboard navigation support
   - Focus indicators on all links
   - Active link indicators

6. **Navigation Links**:
   - Home, About, Services, Gallery, Contact
   - Book Now button with Calendar icon
   - Hover effects with underline animation

**Validates**: Requirements 1.1-1.5, 5.1-5.8

### 4. Hero Section

**Purpose**: Create an engaging homepage hero with animated content and CTAs.

**TypeScript Interface**:

```typescript
interface HeroProps {
  // No props needed - self-contained component
}

interface Stat {
  value: string;
  label: string;
}
```

**Implementation Details**:

1. **Background**:
   - next/image with priority loading
   - fill property for full coverage
   - Gradient overlay: linear-gradient(135deg, rgba(24,21,16,0.7), rgba(24,21,16,0.5))
   - Min height: 100vh

2. **Content Structure**:
   - Centered content with max-width container
   - Heading with Playfair Display
   - Subheading with DM Sans
   - Two CTA buttons (Book Now, View Services)
   - Statistics row (Years Experience, Happy Clients, Expert Stylists)
   - Scroll cue animation at bottom

3. **Animations** (Framer Motion):
   - Container: staggerChildren with 0.2s delay
   - Heading: fadeIn from opacity 0, translateY 20px
   - Subheading: fadeIn with 0.3s delay
   - Buttons: fadeIn with 0.4s delay
   - Stats: fadeIn with 0.5s delay
   - Scroll cue: bounce animation (infinite)

4. **Statistics**:
   - Display in row on desktop, column on mobile
   - Each stat: value (large, Playfair) + label (small, DM Sans)
   - Separator lines between stats

5. **Responsive Design**:
   - Mobile: Single column, smaller text, stacked buttons
   - Tablet: Larger text, side-by-side buttons
   - Desktop: Full layout with all elements

**Validates**: Requirements 6.1-6.8

