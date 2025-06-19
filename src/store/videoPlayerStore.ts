import { create } from 'zustand';

interface VideoPlayerState {
  // State
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  
  // Actions
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  togglePlay: () => void;
  formatTime: (seconds: number) => string;
}

export const useVideoPlayerStore = create<VideoPlayerState>((set, get) => ({
  // Initial state
  isPlaying: false,
  currentTime: 0,
  duration: 100,
  
  // Actions
  setIsPlaying: (playing: boolean) => set({ isPlaying: playing }),
  setCurrentTime: (time: number) => set({ currentTime: time }),
  setDuration: (duration: number) => set({ duration }),
  
  togglePlay: () => {
    const { isPlaying } = get();
    set({ isPlaying: !isPlaying });
  },
  
  formatTime: (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  },
}));