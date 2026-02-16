# 📋 Code Standards - PortfolioMe

## 🎯 Tujuan Dokumen

Dokumen ini berisi standar coding yang harus diikuti untuk menjaga konsistensi dan kualitas kode dalam proyek PortfolioMe.

---

## 📝 Naming Conventions

### Variables & Functions
```javascript
// ✅ Good - camelCase
const userName = "John";
const isAuthenticated = true;
const getUserProfile = () => {};

// ❌ Bad
const user_name = "John";        // snake_case
const IsAuthenticated = true;    // PascalCase
const get_user_profile = () => {}; // snake_case
```

### Constants
```javascript
// ✅ Good - UPPER_SNAKE_CASE
const API_BASE_URL = "https://api.example.com";
const MAX_RETRY_ATTEMPTS = 3;
const AUTH_MODES = {
  GOOGLE: 'google',
  EMAIL: 'email',
};

// ❌ Bad
const apiBaseUrl = "...";        // camelCase
const maxRetryAttempts = 3;      // camelCase
```

### React Components
```javascript
// ✅ Good - PascalCase
function UserProfile() {}
const ChatMessage = () => {};
export default ProfileCard;

// ❌ Bad
function userProfile() {}        // camelCase
const chat_message = () => {};   // snake_case
```

### Files & Folders
```javascript
// ✅ Good
components/UserProfile.jsx       // PascalCase for components
hooks/useAuth.js                 // camelCase with 'use' prefix
utils/validation.js              // camelCase for utilities
data/constants.js                // camelCase

// ❌ Bad
components/user-profile.jsx      // kebab-case
hooks/AuthHook.js                // Missing 'use' prefix
utils/Validation.js              // PascalCase for non-component
```

---

## 🏗️ Project Structure

### Data Organization
```
src/data/
├── index.js          # Central export, re-exports from all files
├── constants.js      # Application constants (AUTH_MODES, LIMITS, etc.)
├── images.js         # Image imports
├── tools.js          # Technology stack data
├── projects.js       # Project portfolio data
├── certificates.js   # Certification data
└── experience.js     # Work experience data
```

### Component Organization
```
src/components/
├── ComponentName/
│   ├── ComponentName.jsx    # Main component
│   ├── ComponentName.css    # Component-specific styles (if needed)
│   └── index.js             # Re-export (optional)
└── SimpleComponent.jsx      # Simple components can be single file
```

### Hooks Organization
```
src/hooks/
├── useAuth.js               # Authentication logic
├── useMessages.js           # Message handling
├── useToast.js              # Toast notifications
└── useAnalytics.js          # Analytics tracking
```

---

## 📦 Import Order

```javascript
// 1. External dependencies
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// 2. Internal components
import ProfileCard from './components/ProfileCard/ProfileCard';
import Navbar from './components/Navbar';

// 3. Hooks
import { useAuth } from './hooks/useAuth';
import { useToast } from './hooks/useToast';

// 4. Utils & Helpers
import { validateEmail } from './utils/validation';
import { trackEvent } from './utils/analytics';

// 5. Data & Constants
import { tools, projects } from './data';
import { AUTH_MODES, VALIDATION_LIMITS } from './data/constants';

// 6. Styles
import './App.css';
import 'aos/dist/aos.css';
```

---

## 🎨 Code Style

### Function Declaration
```javascript
// ✅ Good - Arrow functions for simple functions
const add = (a, b) => a + b;
const greet = (name) => `Hello, ${name}!`;

// ✅ Good - Regular functions for complex logic
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}

// ✅ Good - Async/await for promises
const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
```

### React Components
```javascript
// ✅ Good - Functional components with hooks
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
    setLoading(false);
  }, [userId]);
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <ErrorMessage />;
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// ❌ Bad - Class components (avoid unless necessary)
class UserProfile extends React.Component {
  // ...
}
```

### Conditional Rendering
```javascript
// ✅ Good - Early returns
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
if (!data) return null;

return <DataDisplay data={data} />;

// ✅ Good - Ternary for simple conditions
{isLoggedIn ? <Dashboard /> : <LoginForm />}

// ✅ Good - Logical AND for conditional rendering
{showModal && <Modal />}

// ❌ Bad - Nested ternaries
{isLoggedIn ? (hasPermission ? <AdminPanel /> : <UserPanel />) : <LoginForm />}
```

---

## 🔧 Data Structure Standards

### Bilingual Data
```javascript
// ✅ Good - Consistent structure
{
  id: 1,
  name: {
    id: "Nama Indonesia",
    en: "English Name"
  },
  description: {
    id: "Deskripsi Indonesia",
    en: "English Description"
  }
}

// ❌ Bad - Inconsistent
{
  id: 1,
  nama: "Nama Indonesia",  // Mixed languages
  name_en: "English Name", // Inconsistent structure
}
```

### Required Fields
```javascript
// Tools/Technologies
{
  id: number,              // Required, unique
  image: string,           // Required, path to image
  name: string,            // Required
  description: string,     // Required
  delay: number,           // Required, for animations
}

// Projects
{
  id: number,              // Required, unique
  image: string,           // Required
  title: object,           // Required, { id, en }
  subtitle: object,        // Required, { id, en }
  fullDescription: object, // Required, { id, en }
  technologies: array,     // Required, array of strings
  borderColor: string,     // Required, hex color
  gradient: string,        // Required, CSS gradient
  url: string,             // Required, GitHub URL
  figmaUrl: string,        // Optional
  liveUrl: string,         // Optional
  year: string,            // Required
  platform: string,        // Required, use PLATFORMS constant
  status: string,          // Optional, use PROJECT_STATUS constant
  delay: number,           // Required
}
```

