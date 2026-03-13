# Requirements Document

## Introduction

This document specifies the requirements for a comprehensive UI enhancement of the Habibs Hair & Beauty luxury salon website. The enhancement addresses critical bugs, implements a refined design system, ensures Tailwind CSS v4 compatibility, and delivers a production-grade user experience across all pages and components. The website is built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer Motion.

## Glossary

- **UI_System**: The complete user interface implementation including all components, pages, and styling
- **Design_System**: The cohesive set of colors, typography, spacing, and component patterns
- **Navbar**: The navigation bar component displayed at the top of all pages
- **Hero_Section**: The prominent introductory section on the homepage
- **Service_Card**: A component displaying individual service information
- **Booking_Form**: The multi-step appointment booking interface
- **Contact_Form**: The form for submitting inquiries and messages
- **Gallery_Grid**: The image display component with lightbox functionality
- **Footer**: The bottom section containing links, contact info, and branding
- **FloatingCTA**: The fixed call-to-action buttons for WhatsApp and booking
- **Accessibility_Compliance**: Conformance to WCAG AA standards
- **Mobile_Responsive**: Proper display and functionality on mobile devices
- **Tailwind_v4**: The fourth major version of Tailwind CSS framework
- **Animation_System**: Framer Motion-based transitions and scroll reveals
- **SEO_Metadata**: Search engine optimization tags and structured data
- **Image_Optimization**: Next.js image component with proper sizing and lazy loading

## Requirements

### Requirement 1: Fix Critical Navbar Visibility Bug

**User Story:** As a website visitor, I want to see the navigation menu text clearly, so that I can navigate the website effectively.

#### Acceptance Criteria

1. WHEN THE page loads with the Hero_Section visible, THE Navbar SHALL display text in a light color (champagne or soft-gold) that contrasts with the dark hero background
2. WHEN THE user scrolls past 50 pixels, THE Navbar SHALL transition to a dark background with appropriate text colors
3. THE Navbar SHALL maintain a contrast ratio of at least 4.5:1 between text and background for Accessibility_Compliance
4. WHEN THE Navbar is in transparent mode, THE logo and navigation links SHALL use light colors visible against dark backgrounds
5. THE Navbar SHALL apply smooth color transitions within 300 milliseconds when scrolling state changes

### Requirement 2: Fix Flex Layout Typos

**User Story:** As a developer, I want correct Tailwind CSS class names, so that layouts render properly on all screen sizes.

#### Acceptance Criteria

1. THE Booking_Form SHALL replace "sm:row" with "sm:flex-row" in all button container elements
2. THE Contact_Form SHALL replace "sm:row" with "sm:flex-row" in all button container elements
3. WHEN THE viewport width is below 640 pixels, THE button containers SHALL display in column layout
4. WHEN THE viewport width is 640 pixels or above, THE button containers SHALL display in row layout
5. THE UI_System SHALL validate that no invalid Tailwind class names exist in any component

### Requirement 3: Implement Tailwind v4 Compatible Global Styles

**User Story:** As a developer, I want Tailwind v4 compatible styles, so that the build process succeeds without errors.

#### Acceptance Criteria

1. THE UI_System SHALL define all custom colors using CSS custom properties in the @theme directive
2. THE UI_System SHALL remove all @apply directives from component classes that use custom color names
3. THE UI_System SHALL define custom animations (fadeIn, slideUp, shimmer, pulseGold, bounceSlow) within the @theme directive
4. THE UI_System SHALL create component classes (btn-primary, btn-outline, card-luxury, input-luxury) using standard CSS syntax
5. THE UI_System SHALL maintain backward compatibility with existing component implementations
6. WHEN THE build process runs, THE UI_System SHALL compile without Tailwind v4 compatibility errors

### Requirement 4: Implement Consistent Design System

**User Story:** As a designer, I want a consistent visual language across all pages, so that the brand identity is cohesive.

#### Acceptance Criteria

