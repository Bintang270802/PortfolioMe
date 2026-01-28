# Contributing to PortfolioMe

Thank you for your interest in contributing to PortfolioMe! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 1. Fork the Repository
- Click the "Fork" button on the top right of the repository page
- Clone your forked repository to your local machine

```bash
git clone https://github.com/your-username/PortfolioMe.git
cd PortfolioMe
```

### 2. Set Up Development Environment
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes
- Write clean, readable code
- Follow the existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly

### 5. Commit Your Changes
```bash
git add .
git commit -m "feat: add your feature description"
# or
git commit -m "fix: fix your bug description"
```

### 6. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Screenshots if applicable
- Reference to any related issues

## 📋 Development Guidelines

### Code Style
- Use meaningful variable and function names
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Maintain consistent indentation (2 spaces)
- Remove unused imports and variables

### Commit Messages
Follow conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

### Component Structure
```jsx
// Component imports
import { useState, useEffect } from 'react';
import { ComponentName } from './ComponentName';

// Component definition
const MyComponent = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState(null);
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div className="component-container">
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots or screen recordings
- Browser and device information
- Console error messages (if any)

## 💡 Feature Requests

For feature requests, please provide:
- Clear description of the feature
- Use case and benefits
- Mockups or examples (if applicable)
- Implementation suggestions (optional)

## 🧪 Testing

Before submitting your contribution:
- Test your changes in development mode
- Check for console errors
- Test responsive design on different screen sizes
- Verify that existing functionality still works

## 📝 Documentation

If your contribution affects:
- API or component interfaces
- Configuration options
- Setup procedures
- User workflows

Please update the relevant documentation in:
- README.md
- Code comments
- Component prop types
- Setup guides

## 🚀 Deployment

The project uses:
- **Vercel** for hosting and deployment
- **Supabase** for backend services
- **GitHub Actions** for CI/CD (if configured)

Make sure your changes don't break the production build:
```bash
npm run build
npm run preview
```

## 📞 Questions and Support

If you have questions about contributing:
- Open an issue with the "question" label
- Contact the maintainer: tribintangsaputra@gmail.com
- Check existing issues and discussions

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors graph

## 📄 License

By contributing to PortfolioMe, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to PortfolioMe! 🚀