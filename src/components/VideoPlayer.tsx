import React from 'react';
import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward, Video } from 'lucide-react';
import { useVideoPlayerStore } from '../store/videoPlayerStore';

const VideoPlayer: React.FC = () => {
  const {
    isPlaying,
    currentTime,
    duration,
    setCurrentTime,
    togglePlay,
    formatTime
  } = useVideoPlayerStore();

  return (
    <div className="bg-gray-100 rounded-lg aspect-video relative overflow-hidden group">
      {/* Video placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 mx-auto group-hover:scale-110 transition-transform duration-200">
            {isPlaying ? (
              <Pause className="w-8 h-8 text-gray-700 ml-1" />
            ) : (
              <Play className="w-8 h-8 text-gray-700 ml-1" />
            )}
          </div>
          <p className="text-gray-600 text-sm">Video Preview</p>
        </div>
      </div>

      {/* Video icon in corner */}
      <div className="absolute top-3 right-3 bg-white bg-opacity-80 p-2 rounded-full shadow-md">
        <Video className="w-5 h-5 text-gray-700" />
      </div>

      {/* Play button overlay */}
      <button 
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200"
      />

      {/* Video controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex items-center space-x-3">
          <button 
            onClick={togglePlay}
            className="text-white transition-colors hover:opacity-80"
            style={{ '--hover-color': '#2a835f' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#2a835f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
            }}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          
          <button 
            className="text-white transition-colors hover:opacity-80"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#2a835f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
            }}
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button 
            className="text-white transition-colors hover:opacity-80"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#2a835f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
            }}
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <div className="flex-1 mx-4">
            <div className="relative">
              <div className="h-1 bg-white/30 rounded-full">
                <div 
                  className="h-1 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(currentTime / duration) * 100}%`,
                    backgroundColor: '#2a835f'
                  }}
                />
              </div>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
                style={{ accentColor: '#2a835f' }}
              />
            </div>
          </div>

          <span className="text-white text-sm font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <button 
            className="text-white transition-colors hover:opacity-80"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#2a835f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
            }}
          >
            <Volume2 className="w-5 h-5" />
          </button>

          <button 
            className="text-white transition-colors hover:opacity-80"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#2a835f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
            }}
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;