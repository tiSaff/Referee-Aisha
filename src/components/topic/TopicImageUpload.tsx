import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface TopicImageUploadProps {
  selectedFile: File | null;
  isDragOver: boolean;
  editingTopic?: any;
  onFileSelect: (file: File) => void;
  onDragOver: (event: React.DragEvent) => void;
  onDragLeave: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
  onRemoveFile: () => void;
}

const TopicImageUpload: React.FC<TopicImageUploadProps> = ({
  selectedFile,
  isDragOver,
  editingTopic,
  onFileSelect,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemoveFile
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Topic Image
      </label>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 sm:p-12 transition-all duration-200 text-center
          ${isDragOver 
            ? 'bg-green-50' 
            : selectedFile || editingTopic?.image
              ? 'bg-green-50' 
              : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }
        `}
        style={{
          borderColor: isDragOver || selectedFile || editingTopic?.image ? '#2a835f' : undefined
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {!selectedFile && !editingTopic?.image ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <Upload className="w-6 sm:w-8 h-6 sm:h-8 text-gray-500" />
            </div>
            <div>
              <p className="text-sm sm:text-lg text-gray-600 mb-2">
                Drag and drop a file here or click
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileInputChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="font-medium underline cursor-pointer transition-colors hover:opacity-80"
                style={{ color: '#2a835f' }}
              >
                browse to choose a file
              </label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {selectedFile ? (
              <img 
                src={URL.createObjectURL(selectedFile)} 
                alt="Preview" 
                className="w-20 sm:w-32 h-20 sm:h-32 object-cover rounded-lg"
              />
            ) : editingTopic?.image ? (
              <img 
                src={editingTopic.image} 
                alt="Current" 
                className="w-20 sm:w-32 h-20 sm:h-32 object-cover rounded-lg"
              />
            ) : null}
            
            <div className="text-center">
              <p className="font-medium text-gray-900">
                {selectedFile ? selectedFile.name : 'Current Image'}
              </p>
              {selectedFile && (
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onRemoveFile}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicImageUpload;