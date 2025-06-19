import React from 'react';
import { BarChart3, Maximize2 } from 'lucide-react';

interface VideoStatisticsChartProps {
  data: Array<{
    month: string;
    videos: number;
  }>;
}

const VideoStatisticsChart: React.FC<VideoStatisticsChartProps> = ({ data }) => {
  const maxVideos = Math.max(...data.map(item => item.videos));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Video Statistics</h3>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-end justify-between space-x-2 h-48">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full flex items-end justify-center h-40 mb-2">
              <div
                className="w-8 bg-gradient-to-t from-green-500 to-green-400 rounded-t-md transition-all duration-1000 ease-out hover:from-green-600 hover:to-green-500"
                style={{ height: `${(item.videos / maxVideos) * 100}%` }}
                title={`${item.month}: ${item.videos} videos`}
              />
            </div>
            <div className="text-xs font-medium text-gray-600 text-center">
              {item.month.split(' ')[0]}
            </div>
            <div className="text-xs font-semibold text-gray-900">
              {item.videos}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoStatisticsChart;