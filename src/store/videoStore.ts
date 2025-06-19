import { create } from 'zustand';
import { VideoData, ApiError } from '../types';
import { videosApi } from '../api/videos';

interface VideoState {
  videos: VideoData[];
  currentVideo: VideoData | null;
  loading: boolean;
  error: string | null;
  uploadProgress: number;
  activeTab: 'all' | 'pending' | 'published';
  searchTerm: string;
  showDetails: boolean;
  showEditModal: boolean;
  showFinalSaveModal: boolean;
  showReturnToPendingModal: boolean;
  displayedVideos: number;
  isLoadingMore: boolean;
  
  // Actions
  fetchVideos: () => Promise<void>;
  getVideoById: (id: string) => Promise<void>;
  updateVideo: (id: string, videoData: Partial<VideoData>) => Promise<void>;
  uploadVideo: (file: File, metadata: Partial<VideoData>) => Promise<void>;
  setCurrentVideo: (video: VideoData | null) => void;
  setActiveTab: (tab: 'all' | 'pending' | 'published') => void;
  setSearchTerm: (term: string) => void;
  setShowDetails: (show: boolean) => void;
  setShowEditModal: (show: boolean) => void;
  setShowFinalSaveModal: (show: boolean) => void;
  setShowReturnToPendingModal: (show: boolean) => void;
  setDisplayedVideos: (count: number) => void;
  setIsLoadingMore: (loading: boolean) => void;
  clearError: () => void;
  getFilteredVideos: () => VideoData[];
  getVideoStats: () => { total: number; pending: number; published: number };
}

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  currentVideo: null,
  loading: false,
  error: null,
  uploadProgress: 0,
  activeTab: 'all',
  searchTerm: '',
  showDetails: false,
  showEditModal: false,
  showFinalSaveModal: false,
  showReturnToPendingModal: false,
  displayedVideos: 12,
  isLoadingMore: false,

  fetchVideos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await videosApi.getVideos();
      set({ videos: response.data, loading: false });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  getVideoById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await videosApi.getVideoById(id);
      set({ currentVideo: response.data, loading: false });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  updateVideo: async (id: string, videoData: Partial<VideoData>) => {
    set({ loading: true, error: null });
    try {
      const response = await videosApi.updateVideo(id, videoData);
      const currentVideos = get().videos;
      const updatedVideos = currentVideos.map(video => 
        video.id === id ? response.data : video
      );
      set({ 
        videos: updatedVideos, 
        currentVideo: response.data,
        loading: false 
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  uploadVideo: async (file: File, metadata: Partial<VideoData>) => {
    set({ loading: true, error: null, uploadProgress: 0 });
    try {
      const progressInterval = setInterval(() => {
        set(state => ({ 
          uploadProgress: Math.min(state.uploadProgress + 10, 90) 
        }));
      }, 200);

      const response = await videosApi.uploadVideo(file, metadata);
      
      clearInterval(progressInterval);
      set({ uploadProgress: 100 });

      const currentVideos = get().videos;
      set({ 
        videos: [...currentVideos, response.data], 
        loading: false,
        uploadProgress: 0
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false, uploadProgress: 0 });
    }
  },

  setCurrentVideo: (video: VideoData | null) => {
    set({ currentVideo: video });
  },

  setActiveTab: (tab: 'all' | 'pending' | 'published') => {
    set({ activeTab: tab, displayedVideos: 12 });
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term, displayedVideos: 12 });
  },

  setShowDetails: (show: boolean) => {
    set({ showDetails: show });
  },

  setShowEditModal: (show: boolean) => {
    set({ showEditModal: show });
  },

  setShowFinalSaveModal: (show: boolean) => {
    set({ showFinalSaveModal: show });
  },

  setShowReturnToPendingModal: (show: boolean) => {
    set({ showReturnToPendingModal: show });
  },

  setDisplayedVideos: (count: number) => {
    set({ displayedVideos: count });
  },

  setIsLoadingMore: (loading: boolean) => {
    set({ isLoadingMore: loading });
  },

  clearError: () => {
    set({ error: null });
  },

  getFilteredVideos: () => {
    const { videos, activeTab, searchTerm } = get();
    
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === 'all' || video.status === activeTab;
      
      return matchesSearch && matchesTab;
    });
  },

  getVideoStats: () => {
    const { videos } = get();
    return {
      total: videos.length,
      pending: videos.filter(v => v.status === 'pending').length,
      published: videos.filter(v => v.status === 'published').length,
    };
  },
}));