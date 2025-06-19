import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  selectedFile: File | null;
  isDragOver: boolean;
  isUploading: boolean;
  uploadProgress: number;
  uploadComplete: boolean;
  acceptedTypes: string;
  maxSize?: string;
  onFileSelect: (file: File) => void;
  onDragOver: (event: React.DragEvent) => void;
  onDragLeave: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
  onRemoveFile: () => void;
  formatFileSize: (bytes: number) => string;
  placeholder?: string;
  supportedFormats?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  selectedFile,
  isDragOver,
  isUploading,
  uploadProgress,
  uploadComplete,
  acceptedTypes,
  maxSize = "500MB",
  onFileSelect,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemoveFile,
  formatFileSize,
  placeholder = "Drag and drop your file here, or",
  supportedFormats = "Supported formats"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 text-center
        ${isDragOver 
          ? 'bg-green-50' 
          : selectedFile 
            ? 'bg-green-50' 
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
        }
      `}
      style={{
        borderColor: isDragOver || selectedFile ? '#2a835f' : undefined
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {!selectedFile ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-500" />
          </div>
          <div>
            <p className="text-lg text-gray-600 mb-2">{placeholder}</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="font-medium underline transition-colors hover:opacity-80"
              style={{ color: '#2a835f' }}
            >
              browse to choose a file
            </button>
          </div>
          <p className="text-sm text-gray-500">
            {supportedFormats} (Max size: {maxSize})
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          {uploadComplete ? (
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(42, 131, 95, 0.1)' }}
            >
              <Upload className="w-8 h-8" style={{ color: '#2a835f' }} />
            </div>
          ) : (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
          )}
          
          <div className="text-center">
            <p className="font-medium text-gray-900">{selectedFile.name}</p>
            <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
            
            {isUploading && (
              <div className="mt-4 w-64 mx-auto">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${uploadProgress}%`,
                      backgroundColor: '#2a835f'
                    }}
                  />
                </div>
              </div>
            )}
            
            {uploadComplete && (
              <p className="font-medium mt-2" style={{ color: '#2a835f' }}>
                Upload completed successfully!
              </p>
            )}
          </div>

          <button
            onClick={onRemoveFile}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;