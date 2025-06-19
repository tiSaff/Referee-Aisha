import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Video } from 'lucide-react';
import { VideoData } from '../types';
import { useEditVideoModalStore } from '../store/editVideoModalStore';
import VideoUploadSection from './video/VideoUploadSection';
import VideoDetailsForm from './video/VideoDetailsForm';
import VideoInfoPanel from './video/VideoInfoPanel';
import TopicsAndCorrections from './video/TopicsAndCorrections';
import DecisionSection from './video/DecisionSection';
import ExplanationsSection from './video/ExplanationsSection';
import ActionButtons from './video/ActionButtons';

interface EditVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoData;
  onSave: (updatedVideo: VideoData, newVideoFile?: File, isFinalSave?: boolean) => void;
  onFinalSave?: () => void;
  onReturnToPending?: () => void;
}

const EditVideoModal: React.FC<EditVideoModalProps> = ({ 
  isOpen, 
  onClose, 
  video, 
  onSave,
  onFinalSave,
  onReturnToPending
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Zustand store
  const {
    editData,
    selectedFile,
    isDragOver,
    isUploading,
    uploadProgress,
    explanations,
    notes,
    decisions,
    topicPairs,
    topicsSystem,
    correctionOptions,
    setSelectedFile,
    setIsDragOver,
    setIsUploading,
    setUploadProgress,
    setExplanations,
    setNotes,
    setDecision,
    addTopicPair,
    removeTopicPair,
    updateTopicPair,
    updateEditDataField,
    resetForm,
    initializeWithVideo
  } = useEditVideoModalStore();

  // Initialize the form when video changes or modal opens
  useEffect(() => {
    if (isOpen && video) {
      initializeWithVideo(video);
    }
  }, [isOpen, video, initializeWithVideo]);

  // Handle escape key and body scroll for modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSave = async () => {
    if (!editData) return;

    if (selectedFile) {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            onSave(editData, selectedFile);
            onClose();
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } else {
      onSave(editData);
      onClose();
    }
  };

  const handleFinalSaveClick = () => {
    if (onFinalSave) {
      onFinalSave();
    }
  };

  const handleReturnToPendingClick = () => {
    if (onReturnToPending) {
      onReturnToPending();
    }
  };

  if (!isOpen || !editData) return null;

  const isPendingVideo = video.status === 'pending';
  const isPublishedVideo = video.status === 'published';

  const modalContent = (
    <>
      {/* Full Screen Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      />
      
      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-[10000]">
        <div 
          className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(42, 131, 95, 0.1)' }}>
                <Video className="w-5 h-5" style={{ color: '#2a835f' }} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Edit Video</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-8">
            {/* Video Upload Section */}
            <VideoUploadSection
              selectedFile={selectedFile}
              isDragOver={isDragOver}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              onFileSelect={handleFileSelect}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onRemoveFile={removeFile}
              formatFileSize={formatFileSize}
            />

            {/* Video Details Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <VideoDetailsForm
                  editData={editData}
                  onFieldChange={updateEditDataField}
                  isPendingVideo={isPendingVideo}
                  isPublishedVideo={isPublishedVideo}
                />

                <TopicsAndCorrections
                  topicPairs={topicPairs}
                  topicsSystem={topicsSystem}
                  correctionOptions={correctionOptions}
                  onAddTopicPair={addTopicPair}
                  onRemoveTopicPair={removeTopicPair}
                  onUpdateTopicPair={updateTopicPair}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <VideoInfoPanel editData={editData} />
                
                {/* Video Preview */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Video Preview</h4>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-2">
                        <Video className="w-8 h-8 text-gray-500" />
                      </div>
                      <p className="text-sm text-gray-500">Video Preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decision Section - Full Width */}
            <DecisionSection
              decisions={decisions}
              onDecisionChange={setDecision}
            />

            {/* Explanations & Notes - Full Width */}
            <ExplanationsSection
              explanations={explanations}
              onExplanationsChange={setExplanations}
              notes={notes}
              onNotesChange={setNotes}
            />

            {/* Action Buttons */}
            <ActionButtons
              isPendingVideo={isPendingVideo}
              isPublishedVideo={isPublishedVideo}
              isUploading={isUploading}
              selectedFile={selectedFile}
              onSave={handleSave}
              onFinalSave={handleFinalSaveClick}
              onReturnToPending={handleReturnToPendingClick}
              onCancel={onClose}
            />
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default EditVideoModal;