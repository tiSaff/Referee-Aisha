import React from 'react';
import { X, Edit, Trash2, User, Calendar, Eye, Video } from 'lucide-react';
import { VideoData } from '../../types';
import VideoPlayer from '../VideoPlayer';
import Button from '../common/Button';

interface VideoDetailsViewProps {
  video: VideoData;
  onClose: () => void;
  onEdit: () => void;
  formatDate: (dateString: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
  t: (key: string) => string;
}

const VideoDetailsView: React.FC<VideoDetailsViewProps> = ({
  video,
  onClose,
  onEdit,
  formatDate,
  getStatusBadge,
  t
}) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-0">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
            <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(42, 131, 95, 0.1)' }}>
              <Video className="w-4 sm:w-6 h-4 sm:h-6" style={{ color: '#2a835f' }} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{video.title}</h2>
              <p className="text-xs sm:text-sm text-gray-500">ID: {video.id}</p>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <Button variant="ghost" onClick={onClose}>
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
            <Button onClick={onEdit}>
              <Edit className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="hidden sm:inline">{t('common.edit')}</span>
            </Button>
            <Button variant="ghost">
              <Trash2 className="w-3 sm:w-4 h-3 sm:h-4 text-red-600" />
            </Button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          <div className="w-full">
            <VideoPlayer />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('videos.title')}</label>
                <p className="text-gray-900 font-medium text-base sm:text-lg">{video.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.description')}</label>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{video.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.status')}</label>
                <div>{getStatusBadge(video.status)}</div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <h3 className="font-medium text-gray-900 mb-3">{t('videos.uploadInformation')}</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm">
                    <User className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500" />
                    <span className="text-gray-600">{t('videos.uploadedBy')}:</span>
                    <span className="font-medium text-gray-900 truncate">{video.uploadedBy}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm">
                    <Calendar className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500" />
                    <span className="text-gray-600">{t('videos.uploadDate')}:</span>
                    <span className="font-medium text-gray-900">{formatDate(video.uploadDate)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <h3 className="font-medium text-gray-900 mb-3">{t('videos.technicalDetails')}</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-600">{t('videos.duration')}:</span>
                    <p className="font-medium text-gray-900">{video.duration}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">{t('videos.fileSize')}:</span>
                    <p className="font-medium text-gray-900">{video.size}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <h3 className="font-medium text-gray-900 mb-3">{t('videos.statistics')}</h3>
                <div className="flex items-center space-x-2 text-xs sm:text-sm">
                  <Eye className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500" />
                  <span className="text-gray-600">{t('videos.views')}:</span>
                  <span className="font-medium text-gray-900">{video.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsView;