import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessAlertProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({
  isVisible,
  message,
  onClose,
  autoHideDuration = 5000
}) => {
  useEffect(() => {
    if (isVisible && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDuration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[10001] animate-in slide-in-from-top-2 duration-300">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[400px] max-w-md">
        <div className="flex items-center space-x-3">
          {/* Success Icon with Green Background */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          
          {/* Message */}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessAlert;