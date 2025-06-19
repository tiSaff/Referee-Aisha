import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface PageAlertProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
}

const PageAlert: React.FC<PageAlertProps> = ({
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
    <div className="mb-6 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Success Icon */}
            <div className="flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            
            {/* Message */}
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">{message}</p>
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 text-green-600 hover:text-green-800 transition-colors rounded-full hover:bg-green-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageAlert;