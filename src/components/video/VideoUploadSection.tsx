import React, { useRef } from 'react';
import { Upload, Video, X } from 'lucide-react';

interface VideoUploadSectionProps {
  selectedFile: File | null;
  isDragOver: boolean;
  isUploading: boolean;
  uploadProgress: number;
  onFileSelect: (file: File) => void;
  onDragOver: (event: React.DragEvent) => void;
  onDragLeave: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
  onRemoveFile: () => void;
  formatFileSize: (bytes: number) => string;
}

const VideoUploadSection: React.FC<VideoUploadSectionProps> = ({
  selectedFile,
  isDragOver,
  isUploading,
  uploadProgress,
  onFileSelect,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemoveFile,
  formatFileSize
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Video (Optional)</h3>
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
              <p className="text-lg text-gray-600 mb-2">
                Drag and drop a new video file here, or
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="font-medium underline transition-colors hover:opacity-80"
                style={{ color: '#2a835f' }}
              >
                browse to choose a file
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Supported formats: MP4, AVI, MOV, WMV (Max size: 500MB)
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {isUploading ? (
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(42, 131, 95, 0.1)' }}
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#2a835f' }}></div>
              </div>
            ) : (
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(42, 131, 95, 0.1)' }}
              >
                <Video className="w-8 h-8" style={{ color: '#2a835f' }} />
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
            </div>

            {!isUploading && (
              <button
                onClick={onRemoveFile}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default VideoUploadSection;