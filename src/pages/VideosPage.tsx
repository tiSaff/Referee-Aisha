import React, { useEffect, useCallback } from 'react';
import EditVideoModal from '../components/EditVideoModal';
import VideoHeader from '../components/video/VideoHeader';
import VideoSearchBar from '../components/video/VideoSearchBar';
import VideoTabs from '../components/video/VideoTabs';
import VideoGrid from '../components/video/VideoGrid';
import VideoDetailsView from '../components/video/VideoDetailsView';
import VideoModals from '../components/video/VideoModals';
import ErrorDisplay from '../components/common/ErrorDisplay';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import { useVideoManager } from '../hooks/useVideoManager';
import { useLanguageStore } from '../store/languageStore';
import { usePagination } from '../hooks/usePagination';
import { useConfirmationModalStore } from '../store/confirmationModalStore';

const VideosPage: React.FC = () => {
  const { t, currentLanguage } = useLanguageStore();
  const {
    videos,
    currentVideo,
    loading,
    error,
    activeTab,
    searchTerm,
    showDetails,
    showEditModal,
    showFinalSaveModal,
    showReturnToPendingModal,
    videoStats,
    handleUpdateVideo,
    handleSelectVideo,
    handleTabChange,
    setSearchTerm,
    setShowDetails,
    setShowEditModal,
    setShowFinalSaveModal,
    setShowReturnToPendingModal,
    clearError,
  } = useVideoManager();

  const isRTL = currentLanguage === 'ar';

  // Confirmation modal store
  const { showConfirmation } = useConfirmationModalStore();

  // Pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData: paginatedVideos,
    goToPage
  } = usePagination({
    data: videos,
    itemsPerPage: 12,
    initialPage: 1
  });

  const handleVideoClick = (video: any) => {
    handleSelectVideo(video);
  };

  const handleEditClick = () => {
    if (currentVideo) {
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = async (updatedVideo: any, newVideoFile?: File, isFinalSave: boolean = false) => {
    if (currentVideo) {
      const previousStatus = currentVideo.status;
      let newStatus = updatedVideo.status;
      
      if (newVideoFile) {
        const updatedVideoWithFile = {
          ...updatedVideo,
          size: `${(newVideoFile.size / 1024 / 1024).toFixed(1)} MB`,
          format: newVideoFile.type.split('/')[1].toUpperCase(),
          lastModified: new Date().toISOString(),
          status: isFinalSave ? 'published' : updatedVideo.status,
        };
        newStatus = isFinalSave ? 'published' : updatedVideo.status;
        await handleUpdateVideo(currentVideo.id, updatedVideoWithFile);
      } else {
        const finalUpdatedVideo = {
          ...updatedVideo,
          status: isFinalSave ? 'published' : updatedVideo.status,
        };
        newStatus = isFinalSave ? 'published' : updatedVideo.status;
        await handleUpdateVideo(currentVideo.id, finalUpdatedVideo);
      }
      
      if (previousStatus !== newStatus) {
        if (newStatus === 'pending') {
          handleTabChange('pending');
        } else if (newStatus === 'published') {
          handleTabChange('published');
        }
      }
      
      setShowEditModal(false);
      setShowFinalSaveModal(false);
      setShowReturnToPendingModal(false);
    }
  };

  const handleReturnToPending = async () => {
    if (currentVideo) {
      const updatedVideo = {
        ...currentVideo,
        status: 'pending' as const,
        lastModified: new Date().toISOString(),
      };
      await handleUpdateVideo(currentVideo.id, updatedVideo);
      
      handleTabChange('pending');
      
      setShowReturnToPendingModal(false);
      setShowEditModal(false);
    }
  };

  // Enhanced delete video with confirmation
  const handleDeleteVideoWithConfirmation = (video: any) => {
    showConfirmation({
      title: 'Delete Video',
      message: `Are you sure you want to delete the video "${video.title}"? This action cannot be undone and will permanently remove the video file and all associated data.`,
      confirmText: 'Delete Video',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: async () => {
        // Here you would implement the actual delete functionality
        console.log('Deleting video:', video.id);
        // await deleteVideo(video.id);
      }
    });
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      published: 'bg-blue-100 text-blue-800 border-blue-200'
    };

    return (
      <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full border ${statusStyles[status as keyof typeof statusStyles]}`}>
        {t(`common.${status}`)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading && videos.length === 0) {
    return <LoadingSpinner message={t('common.loading')} />;
  }

  // If showing details, render full-width video details
  if (showDetails && currentVideo) {
    return (
      <>
        {error && <ErrorDisplay error={error} onClose={clearError} />}
        
        <VideoDetailsView
          video={currentVideo}
          onClose={() => setShowDetails(false)}
          onEdit={handleEditClick}
          formatDate={formatDate}
          getStatusBadge={getStatusBadge}
          t={t}
        />

        {showEditModal && (
          <EditVideoModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            video={currentVideo}
            onSave={handleSaveEdit}
            onFinalSave={() => setShowFinalSaveModal(true)}
            onReturnToPending={() => setShowReturnToPendingModal(true)}
          />
        )}

        <VideoModals
          showFinalSaveModal={showFinalSaveModal}
          showReturnToPendingModal={showReturnToPendingModal}
          onCloseFinalSave={() => setShowFinalSaveModal(false)}
          onCloseReturnToPending={() => setShowReturnToPendingModal(false)}
          onConfirmFinalSave={() => {
            if (currentVideo) {
              handleSaveEdit(currentVideo, undefined, true);
            }
          }}
          onConfirmReturnToPending={handleReturnToPending}
          t={t}
        />
      </>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-0">
      {error && <ErrorDisplay error={error} onClose={clearError} />}

      <VideoHeader
        title={t('videos.title')}
        subtitle={searchTerm ? `${videos.length} ${t('videos.results')}` : `${videoStats.total} ${t('videos.totalVideos')}`}
        totalVideos={videoStats.total}
      />

      <VideoSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder={t('videos.searchPlaceholder')}
      />

      <VideoTabs
        activeTab={activeTab}
        videoStats={videoStats}
        onTabChange={handleTabChange}
        isRTL={isRTL}
        t={t}
      />

      <VideoGrid
        videos={videos}
        visibleVideos={paginatedVideos}
        hasMoreVideos={false}
        isLoadingMore={false}
        isRTL={isRTL}
        onVideoClick={handleVideoClick}
        onEditClick={(video) => {
          handleSelectVideo(video);
          handleEditClick();
        }}
        formatDate={formatDate}
        getStatusBadge={getStatusBadge}
        t={t}
        searchTerm={searchTerm}
        activeTab={activeTab}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={goToPage}
          />
        </div>
      )}
    </div>
  );
};

export default VideosPage;