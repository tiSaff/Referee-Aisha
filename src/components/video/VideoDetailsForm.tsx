import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { VideoData } from '../../types';
import { useEditVideoModalStore } from '../../store/editVideoModalStore';

interface VideoDetailsFormProps {
  editData: VideoData;
  onFieldChange: (field: string, value: string) => void;
  isPendingVideo: boolean;
  isPublishedVideo: boolean;
}

const VideoDetailsForm: React.FC<VideoDetailsFormProps> = ({
  editData,
  onFieldChange,
  isPendingVideo,
  isPublishedVideo
}) => {
  const { mainPhotoType, setMainPhotoType, mainPhotoFile, setMainPhotoFile } = useEditVideoModalStore();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  // File input reference
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Handle photo type change
  const handlePhotoTypeChange = (type: 'auto' | 'upload') => {
    setMainPhotoType(type);
    
    // Show/hide upload area based on selection
    const uploadArea = document.getElementById('photo-upload-area');
    if (uploadArea) {
      uploadArea.style.display = type === 'upload' ? 'block' : 'none';
    }
  };
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setMainPhotoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Initialize upload area visibility
  useEffect(() => {
    const uploadArea = document.getElementById('photo-upload-area');
    if (uploadArea) {
      uploadArea.style.display = mainPhotoType === 'upload' ? 'block' : 'none';
    }
  }, [mainPhotoType]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={editData.title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
          required
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          value={editData.location}
          onChange={(e) => onFieldChange('location', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
        />
      </div>

      {/* Main Photo Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Main Photo
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="photo-auto"
              name="mainPhoto"
              value="auto"
              checked={mainPhotoType === 'auto'}
              onChange={() => handlePhotoTypeChange('auto')}
              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
            />
            <label htmlFor="photo-auto" className="text-sm text-gray-700">
              Auto-generate from video thumbnail
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="photo-upload"
              name="mainPhoto"
              value="upload"
              checked={mainPhotoType === 'upload'}
              onChange={() => handlePhotoTypeChange('upload')}
              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
            />
            <label htmlFor="photo-upload" className="text-sm text-gray-700">
              Upload custom photo
            </label>
          </div>
          
          {/* Upload area - shown when upload option is selected */}
          <div id="photo-upload-area" className="mt-3">
            {photoPreview ? (
              <div className="relative">
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setMainPhotoFile(null);
                    setPhotoPreview(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Choose image file
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG or GIF up to 5MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status - Only show if not pending */}
      {!isPendingVideo && !isPublishedVideo && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="relative">
            <select
              value={editData.status}
              onChange={(e) => onFieldChange('status', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent appearance-none bg-white transition-all duration-200"
              style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetailsForm;