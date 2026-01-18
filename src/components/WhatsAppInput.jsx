import { useState, useEffect } from 'react';
import { FiPhone, FiCheck, FiX, FiExternalLink, FiMessageCircle } from 'react-icons/fi';

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

  // Validate Indonesian phone number
  const validatePhoneNumber = (phone) => {
    // Remove formatting
    const digits = phone.replace(/\D/g, '');
    
    // Indonesian mobile numbers: 8xx-xxxx-xxxx (10-12 digits after 8)
    // Common prefixes: 811, 812, 813, 814, 815, 816, 817, 818, 819, 821, 822, 823, 831, 832, 833, 838, 851, 852, 853, 855, 856, 857, 858, 859, 877, 878, 881, 882, 883, 884, 885, 886, 887, 888, 889, 895, 896, 897, 898, 899
    const indonesianMobileRegex = /^8[1-9][0-9]{8,10}$/;
    
    return indonesianMobileRegex.test(digits);
  };

  const handleInputChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue(formatted);
    
    const valid = validatePhoneNumber(formatted);
    setIsValid(valid);
    
    if (onValidChange) {
      onValidChange(valid, formatted);
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
    <div className="space-y-2">
      <div className="relative">
        {/* Country Code Prefix */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <div className="flex items-center gap-2">
            <FiMessageCircle className="w-4 h-4 text-green-400" />
            <span className="text-zinc-400 text-sm sm:text-base">+62</span>
          </div>
        </div>

        {/* Input Field */}
        <input
          type="tel"
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full bg-zinc-800/50 border rounded-xl pl-16 pr-12 py-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base ${
            value.length > 0
              ? isValid
                ? 'border-green-500/50 focus:border-green-500/70 focus:ring-green-500/20'
                : 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20'
              : 'border-zinc-600/50 focus:border-violet-500/50 focus:ring-violet-500/20'
          } ${className}`}
          required={required}
        />

        {/* Validation Icon */}
        {value.length > 0 && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            {isValid ? (
              <FiCheck className="w-5 h-5 text-green-400" />
            ) : (
              <FiX className="w-5 h-5 text-red-400" />
            )}
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className="flex items-center justify-between">
        <p className={`text-xs mt-1 ${
          value.length > 0
            ? isValid
              ? 'text-green-400'
              : 'text-red-400'
            : 'text-zinc-400'
        }`}>
          {value.length > 0
            ? isValid
              ? `✓ Nomor valid: ${getFullPhoneNumber()}`
              : '✗ Format nomor tidak valid'
            : helperText
          }
        </p>

        {/* WhatsApp Preview Button */}
        {showPreview && (
          <button
            type="button"
            onClick={openWhatsApp}
            className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 transition-colors duration-200"
          >
            <span>Test WhatsApp</span>
            <FiExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Format Examples */}
      {!isValid && value.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-2">
          <p className="text-red-300 text-xs font-medium mb-2">Contoh format yang benar:</p>
          <div className="space-y-1 text-xs text-red-200">
            <div>• 812-3456-7890 (Telkomsel)</div>
            <div>• 821-2345-6789 (Telkomsel)</div>
            <div>• 851-2345-6789 (Telkomsel)</div>
            <div>• 877-1234-5678 (XL)</div>
            <div>• 895-1234-5678 (Three)</div>
          </div>
        </div>
      )}

      {/* Success Preview */}
      {showPreview && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mt-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-xs font-medium">Nomor WhatsApp siap digunakan</p>
              <p className="text-green-200 text-xs mt-1">{getFullPhoneNumber()}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <FiMessageCircle className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}