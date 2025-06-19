import React from 'react';
import { Video as VideoIcon, CheckCircle } from 'lucide-react';
import { VideoData } from '../../types';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: VideoData[];
  visibleVideos: VideoData[];
  hasMoreVideos: boolean;
  isLoadingMore: boolean;
  isRTL: boolean;
  onVideoClick: (video: VideoData) => void;
  onEditClick: (video: VideoData) => void;
  onDeleteClick?: (video: VideoData) => void;
  formatDate: (dateString: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
  t: (key: string, params?: Record<string, any>) => string;
  searchTerm: string;
  activeTab: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  visibleVideos,
  hasMoreVideos,
  isLoadingMore,
  isRTL,
  onVideoClick,
  onEditClick,
  onDeleteClick,
  formatDate,
  getStatusBadge,
  t,
  searchTerm,
  activeTab
}) => {
  if (visibleVideos.length === 0) {
    return (
      <div className="col-span-full text-center py-16">
        <VideoIcon className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('videos.noVideosFound')}</h3>
        <p className="text-gray-500 text-lg">
          {searchTerm 
            ? t('videos.tryAdjusting')
            : activeTab === 'all' 
              ? t('videos.noVideosAvailable')
              : `${t('common.no')} ${t(`videos.${activeTab}Videos`).toLowerCase()} ${t('videos.available')}`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleVideos.map((video) => (
          <div 
            key={video.id}
            className="transform transition-all duration-300"
          >
            <VideoCard
              video={video}
              isRTL={isRTL}
              onVideoClick={onVideoClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              formatDate={formatDate}
              getStatusBadge={getStatusBadge}
              t={t}
            />
          </div>
        ))}
      </div>

      {isLoadingMore && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2" style={{ borderColor: '#2a835f' }}></div>
            <span className="text-gray-600 font-medium">{t('videos.loadingMore')}</span>
          </div>
        </div>
      )}

      {!hasMoreVideos && videos.length > 12 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{t('videos.allVideosViewed', { count: videos.length })}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;