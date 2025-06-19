import { useEffect } from 'react';
import { useVideoStore } from '../store/videoStore';
import { VideoData } from '../types';

export const useVideoManager =  () => {
  const {
    videos,
    currentVideo,
    loading,
    error,
    uploadProgress,
    activeTab,
    searchTerm,
    showDetails,
    showEditModal,
    showFinalSaveModal,
    showReturnToPendingModal,
    displayedVideos,
    isLoadingMore,
    fetchVideos,
    getVideoById,
    updateVideo,
    uploadVideo,
    setCurrentVideo,
    setActiveTab,
    setSearchTerm,
    setShowDetails,
    setShowEditModal,
    setShowFinalSaveModal,
    setShowReturnToPendingModal,
    setDisplayedVideos,
    setIsLoadingMore,
    clearError,
    getFilteredVideos,
    getVideoStats,
  } = useVideoStore();

  // Initialize videos on mount
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Initialize current video if not set
  useEffect(() => {
    if (videos.length > 0 && !currentVideo) {
      setCurrentVideo(videos[0]);
    }
  }, [videos, currentVideo, setCurrentVideo]);

  const filteredVideos = getFilteredVideos();
  const videoStats = getVideoStats();

  const handleUpdateVideo = async (videoId: string, videoData: Partial<VideoData>) => {
    try {
      await updateVideo(videoId, videoData);
      return true;
    } catch (error) {
      console.error("Error updating video:", error);
      return false;
    }
  };

  const handleUploadVideo = async (file: File, metadata: Partial<VideoData>) => {
    try {
      await uploadVideo(file, metadata);
      return true;
    } catch (error) {
      console.error("Error uploading video:", error);
      return false;
    }
  };

  const handleSelectVideo = (video: VideoData | null) => {
    console.log("Selecting video:", video?.id);
    setCurrentVideo(video);
    setShowDetails(true);
  };

  const handleTabChange = (tab: 'all' | 'pending' | 'published') => {
    setActiveTab(tab);
    setShowDetails(false);
    setCurrentVideo(null);
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && displayedVideos < filteredVideos.length) {
      setIsLoadingMore(true);
      
      setTimeout(() => {
        setDisplayedVideos(Math.min(displayedVideos + 12, filteredVideos.length));
        setIsLoadingMore(false);
      }, 800);
    }
  };

  return {
    // State
    videos: filteredVideos,
    allVideos: videos,
    currentVideo,
    loading,
    error,
    uploadProgress,
    activeTab,
    searchTerm,
    showDetails,
    showEditModal,
    showFinalSaveModal,
    showReturnToPendingModal,
    displayedVideos,
    isLoadingMore,
    videoStats,
    
    // Actions
    handleUpdateVideo,
    handleUploadVideo,
    handleSelectVideo,
    handleTabChange,
    handleLoadMore,
    setSearchTerm,
    setShowDetails,
    setShowEditModal,
    setShowFinalSaveModal,
    setShowReturnToPendingModal,
    clearError,
    refreshVideos: fetchVideos,
  };
};