import React from 'react';
import { Play, Calendar, User, MoreHorizontal } from 'lucide-react';
import { VideoData } from '../../types';

interface VideoCardProps {
  video: VideoData;
  isRTL: boolean;
  onVideoClick: (video: VideoData) => void;
  onEditClick: (video: VideoData) => void;
  formatDate: (dateString: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
  t: (key: string) => string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isRTL,
  onVideoClick,
  onEditClick,
  formatDate,
  getStatusBadge,
  t
}) => {
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

        <div className={`absolute top-2 sm:top-3 ${isRTL ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEditClick(video);
            }}
            className="p-1.5 sm:p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <MoreHorizontal className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
          </button>
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