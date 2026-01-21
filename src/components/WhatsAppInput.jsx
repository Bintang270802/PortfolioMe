import { useState, useEffect } from 'react';
import { validateWhatsAppNumber } from '../utils/validation';

export default function WhatsAppInput({ 
  name = "WhatsApp",
  placeholder = "812-3456-7890",
  helperText = "Format: 812-3456-7890 (tanpa +62)",
  required = false,
  className = "",
  onValidChange = null
}) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  // Format phone number as user types
  const formatPhoneNumber = (input) => {
    // Remove all non-digits
    const digits = input.replace(/\D/g, '');
    
    // Limit to 12 digits (Indonesian phone numbers)
    const limitedDigits = digits.slice(0, 12);
    
    // Format based on length
    if (limitedDigits.length <= 3) {
      return limitedDigits;
    } else if (limitedDigits.length <= 7) {
      return limitedDigits.replace(/(\d{3})(\d+)/, '$1-$2');
    } else {
      return limitedDigits.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
    }
  };

  const handleInputChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue(formatted);
    
    // Use validation utility
    const validation = validateWhatsAppNumber(formatted);
    setIsValid(validation.isValid);
    setError(validation.error || '');
    
    if (onValidChange) {
      onValidChange(validation.isValid, formatted);
    }
  };

  const getFullPhoneNumber = () => {
    const digits = value.replace(/\D/g, '');
    return `+62${digits}`;
  };

  const openWhatsApp = () => {
    if (isValid) {
      const fullNumber = getFullPhoneNumber();
      window.open(`https://wa.me/${fullNumber.replace('+', '')}`, '_blank');
    }
  };

  useEffect(() => {
    if (isValid && value.length > 0) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  }, [isValid, value]);

  return (
    <div className="space-y-3">
      {/* Main Input Container */}
      <div className="relative group">
        {/* Country Code Prefix */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <div className="flex items-center gap-2 bg-zinc-800/80 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-white text-sm font-medium">+62</span>
          </div>
        </div>

        {/* Input Field */}
        <input
          type="tel"
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full bg-zinc-900/50 backdrop-blur-sm border rounded-xl pl-16 pr-4 py-4 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 text-base font-medium ${
            value.length > 0
              ? isValid
                ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500/20 bg-green-500/5'
                : 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20 bg-red-500/5'
              : 'border-zinc-600/50 focus:border-violet-500/70 focus:ring-violet-500/20 group-hover:border-zinc-500/70'
          } ${className}`}
          required={required}
          aria-describedby={`${name}-helper`}
          aria-invalid={value.length > 0 && !isValid}
        />
      </div>

      {/* Status and Helper Section */}
      <div className="space-y-2">
        {/* Helper Text */}
        <div className="flex items-center justify-between">
          <p 
            id={`${name}-helper`}
            className={`text-sm transition-colors duration-200 ${
              value.length > 0
                ? isValid
                  ? 'text-green-400'
                  : 'text-red-400'
                : 'text-zinc-400'
            }`}
          >
            {value.length > 0
              ? isValid
                ? `Nomor valid: ${getFullPhoneNumber()}`
                : error || 'Format nomor tidak valid'
              : helperText
            }
          </p>

          {/* WhatsApp Test Button */}
          {showPreview && (
            <button
              type="button"
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 hover:border-green-500/50 text-green-400 hover:text-green-300 text-sm font-medium rounded-lg transition-all duration-200"
              aria-label="Test WhatsApp number"
            >
              <span>Test</span>
            </button>
          )}
        </div>

        {/* Format Examples - Only show when there's an error */}
        {!isValid && value.length > 0 && (
          <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-4">
            <div className="flex-1">
              <p className="text-red-300 text-sm font-medium mb-2">Contoh format yang benar:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-red-200/80">
                <div>812-3456-7890</div>
                <div>821-2345-6789</div>
                <div>851-2345-6789</div>
                <div>877-1234-5678</div>
              </div>
            </div>
          </div>
        )}

        {/* Success Preview - More compact and elegant */}
        {showPreview && (
          <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-green-300 text-sm font-medium">Nomor WhatsApp siap digunakan</p>
                <p className="text-green-200/80 text-sm font-mono">{getFullPhoneNumber()}</p>
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <span className="text-xs font-medium">Ready</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}