1. THE Design_System SHALL use the color palette: Champagne (#E9DBBD), Soft Gold (#CBB682), Muted Gold (#A08C5B), Deep Bronze (#785F37), Luxury Black (#181510)
2. THE Design_System SHALL use Playfair Display font for all headings and serif text
3. THE Design_System SHALL use DM Sans font for all body text and sans-serif content
4. THE Design_System SHALL apply rounded-full to all button elements
5. THE Design_System SHALL apply rounded-2xl to all card components
6. THE Design_System SHALL apply rounded-xl to all input and textarea elements
7. THE Design_System SHALL maintain consistent spacing using Tailwind's spacing scale
8. THE Design_System SHALL use uppercase text with letter-spacing for labels and small headings

### Requirement 5: Enhance Navigation Component

**User Story:** As a website visitor, I want intuitive navigation with visual feedback, so that I can easily move between pages.

#### Acceptance Criteria

1. THE Navbar SHALL display active link indicators for the current page
2. WHEN THE user hovers over a navigation link, THE Navbar SHALL show a visual transition within 200 milliseconds
3. THE Navbar SHALL include a mobile menu overlay with smooth animations
4. WHEN THE mobile menu is open, THE Navbar SHALL prevent body scrolling
5. THE Navbar SHALL include proper ARIA labels for all interactive elements
6. THE Navbar SHALL display a "Book Now" button with icon and hover effects
7. WHEN THE user clicks outside the mobile menu, THE Navbar SHALL close the menu
8. THE Navbar SHALL include a skip-to-content link for keyboard navigation

### Requirement 6: Redesign Hero Section

**User Story:** As a website visitor, I want an engaging hero section, so that I understand the salon's value proposition immediately.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a gradient overlay on the background image for text readability
2. THE Hero_Section SHALL include animated statistics showing salon achievements
3. THE Hero_Section SHALL display primary and secondary call-to-action buttons
4. THE Hero_Section SHALL include a scroll cue animation indicating more content below
5. WHEN THE page loads, THE Hero_Section SHALL animate content with staggered timing
6. THE Hero_Section SHALL use priority loading for the background image
7. THE Hero_Section SHALL maintain a minimum height of 100vh on all devices
8. THE Hero_Section SHALL display properly on viewport widths from 320px to 2560px

### Requirement 7: Enhance Service Display Components

**User Story:** As a potential customer, I want to see services presented attractively, so that I can choose the right service for my needs.

#### Acceptance Criteria

1. THE Service_Card SHALL use rounded-2xl border radius
2. THE Service_Card SHALL display hover effects with smooth transitions
3. THE Service_Card SHALL include proper image containers with aspect ratio preservation
4. WHEN THE user hovers over a Service_Card, THE Service_Card SHALL scale up by 2% within 300 milliseconds
5. THE Service_Card SHALL display service title, description, price, and category
6. THE Service_Card SHALL include category-specific icons (Scissors, Sparkles, Wand2, Star)
7. THE FeaturedServices component SHALL display services in a responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop)
8. THE ServicesContent component SHALL include category filters with active state indicators

### Requirement 8: Implement Nail Showcase Section

**User Story:** As a potential customer, I want to see nail art examples, so that I can visualize the quality of work.

#### Acceptance Criteria

1. THE NailShowcase component SHALL use a masonry layout for image display
2. THE NailShowcase component SHALL apply dark section styling with luxury-black background
3. WHEN THE user hovers over an image, THE NailShowcase component SHALL display an overlay with service information
4. THE NailShowcase component SHALL use rounded-2xl for all image containers
5. THE NailShowcase component SHALL implement lazy loading for all images
6. THE NailShowcase component SHALL display images in a responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop)

### Requirement 9: Redesign Testimonials Section

**User Story:** As a potential customer, I want to read authentic reviews, so that I can trust the salon's quality.

#### Acceptance Criteria

1. THE Testimonials component SHALL use dark section styling with luxury-black background
2. THE Testimonials component SHALL display testimonials in glass-effect cards
3. THE Testimonials component SHALL include avatar images with gradient borders
4. THE Testimonials component SHALL display star ratings for each testimonial
5. THE Testimonials component SHALL use rounded-2xl for testimonial cards
6. WHEN THE page loads, THE Testimonials component SHALL animate testimonials with staggered timing
7. THE Testimonials component SHALL display testimonials in a responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop)

### Requirement 10: Enhance Location Map Section

**User Story:** As a potential customer, I want to find the salon location easily, so that I can plan my visit.

