import React, { useState, useRef, useEffect } from 'react';
import { Play, Calendar, User, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { VideoData } from '../../types';

interface VideoCardProps {
  video: VideoData;
  isRTL: boolean;
  onVideoClick: (video: VideoData) => void;
  onEditClick: (video: VideoData) => void;
  onDeleteClick?: (video: VideoData) => void;
  formatDate: (dateString: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
  t: (key: string) => string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isRTL,
  onVideoClick,
  onEditClick,
  onDeleteClick,
  formatDate,
  getStatusBadge,
  t
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleMenuAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);
    
    switch (action) {
      case 'view':
        onVideoClick(video);
        break;
      case 'edit':
        onEditClick(video);
        break;
      case 'delete':
        if (onDeleteClick) {
          onDeleteClick(video);
        }
        break;
    }
  };

  return (
    <div 
      className="group bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer transform"
      onClick={() => onVideoClick(video)}
    >
      <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
            <Play className="w-4 sm:w-6 h-4 sm:h-6 text-gray-700 ml-1" />
          </div>
        </div>
        
        <div className={`absolute top-2 sm:top-3 ${isRTL ? 'right-2 sm:right-3' : 'left-2 sm:left-3'}`}>
          {getStatusBadge(video.status)}
        </div>

        <div className={`absolute bottom-2 sm:bottom-3 ${isRTL ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} bg-black bg-opacity-80 text-white px-2 py-1 rounded-lg text-xs sm:text-sm font-medium backdrop-blur-sm`}>
          {video.duration}
        </div>

        {/* Enhanced Dropdown Menu */}
        <div className={`absolute top-2 sm:top-3 ${isRTL ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} ref={dropdownRef}>
          <button 
            onClick={handleDropdownToggle}
            className="p-1.5 sm:p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors relative z-10"
          >
            <MoreHorizontal className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
          </button>
          
          {/* Dropdown Menu */}
          {showDropdown && (
            <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[140px] z-50 animate-in slide-in-from-top-2 duration-200`}>
              <button
                onClick={(e) => handleMenuAction('view', e)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
              >
                <Eye className="w-4 h-4 text-gray-500" />
                <span>View</span>
              </button>
              
              <button
                onClick={(e) => handleMenuAction('edit', e)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
              >
                <Edit className="w-4 h-4 text-gray-500" />
                <span>Edit</span>
              </button>
              
              {onDeleteClick && (
                <button
                  onClick={(e) => handleMenuAction('delete', e)}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      <div className="p-3 sm:p-5 space-y-2 sm:space-y-3">
        <div>
          <h3 className="font-bold text-gray-900 text-sm sm:text-lg leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
            {video.title}
          </h3>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
            <span className="font-medium">{formatDate(video.uploadDate)}</span>
          </div>

          <div className="flex items-center space-x-2">
            <User className="w-3 sm:w-4 h-3 sm:h-4" />
            <span className="font-medium truncate">{video.uploadedBy}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;