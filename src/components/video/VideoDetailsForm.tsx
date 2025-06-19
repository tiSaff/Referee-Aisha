import React, { useState, useEffect, useRef } from 'react';
import { Upload, X } from 'lucide-react';
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
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(2); // Default to middle photo
  
  // File input reference
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sample photo URLs (in a real app, these would come from video frames)
  const photoOptions = [
    "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=200&h=120&fit=crop",
    "https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg?auto=compress&cs=tinysrgb&w=200&h=120&fit=crop",
    "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=200&h=120&fit=crop",
    "https://images.pexels.com/photos/3641352/pexels-photo-3641352.jpeg?auto=compress&cs=tinysrgb&w=200&h=120&fit=crop",
    "https://images.pexels.com/photos/3641342/pexels-photo-3641342.jpeg?auto=compress&cs=tinysrgb&w=200&h=120&fit=crop"
  ];
  
  // Handle photo selection
  const handlePhotoSelect = (index: number) => {
    setSelectedPhotoIndex(index);
  };

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
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Main Photo
        </label>
        <div className="flex flex-wrap justify-between gap-2">
          {photoOptions.map((photo, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-2">
                <img 
                  src={photo} 
                  alt={`Thumbnail option ${index + 1}`}
                  className="w-32 h-20 object-cover rounded-md border-2 border-transparent hover:border-gray-300 transition-all"
                  style={{ 
                    borderColor: selectedPhotoIndex === index ? '#2a835f' : 'transparent',
                    opacity: selectedPhotoIndex === index ? 1 : 0.8
                  }}
                />
                <input
                  type="radio"
                  name="mainPhoto"
                  id={`photo-${index}`}
                  checked={selectedPhotoIndex === index}
                  onChange={() => handlePhotoSelect(index)}
                  className="absolute right-1 top-1 w-4 h-4 accent-[#2a835f]"
                />
              </div>
            </div>
          ))}
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