#### Acceptance Criteria

1. THE LocationMap component SHALL use a split layout (information left, map right)
2. THE LocationMap component SHALL display info cards with address, phone, and hours
3. THE LocationMap component SHALL embed Google Maps with proper filters
4. THE LocationMap component SHALL use rounded-2xl for the map container
5. THE LocationMap component SHALL apply grayscale filter to the map with hover transition to color
6. THE LocationMap component SHALL display properly on mobile devices with stacked layout
7. THE LocationMap component SHALL include clickable phone numbers and WhatsApp links

### Requirement 11: Fix and Enhance Booking Form

**User Story:** As a potential customer, I want a smooth booking experience, so that I can schedule appointments easily.

#### Acceptance Criteria

1. THE Booking_Form SHALL fix the "sm:row" typo to "sm:flex-row" in button containers
2. THE Booking_Form SHALL use rounded-2xl for all card containers
3. THE Booking_Form SHALL apply input-luxury class to all form inputs
4. THE Booking_Form SHALL display a visual progress bar showing completion percentage
5. THE Booking_Form SHALL implement 4-step flow: service selection, date/time, contact info, review
6. WHEN THE user completes a step, THE Booking_Form SHALL validate inputs before proceeding
7. THE Booking_Form SHALL include back navigation buttons on steps 2-4
8. THE Booking_Form SHALL display service icons based on category
9. THE Booking_Form SHALL show a success confirmation with booking details
10. THE Booking_Form SHALL disable the submit button while processing
11. THE Booking_Form SHALL support pre-selection of service via URL parameter

### Requirement 12: Fix and Enhance Contact Form

**User Story:** As a potential customer, I want to contact the salon easily, so that I can ask questions or provide feedback.

#### Acceptance Criteria

1. THE Contact_Form SHALL fix the "sm:row" typo to "sm:flex-row" in button containers
2. THE Contact_Form SHALL use rounded-2xl for the form container
3. THE Contact_Form SHALL apply input-luxury class to all form inputs
4. THE Contact_Form SHALL display a success message after submission
5. THE Contact_Form SHALL validate email format before submission
6. THE Contact_Form SHALL validate phone number format before submission
7. THE Contact_Form SHALL include service selection dropdown
8. THE Contact_Form SHALL disable the submit button while processing
9. THE Contact_Form SHALL clear form data after successful submission
10. THE Contact_Form SHALL display contact information cards with icons
11. THE Contact_Form SHALL include an embedded Google Maps iframe with rounded-2xl styling

### Requirement 13: Implement Gallery with Lightbox

**User Story:** As a potential customer, I want to view salon work in detail, so that I can assess the quality and style.

#### Acceptance Criteria

1. THE Gallery_Grid SHALL display images in a responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop)
2. THE Gallery_Grid SHALL use rounded-2xl for all image containers
3. WHEN THE user hovers over an image, THE Gallery_Grid SHALL display an overlay with category information
4. WHEN THE user clicks an image, THE Gallery_Grid SHALL open a lightbox modal
5. THE lightbox modal SHALL display the full-size image with navigation controls
6. THE lightbox modal SHALL support keyboard navigation (arrow keys, escape)
7. THE lightbox modal SHALL include close button with proper ARIA label
8. THE Gallery_Grid SHALL implement lazy loading for all images
9. THE Gallery_Grid SHALL use next/image with proper sizes prop
10. THE Gallery_Grid SHALL include category filters with active state indicators

### Requirement 14: Redesign Footer Component

**User Story:** As a website visitor, I want comprehensive footer information, so that I can access important links and contact details.

#### Acceptance Criteria

1. THE Footer SHALL include a brand section with logo and tagline
2. THE Footer SHALL display link columns for navigation, services, and legal pages
3. THE Footer SHALL include contact information with icons
4. THE Footer SHALL display social media icons with hover effects
5. THE Footer SHALL use rounded-full for social media icon containers
6. THE Footer SHALL include copyright notice with current year
7. THE Footer SHALL display properly on mobile devices with stacked layout
8. THE Footer SHALL use luxury-black background with champagne text
9. THE Footer SHALL include proper ARIA labels for all links

### Requirement 15: Implement Floating CTA Buttons

