import { useState } from 'react';
import { validateEmail, validateContactForm, sanitizeInput } from '../utils/validation';
import WhatsAppInput from './WhatsAppInput';
import ShinyText from './ShinyText/ShinyText';

export default function ContactForm({ t }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (field, value) => {
    const sanitizedValue = sanitizeInput(value, field === 'message' ? 2000 : 1000);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Clear error when user starts typing
    if (errors[field] && touched[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'name':
        if (!value || value.trim().length < 2) {
          error = 'Name must be at least 2 characters long';
        } else if (value.length > 100) {
          error = 'Name must be less than 100 characters';
        }
        break;
        
      case 'email':
        const emailValidation = validateEmail(value);
        if (!emailValidation.isValid) {
          error = emailValidation.error;
        }
        break;
        
      case 'message':
        if (!value || value.trim().length < 10) {
          error = 'Message must be at least 10 characters long';
        } else if (value.length > 2000) {
          error = 'Message must be less than 2000 characters';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const handleWhatsAppValidation = (isValid, value) => {
    setFormData(prev => ({ ...prev, whatsapp: value }));
    if (!isValid && value.length > 0) {
      setErrors(prev => ({ ...prev, whatsapp: 'Invalid WhatsApp number format' }));
    } else {
      setErrors(prev => ({ ...prev, whatsapp: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate all fields
    const validation = validateContactForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setTouched({
        name: true,
        email: true,
        message: true,
        whatsapp: true
      });
      setIsSubmitting(false);
      setSubmitStatus({
        type: 'error',
        message: 'Please fix the errors above before submitting.'
      });
      return;
    }

    try {
      // Create FormData for FormSubmit
      const submitData = new FormData();
      submitData.append('Name', formData.name);
      submitData.append('Email', formData.email);
      submitData.append('WhatsApp', formData.whatsapp || 'Not provided');
      submitData.append('message', formData.message);
      submitData.append('_subject', `New message from ${formData.name}`);
      submitData.append('_captcha', 'false');
      submitData.append('_template', 'table');

      const response = await fetch('https://formsubmit.co/tribintangsaputra03@gmail.com', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          whatsapp: '',
          message: ''
        });
        setErrors({});
        setTouched({});
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact me directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <form
        onSubmit={handleSubmit}
        className="relative bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 group-hover:border-blue-500/50 transition-all duration-500"
        noValidate
      >
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-blue-300 font-medium">Send Message</span>
        </div>

        {/* Submit Status */}
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg border ${
            submitStatus.type === 'success'
              ? 'bg-green-500/10 border-green-500/30 text-green-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}>
            <p className="text-sm">{submitStatus.message}</p>
          </div>
        )}
        
        <div className="space-y-4 sm:space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="contact-name" className="block text-sm font-semibold text-white">
              {t('contact.form.fullName')} <span className="text-red-400">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder={t('contact.form.namePlaceholder')}
              className={`w-full bg-zinc-800/50 border rounded-xl px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base ${
                errors.name && touched.name
                  ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20'
                  : 'border-zinc-600/50 focus:border-violet-500/50 focus:ring-violet-500/20'
              }`}
              required
              aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
              aria-invalid={errors.name && touched.name}
            />
            {errors.name && touched.name && (
              <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="contact-email" className="block text-sm font-semibold text-white">
              {t('contact.form.email')} <span className="text-red-400">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder={t('contact.form.emailPlaceholder')}
              className={`w-full bg-zinc-800/50 border rounded-xl px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base ${
                errors.email && touched.email
                  ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20'
                  : 'border-zinc-600/50 focus:border-violet-500/50 focus:ring-violet-500/20'
              }`}
              required
              aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
              aria-invalid={errors.email && touched.email}
            />
            {errors.email && touched.email && (
              <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          
          {/* WhatsApp Field */}
          <div className="space-y-2">
            <label htmlFor="contact-whatsapp" className="block text-sm font-semibold text-white">
              {t('contact.form.whatsapp')} <span className="text-zinc-400">(Optional)</span>
            </label>
            <WhatsAppInput
              name="WhatsApp"
              placeholder={t('contact.form.whatsappPlaceholder')}
              helperText={t('contact.form.whatsappHelper')}
              onValidChange={handleWhatsAppValidation}
            />
            {errors.whatsapp && (
              <p className="text-red-400 text-xs mt-1" role="alert">
                {errors.whatsapp}
              </p>
            )}
          </div>
          
          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="contact-message" className="block text-sm font-semibold text-white">
              {t('contact.form.message')} <span className="text-red-400">*</span>
            </label>
            <textarea
              id="contact-message"
              rows="6"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              placeholder={t('contact.form.messagePlaceholder')}
              className={`w-full bg-zinc-800/50 border rounded-xl px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none text-sm sm:text-base ${
                errors.message && touched.message
                  ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20'
                  : 'border-zinc-600/50 focus:border-violet-500/50 focus:ring-violet-500/20'
              }`}
              required
              aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
              aria-invalid={errors.message && touched.message}
            />
            <div className="flex justify-between items-center">
              {errors.message && touched.message && (
                <p id="message-error" className="text-red-400 text-xs" role="alert">
                  {errors.message}
                </p>
              )}
              <p className="text-zinc-400 text-xs ml-auto">
                {formData.message.length}/2000
              </p>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 disabled:from-violet-800 disabled:to-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25 disabled:transform-none disabled:shadow-none text-sm sm:text-base"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Sending...</span>
              </div>
            ) : (
              <ShinyText text={t('contact.form.send')} disabled={false} speed={3} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}