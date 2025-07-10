# Rowan Arora - Personal Portfolio Website

A modern, responsive portfolio website showcasing my experience as a Backend Developer and AI enthusiast. Built with Next.js 15, TypeScript, and Tailwind CSS featuring a clean sage green and cream design.

## 🚀 Features

- **Interactive Design**: Mouse-responsive floating orbs and animated background elements
- **Authentic Content**: Real personal story, genuine coding approach, and actual project details
- **Smart Navigation**: Active section detection with colored borders for current page location
- **Comprehensive Skills**: Technologies organized by Languages, Frameworks, Databases, and Tools
- **Project Showcase**: Featured projects with detailed modals and GitHub integration
- **Professional Experience**: Three positions with expandable details and achievement metrics
- **Responsive Layout**: Optimized for all screen sizes with glass morphism effects
- **Resume Integration**: Direct PDF download functionality

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 with custom sage/cream color palette
- **Fonts**: Optimized with `next/font`
- **Deployment**: Optimized for Vercel/Netlify

## 🎨 Design Features

- **Color Scheme**: Custom sage green (#8a9d73, #6f8159) and cream (#fefcf9, #f5e4c1) palette
- **Interactive Elements**: Hover effects with colored borders on all clickable elements
- **Glass Morphism**: Backdrop blur effects and translucent cards
- **Smooth Animations**: Rotating technology text and floating background elements
- **Professional Photography**: Profile photo with enhanced colored border

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and custom CSS
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main portfolio page
public/
├── profile-photo.jpeg       # Profile image
├── Rowan-Arora-Resume.pdf  # Downloadable resume
└── [other assets]
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rowanArora/personal-website.git
cd personal-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
```

## 📝 Content Sections

1. **Hero Section**: Introduction with rotating technology showcase and stats
2. **About Me**: Personal journey, current focus, and coding philosophy  
3. **Experience**: Three professional positions with detailed achievements
4. **Projects**: Featured projects with technical implementation details
5. **Contact**: Professional links and call-to-action

## 🔧 Customization

### Colors
The color palette is defined in `tailwind.config.ts`:
```typescript
colors: {
  sage: {
    50: '#f7f9f5', 100: '#eef2ea', // ... custom sage colors
  },
  cream: {
    50: '#fefcf9', 100: '#f5e4c1', // ... custom cream colors
  }
}
```

### Content
- Update personal information in `src/app/page.tsx`
- Replace profile photo in `public/profile-photo.jpeg`
- Update resume in `public/Rowan-Arora-Resume.pdf`

## 🌐 Deployment Options

### Recommended: Vercel (Free)
1. Push code to GitHub
2. Connect repository at [vercel.com](https://vercel.com)
3. Automatic deployments on push

### Alternative: Netlify (Free)
1. Push code to GitHub  
2. Connect repository at [netlify.com](https://netlify.com)
3. Configure build settings: `npm run build` / `out` directory

## 📱 Responsive Design

- **Mobile**: Single column layout with optimized navigation
- **Tablet**: Balanced two-column sections
- **Desktop**: Full multi-column layout with enhanced interactions

## 🎯 Performance Optimizations

- Next.js automatic code splitting
- Optimized images with `next/image`
- Efficient CSS with Tailwind's purging
- Smooth animations with CSS transforms

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

**Rowan Arora**
- LinkedIn: [linkedin.com/in/rowanarora](https://www.linkedin.com/in/rowanarora/)
- GitHub: [github.com/rowanarora](https://github.com/rowanarora)
- Email: rowan.arora@icloud.com

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
