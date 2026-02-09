<div align="center">

# 🚀 PortfolioMe

### Modern Personal Portfolio Website

[![Live Demo](https://img.shields.io/badge/🌐_Live-Demo-brightgreen?style=for-the-badge)](https://bintangdev.vercel.app)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**A cutting-edge portfolio website showcasing professional experience, projects, and skills with modern web technologies**

[Live Demo](https://bintangdev.vercel.app) • [Report Bug](https://github.com/Bintang270802/PortfolioMe/issues) • [Request Feature](https://github.com/Bintang270802/PortfolioMe/issues)

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Configuration](#️-configuration)
- [📁 Project Structure](#-project-structure)
- [🎨 Customization](#-customization)
- [📦 Build & Deploy](#-build--deploy)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact](#-contact)

---

## 🌟 Overview

**PortfolioMe** is a modern, high-performance personal portfolio website built with React.js and Vite. It features a clean, professional design with smooth animations, real-time chat functionality, and comprehensive sections to showcase your professional journey.

### 🎯 Key Highlights

- ⚡ **Lightning Fast** - Built with Vite for optimal performance and instant HMR
- 🎨 **Modern UI/UX** - Clean design with smooth animations using GSAP, AOS, and Framer Motion
- 📱 **Fully Responsive** - Mobile-first approach, optimized for all devices
- 🔒 **Secure Backend** - Powered by Supabase with PostgreSQL database
- 💬 **Real-time Chat** - Interactive chat room with multiple authentication methods
- 🌐 **Multi-language** - Built-in support for Indonesian and English
- 🎭 **3D Graphics** - Interactive 3D elements using Three.js and React Three Fiber
- 📊 **Analytics Ready** - Integrated analytics tracking for user insights
- ♿ **Accessible** - WCAG compliant with semantic HTML and ARIA labels
- 🚀 **Production Ready** - Optimized bundle, no warnings, clean code

---

## ✨ Features

### 🏠 **Hero Section**
- Animated greeting with rotating quotes
- Professional introduction with blur text effects
- Call-to-action buttons (Download CV, Explore Projects)
- Interactive 3D profile card with tilt effects

### 👤 **About Section**
- Professional biography with animated text
- Key statistics (Projects, Experience, GPA)
- Interactive 3D lanyard card with physics simulation
- Personal motto and professional values

### 🛠️ **Skills & Technologies**
- Comprehensive tech stack showcase
- 20+ technologies with icons and descriptions
- Categorized by Frontend, Backend, Tools, and Frameworks
- Hover effects and smooth animations

### 💼 **Work Experience**
- Interactive timeline of professional journey
- Detailed job descriptions with responsibilities
- Technologies and tools used in each role
- Achievements and contributions
- Modal view for full experience details

### 🏆 **Certificates & Awards**
- Dynamic certificate gallery with filtering
- Certificate details with issuer and credential ID
- Responsive card layout with image preview
- Direct links to credential verification

### 📂 **Projects Portfolio**
- Advanced project filtering by technology
- Search functionality for quick access
- Live demo links and GitHub repositories
- Detailed project descriptions with tech stacks
- Development status indicators (NEW, DEV badges)
- Modal view with full project information

### 💬 **Live Chat Room**
- Real-time messaging with Supabase Realtime
- Multiple authentication methods:
  - Magic Link (Email)
  - Email/Password
  - Google OAuth (optional)
- Demo mode fallback when backend not configured
- User avatars with fallback initials
- Message history and real-time updates
- Secure authentication and authorization

### 📬 **Contact Section**
- Secure contact form with validation
- WhatsApp integration for instant messaging
- Email and social media links
- Form validation with helpful error messages
- Success/error toast notifications

### 🎨 **Additional Features**
- Smooth scrolling with offset handling
- Scroll-to-top button
- Toast notification system
- Error boundary for graceful error handling
- Loading states and skeleton screens
- Dark theme optimized design
- Custom scrollbar styling
- Animated page transitions

---

## 🛠️ Tech Stack

### **Frontend Core**
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 19.1.1 | UI library with modern hooks |
| Vite | 7.1.2 | Build tool and dev server |
| Tailwind CSS | 4.1.11 | Utility-first CSS framework |

### **Animation & Graphics**
| Technology | Version | Purpose |
|------------|---------|---------|
| Three.js | 0.167.1 | 3D graphics and WebGL |
| React Three Fiber | 9.3.0 | React renderer for Three.js |
| React Three Drei | 10.6.1 | Useful helpers for R3F |
| React Three Rapier | 2.1.0 | Physics engine integration |
| GSAP | 3.13.0 | Professional animation library |
| Framer Motion | 12.23.12 | React animation library |
| AOS | 3.0.0-beta.6 | Animate On Scroll |
| Animate.css | 4.1.1 | CSS animations |

### **Backend & Services**
| Technology | Version | Purpose |
|------------|---------|---------|
| Supabase | 2.90.1 | Backend-as-a-Service |
| PostgreSQL | - | Database (via Supabase) |
| Supabase Realtime | - | WebSocket connections |
| Supabase Auth | - | Authentication system |

### **Development Tools**
| Technology | Version | Purpose |
|------------|---------|---------|
| ESLint | 9.33.0 | Code linting |
| Vite Plugin React | 5.0.0 | React support for Vite |
| PostCSS | - | CSS processing |

### **Additional Libraries**
- **remixicon** - Icon library for UI elements
- **meshline** - Custom line rendering for Three.js
- **ogl** - Minimal WebGL library

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (v2.0.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bintang270802/PortfolioMe.git
   cd PortfolioMe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration (see [Configuration](#️-configuration))

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration (Optional - App works in demo mode without this)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Google OAuth (Optional)
VITE_GOOGLE_OAUTH_ENABLED=false

# Analytics (Optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_DISABLE_ANALYTICS=false
```

### Supabase Setup (Optional)

The application works perfectly in **demo mode** without Supabase. For full chat functionality:

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run the SQL schema** (see `SUPABASE_SETUP.md`):
   ```sql
   -- Create messages table
   create table messages (
     id uuid default uuid_generate_v4() primary key,
     user_id uuid references auth.users not null,
     content text not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Enable Row Level Security
   alter table messages enable row level security;

   -- Create policies
   create policy "Messages are viewable by everyone"
     on messages for select
     using (true);

   create policy "Users can insert their own messages"
     on messages for insert
     with check (auth.uid() = user_id);
   ```

3. **Get your credentials**
   - Project URL: `https://your-project.supabase.co`
   - Anon Key: Found in Project Settings → API

4. **Update `.env.local`** with your credentials

5. **Configure authentication providers** (optional)
   - Go to Authentication → Providers in Supabase dashboard
   - Enable desired providers (Google, GitHub, etc.)

### Vercel Deployment

For production deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
3. **Deploy** - Vercel will automatically build and deploy

---

## 📁 Project Structure

```
PortfolioMe/
├── public/                      # Static assets
│   ├── assets/
│   │   ├── companies/          # Company logos
│   │   ├── proyek/             # Project screenshots
│   │   ├── sertifikat/         # Certificate images
│   │   ├── tools/              # Technology icons
│   │   ├── bintang.jpeg        # Profile photo
│   │   ├── card.glb            # 3D model
│   │   ├── lanyard.png         # Lanyard texture
│   │   └── CV.pdf              # Resume/CV
│   └── favicon.ico
│
├── src/
│   ├── components/             # React components
│   │   ├── BlurText/          # Animated blur text
│   │   ├── ChromaGrid/        # Project grid with effects
│   │   ├── CountUp/           # Number counter animation
│   │   ├── DarkVeil/          # Background effects
│   │   ├── Dock/              # Navigation dock
│   │   ├── GlassIcons/        # Glass morphism icons
│   │   ├── Lanyard/           # 3D lanyard card
│   │   ├── ProfileCard/       # Interactive profile card
│   │   ├── ProjectFilter/     # Project filtering
│   │   ├── ProjectModal/      # Project details modal
│   │   ├── RotatingText/      # Text rotation animation
│   │   ├── ScrambledText/     # Scramble text effect
│   │   ├── ScrollReveal/      # Scroll-based animations
│   │   ├── ShinyText/         # Shiny text effect
│   │   ├── SplitText/         # Text splitting animation
│   │   ├── Toast/             # Notification system
│   │   ├── CertificateCard.jsx
│   │   ├── CertificateSection.jsx
│   │   ├── ChatRoomSupabase.jsx
│   │   ├── ContactForm.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── ExperienceCard.jsx
│   │   ├── ExperienceModal.jsx
│   │   ├── ExperienceTimeline.jsx
│   │   ├── Footer.jsx
│   │   ├── LanguageToggle.jsx
│   │   ├── Navbar.jsx
│   │   ├── PreLoader.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── UserAvatar.jsx
│   │   └── WhatsAppInput.jsx
│   │
│   ├── contexts/              # React contexts
│   │   ├── language.js        # Language context definition
│   │   └── LanguageContext.jsx # Language provider
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAnalytics.js    # Analytics tracking
│   │   ├── useLanguage.js     # Language switching
│   │   ├── useSmoothScroll.js # Smooth scrolling
│   │   └── useToast.js        # Toast notifications
│   │
│   ├── translations/          # Multi-language support
│   │   └── index.js           # Translation strings
│   │
│   ├── utils/                 # Utility functions
│   │   ├── analytics.js       # Analytics utilities
│   │   ├── avatarUtils.js     # Avatar helpers
│   │   └── validation.js      # Form validation
│   │
│   ├── App.jsx                # Main application component
│   ├── data.js                # Application data (projects, skills, etc.)
│   ├── index.css              # Global styles
│   ├── main.jsx               # Application entry point
│   └── supabase.js            # Supabase configuration
│
├── scripts/
│   └── copy-index.js          # Build script for 404 page
│
├── .env.example               # Environment variables template
├── .env.local                 # Local environment variables (gitignored)
├── .gitignore                 # Git ignore rules
├── CHANGELOG.md               # Change history
├── CONTRIBUTING.md            # Contribution guidelines
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── LICENSE                    # MIT License
├── package.json               # Dependencies and scripts
├── PERBAIKAN_FINAL.md         # Final fixes documentation
├── README.md                  # This file
├── SUPABASE_SETUP.md          # Supabase setup guide
├── vercel.json                # Vercel configuration
└── vite.config.js             # Vite configuration
```

---

## 🎨 Customization

### 1. Personal Information

Edit `src/data.js` to update your personal information:

```javascript
// Update profile information
export const profileInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  // ... more fields
};

// Update projects
export const listProyek = [
  {
    id: 1,
    title: { id: "Project Title ID", en: "Project Title EN" },
    // ... more fields
  },
];

// Update skills, certificates, experience, etc.
```

### 2. Styling

**Tailwind CSS**: Modify utility classes directly in components

**Custom CSS**: Add custom styles in component-specific CSS files or `src/index.css`

**Theme Colors**: Update Tailwind configuration in `tailwind.config.js`

### 3. Assets

Replace files in `public/assets/`:
- **Profile photo**: `bintang.jpeg`
- **CV/Resume**: `CV.pdf`
- **Project images**: `proyek/`
- **Certificate images**: `sertifikat/`
- **Company logos**: `companies/`
- **Technology icons**: `tools/`

### 4. Translations

Add or modify translations in `src/translations/index.js`:

```javascript
export const translations = {
  id: { /* Indonesian translations */ },
  en: { /* English translations */ },
  // Add more languages
};
```

---

## 📦 Build & Deploy

### Development

```bash
# Start development server with hot reload
npm run dev

# Run linter
npm run lint

# Preview production build locally
npm run preview
```

### Production Build

```bash
# Build for production
npm run build

# Output will be in the 'dist' folder
```

### Deployment Options

#### **Vercel (Recommended)**
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy automatically

#### **Netlify**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables

#### **GitHub Pages**
```bash
npm run deploy
```

### Build Optimization

The production build includes:
- ✅ Code splitting and lazy loading
- ✅ Asset optimization and compression
- ✅ Tree shaking for smaller bundle size
- ✅ CSS purging with Tailwind
- ✅ Image optimization
- ✅ Minification and uglification

**Bundle Size**: ~1.2 MB (gzipped: ~350 KB)

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Guidelines

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

### Code Style

- Follow ESLint configuration
- Use meaningful component and variable names
- Add comments for complex logic
- Write clean, readable code
- Test your changes thoroughly

### Reporting Issues

Found a bug or have a feature request? Please open an issue on GitHub with:
- Clear description of the problem/feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Tri Bintang Saputra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 📞 Contact

<div align="center">

### **Tri Bintang Saputra**

**Full-Stack Developer | Web Developer | Tech Enthusiast**

[![Website](https://img.shields.io/badge/🌐_Website-bintangdev.vercel.app-blue?style=for-the-badge)](https://bintangdev.vercel.app)
[![Email](https://img.shields.io/badge/📧_Email-tribintangsaputra03@gmail.com-red?style=for-the-badge)](mailto:tribintangsaputra03@gmail.com)
[![LinkedIn](https://img.shields.io/badge/💼_LinkedIn-Tri_Bintang_Saputra-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/tribintangsaputra)
[![GitHub](https://img.shields.io/badge/🐙_GitHub-@Bintang270802-181717?style=for-the-badge&logo=github)](https://github.com/Bintang270802)
[![WhatsApp](https://img.shields.io/badge/📱_WhatsApp-Contact_Me-25D366?style=for-the-badge&logo=whatsapp)](https://wa.me/6285894036266)

</div>

---

## 🙏 Acknowledgments

Special thanks to:
- **React Team** for the amazing library
- **Vite Team** for the blazing fast build tool
- **Supabase** for the excellent backend platform
- **Tailwind CSS** for the utility-first framework
- **Three.js Community** for 3D graphics support
- **Open Source Community** for inspiration and resources

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Bintang270802/PortfolioMe?style=social)
![GitHub forks](https://img.shields.io/github/forks/Bintang270802/PortfolioMe?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Bintang270802/PortfolioMe?style=social)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with ❤️ and ☕ by [Tri Bintang Saputra](https://github.com/Bintang270802)**

*Last Updated: February 2026*

</div>
