// Form validation utilities
import { useState } from 'react';

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true, error: null };
};

export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long' };
  }
  
  if (password.length > 128) {
    return { isValid: false, error: 'Password must be less than 128 characters' };
  }
  
  // Check for at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  if (!hasLetter || !hasNumber) {
    return { 
      isValid: false, 
      error: 'Password must contain at least one letter and one number' 
    };
  }
  
  return { isValid: true, error: null };
};

export const validateDisplayName = (displayName) => {
  if (!displayName) {
    return { isValid: false, error: 'Display name is required' };
  }
  
  if (displayName.trim().length < 2) {
    return { isValid: false, error: 'Display name must be at least 2 characters long' };
  }
  
  if (displayName.length > 50) {
    return { isValid: false, error: 'Display name must be less than 50 characters' };
  }
  
  // Check for valid characters (letters, numbers, spaces, basic punctuation)
  const validNameRegex = /^[a-zA-Z0-9\s\-_.]+$/;
  if (!validNameRegex.test(displayName)) {
    return { 
      isValid: false, 
      error: 'Display name can only contain letters, numbers, spaces, and basic punctuation' 
    };
  }
  
  return { isValid: true, error: null };
};

export const validateMessage = (message) => {
  if (!message) {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  
  const trimmedMessage = message.trim();
  
  if (trimmedMessage.length === 0) {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  
  if (trimmedMessage.length > 1000) {
    return { isValid: false, error: 'Message must be less than 1000 characters' };
  }
  
  return { isValid: true, error: null };
};

export const validateWhatsAppNumber = (number) => {
  if (!number) {
    return { isValid: false, error: 'WhatsApp number is required' };
  }
  
  // Remove all non-digit characters
  const cleanNumber = number.replace(/\D/g, '');
  
  if (cleanNumber.length < 10) {
    return { isValid: false, error: 'WhatsApp number must be at least 10 digits' };
  }
  
  if (cleanNumber.length > 15) {
    return { isValid: false, error: 'WhatsApp number must be less than 15 digits' };
  }
  
  // Check if it starts with country code (optional validation)
  const startsWithCountryCode = /^(62|1|44|49|33|39|34|7|81|86|91|55|52|54|56|57|58|51|53|506|507|508|509|590|591|592|593|594|595|596|597|598|599)/.test(cleanNumber);
  
  return { 
    isValid: true, 
    error: null, 
    cleanNumber,
    hasCountryCode: startsWithCountryCode
  };
};

export const sanitizeInput = (input, maxLength = 1000) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .substring(0, maxLength)
    .replace(/[<>]/g, ''); // Basic XSS prevention
};

export const validateContactForm = (formData) => {
  const errors = {};
  
  // Validate name
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  } else if (formData.name.length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }
  
  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }
  
  // Validate message
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  } else if (formData.message.length > 2000) {
    errors.message = 'Message must be less than 2000 characters';
  }
  
  // Validate WhatsApp (optional)
  if (formData.whatsapp) {
    const whatsappValidation = validateWhatsAppNumber(formData.whatsapp);
    if (!whatsappValidation.isValid) {
      errors.whatsapp = whatsappValidation.error;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Real-time validation hook for React components
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const validateField = (name, value) => {
    if (validationRules[name]) {
      const validation = validationRules[name](value);
      setErrors(prev => ({
        ...prev,
        [name]: validation.isValid ? null : validation.error
      }));
      return validation.isValid;
    }
    return true;
  };
  
  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };
  
  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, values[name]);
  };
  
  const validateAll = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach(name => {
      const validation = validationRules[name](values[name]);
      if (!validation.isValid) {
        newErrors[name] = validation.error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}));
    
    return isValid;
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    isValid: Object.keys(errors).every(key => !errors[key])
  };
};