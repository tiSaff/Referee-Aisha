import React from 'react';
import { Video as VideoIcon, Clock, Globe } from 'lucide-react';

interface VideoStats {
  total: number;
  pending: number;
  published: number;
}

interface VideoTabsProps {
  activeTab: 'all' | 'pending' | 'published';
  videoStats: VideoStats;
  onTabChange: (tab: 'all' | 'pending' | 'published') => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const VideoTabs: React.FC<VideoTabsProps> = ({
  activeTab,
  videoStats,
  onTabChange,
  isRTL,
  t
}) => {
  const tabs = [
    { 
      id: 'all' as const, 
      label: t('videos.allVideos'), 
      count: videoStats.total,
      icon: VideoIcon,
      color: 'text-gray-600',
      description: t('videos.allVideoContent')
    },
    { 
      id: 'pending' as const, 
      label: t('videos.pendingVideos'), 
      count: videoStats.pending,
      icon: Clock,
      color: 'text-yellow-600',
      description: t('videos.awaitingReview')
    },
    { 
      id: 'published' as const, 
      label: t('videos.publishedVideos'), 
      count: videoStats.published,
      icon: Globe,
      color: 'text-blue-600',
      description: t('videos.liveAndPublic')
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{t('videos.filterByStatus')}</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-${isRTL ? 'right' : 'left'} group hover:shadow-lg transform hover:scale-[1.02] ${
                isActive 
                  ? 'border-2 shadow-lg scale-[1.02]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={isActive ? { 
                borderColor: '#2a835f',
                backgroundColor: 'rgba(42, 131, 95, 0.05)'
              } : {}}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon 
                  className={`w-6 h-6 ${isActive ? '' : tab.color} transition-colors`}
                  style={isActive ? { color: '#2a835f' } : {}}
                />
                <span 
                  className={`text-3xl font-bold ${isActive ? '' : 'text-gray-900'} transition-colors`}
                  style={isActive ? { color: '#2a835f' } : {}}
                >
                  {tab.count}
                </span>
              </div>
              <h3 
                className={`font-semibold text-lg ${isActive ? '' : 'text-gray-700'} transition-colors`}
                style={isActive ? { color: '#2a835f' } : {}}
              >
                {tab.label}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {tab.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VideoTabs;