**User Story:** As a website visitor, I want quick access to booking and contact options, so that I can take action without scrolling.

#### Acceptance Criteria

1. THE FloatingCTA SHALL display WhatsApp and booking buttons
2. THE FloatingCTA SHALL position buttons fixed at bottom-right on desktop
3. THE FloatingCTA SHALL position buttons fixed at bottom-center on mobile
4. THE FloatingCTA SHALL use rounded-full for button shapes
5. WHEN THE user hovers over a button, THE FloatingCTA SHALL scale the button by 10% within 200 milliseconds
6. THE FloatingCTA SHALL include pulse animation on the WhatsApp button
7. THE FloatingCTA SHALL include proper ARIA labels for Accessibility_Compliance
8. THE FloatingCTA SHALL display above other content with appropriate z-index
9. WHEN THE user scrolls, THE FloatingCTA SHALL remain visible and accessible

### Requirement 16: Implement About Page Content

**User Story:** As a potential customer, I want to learn about the salon's history and team, so that I can connect with the brand.

#### Acceptance Criteria

1. THE AboutContent component SHALL remove all unused imports
2. THE AboutContent component SHALL include a hero banner with salon image
3. THE AboutContent component SHALL display team member photos with rounded-2xl containers
4. THE AboutContent component SHALL include values cards with icons
5. THE AboutContent component SHALL use consistent Design_System styling
6. THE AboutContent component SHALL implement scroll-reveal animations
7. THE AboutContent component SHALL display properly on all device sizes
8. THE AboutContent component SHALL include proper alt text for all images

### Requirement 17: Implement Mobile Responsive Design

**User Story:** As a mobile user, I want the website to work perfectly on my device, so that I can access all features.

#### Acceptance Criteria

1. THE UI_System SHALL use responsive grid patterns: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
2. THE UI_System SHALL display properly on viewport widths from 320px to 2560px
3. THE UI_System SHALL use appropriate font sizes for mobile devices (minimum 16px for body text)
4. THE UI_System SHALL ensure touch targets are at least 44x44 pixels
5. THE UI_System SHALL prevent horizontal scrolling on all pages
6. THE UI_System SHALL use mobile-appropriate spacing and padding
7. THE UI_System SHALL display images with proper aspect ratios on all devices
8. THE UI_System SHALL ensure forms are usable on mobile devices without zooming

### Requirement 18: Implement Accessibility Features

**User Story:** As a user with disabilities, I want an accessible website, so that I can use all features independently.

#### Acceptance Criteria

1. THE UI_System SHALL maintain WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
2. THE UI_System SHALL include proper ARIA labels for all interactive elements
3. THE UI_System SHALL support keyboard navigation for all interactive features
4. THE UI_System SHALL display visible focus indicators on all focusable elements
5. THE UI_System SHALL use semantic HTML elements (nav, main, article, section, footer)
6. THE UI_System SHALL include skip-to-content link for keyboard users
7. THE UI_System SHALL provide alt text for all images
8. THE UI_System SHALL ensure form inputs have associated labels
9. THE UI_System SHALL support screen reader navigation
10. THE UI_System SHALL avoid using color alone to convey information

### Requirement 19: Implement Animation System

**User Story:** As a website visitor, I want smooth and engaging animations, so that the browsing experience feels premium.

#### Acceptance Criteria

1. THE Animation_System SHALL use Framer Motion for all animations
2. THE Animation_System SHALL implement scroll-reveal animations with staggered children
3. THE Animation_System SHALL use appropriate easing functions for natural motion
4. THE Animation_System SHALL respect user's prefers-reduced-motion setting
5. THE Animation_System SHALL animate page transitions smoothly
6. THE Animation_System SHALL use appropriate animation durations (200-800ms)
7. THE Animation_System SHALL avoid janky animations by using transform and opacity
8. THE Animation_System SHALL implement hover effects with smooth transitions
9. THE Animation_System SHALL include loading states with pulse animations

### Requirement 20: Implement Image Optimization

**User Story:** As a website visitor, I want fast-loading images, so that pages load quickly.

#### Acceptance Criteria

