import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useUploadVideoModalStore } from '../store/uploadVideoModalStore';
import FileUpload from './common/FileUpload';
import Button from './common/Button';

interface UploadVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadVideoModal: React.FC<UploadVideoModalProps> = ({ isOpen, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Zustand store
  const {
    selectedFile,
    isDragOver,
    isUploading,
    uploadProgress,
    uploadComplete,
    setSelectedFile,
    setIsDragOver,
    resetUploadState,
    formatFileSize,
    handleUpload
  } = useUploadVideoModalStore();

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetUploadState();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Full Screen Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      />
      
      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-[10000]">
        <div 
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Upload Video</h2>
            <Button variant="ghost" onClick={handleClose}>
              ×
            </Button>
          </div>

          {/* Modal Content */}
          <div className="p-8">
            <div className="text-center">
              {/* Upload Area */}
              <FileUpload
                selectedFile={selectedFile}
                isDragOver={isDragOver}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
                uploadComplete={uploadComplete}
                acceptedTypes="video/*"
                onFileSelect={handleFileSelect}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onRemoveFile={removeFile}
                formatFileSize={formatFileSize}
                placeholder="Drag and drop your video file here, or"
                supportedFormats="Supported formats: MP4, AVI, MOV, WMV"
              />

              {/* Upload Button */}
              <div className="mt-8">
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading || uploadComplete}
                  loading={isUploading}
                  size="lg"
                >
                  {isUploading ? 'Uploading...' : uploadComplete ? 'Upload Complete' : 'Upload video'}
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Upload Guidelines</h3>
                <ul className="text-sm text-blue-800 space-y-1 text-left max-w-md mx-auto">
                  <li>• Ensure video quality is clear for accurate analysis</li>
                  <li>• Include relevant match information in the filename</li>
                  <li>• Videos will be processed automatically after upload</li>
                  <li>• You'll receive a notification when processing is complete</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default UploadVideoModal;