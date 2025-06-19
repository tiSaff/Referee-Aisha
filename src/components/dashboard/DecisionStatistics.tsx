import React from 'react';
import { CheckCircle, XCircle, Maximize2 } from 'lucide-react';

interface DecisionStatisticsProps {
  data: {
    correct: number;
    incorrect: number;
  };
}

const DecisionStatistics: React.FC<DecisionStatisticsProps> = ({ data }) => {
  const total = data.correct + data.incorrect;
  const correctPercentage = (data.correct / total) * 100;
  const incorrectPercentage = (data.incorrect / total) * 100;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Decision Statistics</h3>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          {/* Pie Chart */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            {/* Correct decisions arc */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10b981"
              strokeWidth="8"
              strokeDasharray={`${correctPercentage * 2.51} 251.2`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            {/* Incorrect decisions arc */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#ef4444"
              strokeWidth="8"
              strokeDasharray={`${incorrectPercentage * 2.51} 251.2`}
              strokeDashoffset={`-${correctPercentage * 2.51}`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{total}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Correct</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900">{data.correct}</div>
            <div className="text-xs text-gray-500">{correctPercentage.toFixed(1)}%</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Incorrect</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900">{data.incorrect}</div>
            <div className="text-xs text-gray-500">{incorrectPercentage.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionStatistics;