# 🚀 PortfolioMe

> Modern Personal Portfolio Website built with React.js, Vite, and Supabase

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://bintangdev.vercel.app)
[![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=for-the-badge&logo=supabase)](https://supabase.com/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Live Demo](#-live-demo)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🌟 Overview

**PortfolioMe** is a modern, responsive personal portfolio website that showcases professional profiles, certificates, work experience, skills, and projects in one comprehensive platform. Built with cutting-edge technologies for optimal performance and user experience.

### ✨ Key Highlights

- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- � **Secure Backend** - Powered by Supabase with PostgreSQL database
- 💬 **Real-time Chat** - Interactive chat room with authentication
- 🌐 **Multi-language** - Support for Indonesian and English
- � **SEO Optimized** - Meta tags and structured data for better visibility

## 🚀 Features

### 🏠 **Home Section**
- Professional introduction with animated text
- Call-to-action buttons for CV download and contact
- Interactive 3D elements and smooth scrolling

### 🏆 **Certificates**
- Dynamic certificate gallery with filtering
- Certificate details with issuer and date information
- Responsive card layout with hover effects

### 💼 **Work Experience**
- Interactive timeline of professional experience
- Detailed job descriptions and company information
- Skills and technologies used in each role

### 🛠️ **Skills & Technologies**
- Categorized skill showcase (Frontend, Backend, Tools)
- Visual progress indicators and technology icons
- Interactive skill cards with descriptions

### � **Projects Portfolio**
- Project filtering by technology and category
- Live demo links and GitHub repositories
- Detailed project descriptions and tech stacks
- Development status indicators (NEW, DEV badges)

### � **Live Chat Room**
- Real-time messaging with Supabase integration
- Multiple authentication methods (Magic Link, Email, Google OAuth)
- Demo mode fallback when backend is not configured
- User avatars and message history

### 📬 **Contact Form**
- Secure contact form with validation
- Direct integration with backend storage
- WhatsApp integration for instant messaging
- Social media links and professional contacts

## �️i Tech Stack

### **Frontend**
- **React.js 18.x** - Modern UI library with hooks
- **Vite 5.x** - Next-generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics and animations
- **React Three Fiber** - React renderer for Three.js
- **GSAP** - Professional animation library
- **AOS** - Animate On Scroll library

### **Backend & Services**
- **Supabase** - Backend-as-a-Service platform
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication & authorization
  - File storage
  - Auto-generated REST API

### **Development Tools**
- **ESLint** - Code linting and formatting
- **Git** - Version control
- **GitHub** - Repository hosting
- **Vercel** - Deployment and hosting
- **VS Code** - Development environment

## 🌐 Live Demo

Visit the live website: **[bintangdev.vercel.app](https://bintangdev.vercel.app)**

### Demo Credentials (Chat Room)
- **Magic Link**: Use any valid email address
- **Demo Mode**: Available when Supabase is not configured

## � Installatiokn

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Clone Repository
```bash
git clone https://github.com/Bintang270802/PortfolioMe.git
cd PortfolioMe
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## ⚙️ Environment Setup

### 1. Create Environment File
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth (Optional)
VITE_GOOGLE_OAUTH_ENABLED=false

# Analytics (Optional)
VITE_GA_MEASUREMENT_ID=your_ga_measurement_id
VITE_DISABLE_ANALYTICS=false
```

### 2. Supabase Setup (Optional)
For full chat room functionality, set up Supabase:

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `SUPABASE_SETUP.md`
3. Get your project URL and anon key
4. Update environment variables
5. Configure authentication providers if needed

**Note**: The application works in demo mode without Supabase configuration.

### 3. Production Deployment
For Vercel deployment, add environment variables in your Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add the same variables from `.env.local`
- Redeploy the project

## 🎯 Usage

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Customization
1. **Personal Information**: Update `src/data.js` with your details
2. **Styling**: Modify Tailwind classes or add custom CSS
3. **Components**: Customize React components in `src/components/`
4. **Assets**: Replace images and documents in `public/assets/`

## 📁 Project Structure

```
PortfolioMe/
├── public/
│   ├── assets/
│   │   ├── companies/      # Company logos
│   │   ├── proyek/         # Project screenshots
│   │   ├── sertifikat/     # Certificate images
│   │   └── tools/          # Technology icons
│   └── favicon.ico
├── src/
│   ├── components/         # React components
│   │   ├── BlurText/       # Text animation components
│   │   ├── ChromaGrid/     # Project grid component
│   │   ├── Dock/           # Navigation dock
│   │   ├── Lanyard/        # 3D card component
│   │   └── ...
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   ├── translations/       # Multi-language support
│   ├── utils/              # Utility functions
│   ├── data.js            # Application data
│   ├── supabase.js        # Supabase configuration
│   └── main.jsx           # Application entry point
├── .env.example           # Environment variables template
├── .env.local            # Local environment variables
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow ESLint configuration
- Use meaningful component and variable names
- Add comments for complex logic
- Maintain consistent formatting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Tri Bintang Saputra**

- 🌐 **Website**: [bintangdev.vercel.app](https://bintangdev.vercel.app)
- 📧 **Email**: tribintangsaputra@gmail.com
- 💼 **LinkedIn**: [Tri Bintang Saputra](https://linkedin.com/in/tribintangsaputra)
- 🐙 **GitHub**: [@Bintang270802](https://github.com/Bintang270802)
- 📱 **WhatsApp**: [Contact via WhatsApp](https://wa.me/6281234567890)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Tri Bintang Saputra](https://github.com/Bintang270802)

</div>