---

## 🛡️ Error Handling

### Try-Catch Pattern
```javascript
// ✅ Good - Comprehensive error handling
const fetchData = async () => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Fetch error:', error);
    return { data: null, error: error.message };
  }
};

// ❌ Bad - Silent failures
const fetchData = async () => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    // Silent failure - no error handling
  }
};
```

### Validation
```javascript
// ✅ Good - Early validation
function processUser(user) {
  if (!user) {
    return { success: false, error: 'User is required' };
  }
  
  if (!user.email) {
    return { success: false, error: 'Email is required' };
  }
  
  // Process user...
  return { success: true, data: processedUser };
}

// ❌ Bad - No validation
function processUser(user) {
  // Assumes user and user.email exist
  const email = user.email.toLowerCase();
  // ...
}
```

---

## 📚 Documentation

### JSDoc Comments
```javascript
/**
 * Validates an email address
 * @param {string} email - The email address to validate
 * @returns {Object} Validation result with isValid and error properties
 * @example
 * const result = validateEmail('test@example.com');
 * // { isValid: true, error: null }
 */
export const validateEmail = (email) => {
  // Implementation...
};
```

### Inline Comments
```javascript
// ✅ Good - Explain WHY, not WHAT
// Delay is needed to prevent rate limiting
await sleep(1000);

// Calculate discount based on user tier
// Premium users get 20%, regular users get 10%
const discount = user.isPremium ? 0.2 : 0.1;

// ❌ Bad - Obvious comments
// Set x to 5
const x = 5;

// Loop through items
for (const item of items) {
  // ...
}
```

---

## 🧪 Testing Standards

### File Naming
```
src/
├── components/
│   ├── Button.jsx
│   └── Button.test.jsx          # Test file next to component
├── utils/
│   ├── validation.js
│   └── validation.test.js       # Test file next to utility
```

### Test Structure
```javascript
import { describe, it, expect } from 'vitest';
import { validateEmail } from './validation';

describe('validateEmail', () => {
  it('should return valid for correct email', () => {
    const result = validateEmail('test@example.com');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });
  
  it('should return invalid for email without @', () => {
    const result = validateEmail('testexample.com');
    expect(result.isValid).toBe(false);
    expect(result.error).toBeTruthy();
  });
});
```

---

## 🚫 Anti-Patterns to Avoid

### 1. Magic Numbers/Strings
```javascript
// ❌ Bad
if (user.role === 'admin') { }
if (password.length < 6) { }

// ✅ Good
import { USER_ROLES, VALIDATION_LIMITS } from './constants';
if (user.role === USER_ROLES.ADMIN) { }
if (password.length < VALIDATION_LIMITS.PASSWORD_MIN_LENGTH) { }
```

### 2. Prop Drilling
```javascript
// ❌ Bad - Passing props through multiple levels
<App>
  <Header user={user} />
    <Nav user={user} />
      <UserMenu user={user} />
</App>

// ✅ Good - Use Context
const UserContext = createContext();
<UserContext.Provider value={user}>
  <App>
    <Header />
      <Nav />
        <UserMenu />
  </App>
</UserContext.Provider>
```

### 3. Large Components
```javascript
// ❌ Bad - 400+ lines component
function ChatRoom() {
  // 50 lines of state
  // 100 lines of effects
  // 200 lines of handlers
  // 50 lines of JSX
}

// ✅ Good - Split into smaller components
function ChatRoom() {
  return (
    <>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </>
  );
}
```

### 4. Unused Code
```javascript
// ❌ Bad
import { useState, useEffect, useMemo } from 'react'; // useMemo not used
const [count, setCount] = useState(0); // count not used

// ✅ Good
import { useState, useEffect } from 'react';
const [count, setCount] = useState(0);
// Use count in component
```

---

## ✅ Code Review Checklist

Before submitting code:

- [ ] No console.log statements (use proper logging)
- [ ] No unused imports or variables
- [ ] Consistent naming conventions
- [ ] Proper error handling
- [ ] JSDoc comments for complex functions
- [ ] No magic numbers/strings
- [ ] Responsive design tested
- [ ] Accessibility checked (ARIA labels, keyboard navigation)
- [ ] No ESLint warnings
- [ ] Code formatted with Prettier
- [ ] Tests written for new features
- [ ] Documentation updated

---

## 🔄 Refactoring Guidelines

### When to Refactor
- Component exceeds 200 lines
- Function exceeds 50 lines
- Duplicated code appears 3+ times
- Complex nested conditions (3+ levels)
- Poor performance identified

### How to Refactor
1. Write tests first (if not exist)
2. Make small, incremental changes
3. Test after each change
4. Update documentation
5. Get code review

---

## 📞 Questions?

If you have questions about these standards:
- Check REFACTORING_GUIDE.md
- Open a GitHub Discussion
- Contact: tribintangsaputra03@gmail.com

---

**Last Updated: February 2026**
