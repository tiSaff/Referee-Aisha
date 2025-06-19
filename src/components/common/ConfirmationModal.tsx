import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  type = 'danger',
  loading = false
}) => {
  if (!isOpen) return null;

  const getIconColor = () => {
    switch (type) {
      case 'danger':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-red-600';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'info':
        return 'bg-blue-100';
      default:
        return 'bg-red-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${getBackgroundColor()} rounded-full flex items-center justify-center`}>
              <AlertTriangle className={`w-5 h-5 ${getIconColor()}`} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-6 text-base leading-relaxed">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {cancelText}
            </Button>
            <Button
              variant="danger"
              onClick={onConfirm}
              loading={loading}
              className="w-full sm:w-auto"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;