1. THE UI_System SHALL use next/image component for all images
2. THE UI_System SHALL include proper alt text for all images
3. THE UI_System SHALL use sizes prop for responsive images
4. THE UI_System SHALL implement lazy loading for below-fold images
5. THE UI_System SHALL use priority loading for hero images
6. THE UI_System SHALL specify width and height to prevent layout shift
7. THE UI_System SHALL use appropriate image formats (WebP with fallbacks)
8. THE UI_System SHALL optimize images for different viewport sizes

### Requirement 21: Implement SEO Metadata

**User Story:** As a business owner, I want good search engine visibility, so that potential customers can find the salon online.

#### Acceptance Criteria

1. THE UI_System SHALL include unique title tags for all pages
2. THE UI_System SHALL include unique meta descriptions for all pages
3. THE UI_System SHALL implement Open Graph tags for social sharing
4. THE UI_System SHALL include Twitter Card metadata
5. THE UI_System SHALL implement JSON-LD structured data for LocalBusiness
6. THE UI_System SHALL include canonical URLs for all pages
7. THE UI_System SHALL implement proper heading hierarchy (h1, h2, h3)
8. THE UI_System SHALL include viewport meta tag for mobile optimization
9. THE UI_System SHALL generate sitemap.xml and robots.txt files

### Requirement 22: Update Layout Configuration

**User Story:** As a developer, I want proper font and metadata configuration, so that the application loads optimally.

#### Acceptance Criteria

1. THE layout.tsx SHALL import Playfair Display font for serif text
2. THE layout.tsx SHALL import DM Sans font for sans-serif text
3. THE layout.tsx SHALL include enhanced SEO metadata with site name and description
4. THE layout.tsx SHALL implement JSON-LD structured data for LocalBusiness
5. THE layout.tsx SHALL include viewport configuration for mobile devices
6. THE layout.tsx SHALL include skip-to-content link before main content
7. THE layout.tsx SHALL apply font variables to html element
8. THE layout.tsx SHALL include proper lang attribute on html element

### Requirement 23: Implement Page-Specific Metadata

**User Story:** As a business owner, I want each page to have optimized metadata, so that search engines index pages correctly.

#### Acceptance Criteria

1. THE about page SHALL include metadata with title "About Us - Habibs Hair & Beauty"
2. THE services page SHALL include metadata with title "Our Services - Habibs Hair & Beauty"
3. THE gallery page SHALL include metadata with title "Gallery - Habibs Hair & Beauty"
4. THE contact page SHALL include metadata with title "Contact Us - Habibs Hair & Beauty"
5. THE booking page SHALL include metadata with title "Book Appointment - Habibs Hair & Beauty"
6. WHEN THE page loads, THE metadata SHALL include unique descriptions for each page
7. THE metadata SHALL include Open Graph tags for social media sharing
8. THE metadata SHALL include proper canonical URLs

### Requirement 24: Implement Production-Ready Code Quality

**User Story:** As a developer, I want clean and maintainable code, so that the application is easy to update and debug.

#### Acceptance Criteria

1. THE UI_System SHALL remove all unused imports from components
2. THE UI_System SHALL use consistent naming conventions for variables and functions
3. THE UI_System SHALL include proper TypeScript types for all props and state
4. THE UI_System SHALL handle loading and error states appropriately
5. THE UI_System SHALL use proper React hooks (useState, useEffect, useCallback)
6. THE UI_System SHALL avoid prop drilling by using appropriate state management
7. THE UI_System SHALL include proper error boundaries for component failures
8. THE UI_System SHALL use Suspense boundaries for async components
9. THE UI_System SHALL follow Next.js 15 best practices for client/server components

### Requirement 25: Implement Performance Optimization

**User Story:** As a website visitor, I want fast page loads, so that I can access information quickly.

#### Acceptance Criteria

1. THE UI_System SHALL achieve Lighthouse performance score above 90
2. THE UI_System SHALL implement code splitting for route-based chunks
3. THE UI_System SHALL use dynamic imports for heavy components
4. THE UI_System SHALL minimize JavaScript bundle size
5. THE UI_System SHALL implement proper caching strategies
6. THE UI_System SHALL avoid layout shifts (CLS < 0.1)
7. THE UI_System SHALL achieve First Contentful Paint under 1.5 seconds
8. THE UI_System SHALL achieve Time to Interactive under 3 seconds
