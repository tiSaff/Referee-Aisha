import React from 'react';
import { MapPin, Maximize2 } from 'lucide-react';

interface UsersByLocationChartProps {
  data: Array<{
    location: string;
    count: number;
  }>;
}

const UsersByLocationChart: React.FC<UsersByLocationChartProps> = ({ data }) => {
  const maxCount = Math.max(...data.map(item => item.count));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Users by Location</h3>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-32 text-sm font-medium text-gray-700 truncate" title={item.location}>
              {item.location}
            </div>
            <div className="flex-1 relative">
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
            <div className="w-12 text-sm font-semibold text-gray-900 text-right">
              {item.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersByLocationChart;