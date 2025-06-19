import React, { useEffect } from 'react';
import { useAddTopicStore } from '../store/addTopicStore';
import { usePagination } from '../hooks/usePagination';
import { useAlertStore } from '../store/alertStore';
import { useConfirmationModalStore } from '../store/confirmationModalStore';
import TopicHeader from '../components/topic/TopicHeader';
import TopicSearchFilter from '../components/topic/TopicSearchFilter';
import TopicGrid from '../components/topic/TopicGrid';
import TopicModal from '../components/topic/TopicModal';
import TopicViewModal from '../components/topic/TopicViewModal';
import Pagination from '../components/common/Pagination';
import PageAlert from '../components/common/PageAlert';

const AddTopicPage: React.FC = () => {
  const {
    // Form state
    topicName,
    arabicName,
    considerations,
    subtopics,
    selectedFile,
    isDragOver,
    
    // Modal state
    showCreateModal,
    showEditModal,
    showViewModal,
    editingTopic,
    viewingTopic,
    
    // UI state
    searchTerm,
    activeDropdown,
    
    // Data
    existingTopics,
    
    // Actions
    setTopicName,
    setArabicName,
    setConsiderations,
    setSelectedFile,
    setIsDragOver,
    setShowCreateModal,
    setShowEditModal,
    setShowViewModal,
    setViewingTopic,
    setSearchTerm,
    setActiveDropdown,
    addSubtopic,
    removeSubtopic,
    updateSubtopic,
    resetForm,
    handleEdit,
    handleView,
    handleDelete,
    handleSubmit,
    getFilteredTopics
  } = useAddTopicStore();

  // Alert store for success messages
  const { isVisible: alertVisible, message: alertMessage, hideAlert } = useAlertStore();

  // Confirmation modal store
  const { showConfirmation } = useConfirmationModalStore();

  const filteredTopics = getFilteredTopics();

  // Pagination hook - ALWAYS show pagination
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData: paginatedTopics,
    goToPage
  } = usePagination({
    data: filteredTopics,
    itemsPerPage: 12,
    initialPage: 1
  });

  // Enhanced submit with success alert
  const handleSubmitWithAlert = () => {
    const isEdit = !!editingTopic;
    const topicNameForAlert = topicName;
    
    handleSubmit();
    
    // Show success alert
    const { showAlert } = useAlertStore.getState();
    if (isEdit) {
      showAlert(`Topic "${topicNameForAlert}" updated successfully!`);
    } else {
      showAlert(`Topic "${topicNameForAlert}" created successfully!`);
    }
  };

  // Enhanced delete with confirmation and success alert
  const handleDeleteWithConfirmation = (topicId: string) => {
    const topic = existingTopics.find(t => t.id === topicId);
    if (!topic) return;

    showConfirmation({
      title: 'Delete Topic',
      message: `Are you sure you want to delete the topic "${topic.name}"? This action cannot be undone and will permanently remove all associated data including subtopics and considerations.`,
      confirmText: 'Delete Topic',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: () => {
        handleDelete(topicId);
        
        // Show success alert
        const { showAlert } = useAlertStore.getState();
        showAlert(`Topic "${topic.name}" deleted successfully!`);
      }
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [setActiveDropdown]);

  // Handle escape key and body scroll for modals
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showCreateModal) {
          setShowCreateModal(false);
          resetForm();
        }
        if (showEditModal) {
          setShowEditModal(false);
          resetForm();
        }
        if (showViewModal) {
          setShowViewModal(false);
          setViewingTopic(null);
        }
      }
    };

    if (showCreateModal || showEditModal || showViewModal) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showCreateModal, showEditModal, showViewModal, setShowCreateModal, setShowEditModal, setShowViewModal, setViewingTopic, resetForm]);

  const handleFileSelect = (file: File) => {
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
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
  };

  const toggleDropdown = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === topicId ? null : topicId);
  };

  const handleCreateTopic = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    resetForm();
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    resetForm();
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewingTopic(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitWithAlert();
  };

  return (
    <div className="space-y-6">
      {/* Page Alert - After Title */}
      <PageAlert
        isVisible={alertVisible}
        message={alertMessage}
        onClose={hideAlert}
      />

      {/* Header Section */}
      <TopicHeader onCreateTopic={handleCreateTopic} />

      {/* Search and Filter */}
      <TopicSearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filteredCount={filteredTopics.length}
        totalCount={existingTopics.length}
      />

      {/* Topics Grid */}
      <TopicGrid
        topics={paginatedTopics}
        activeDropdown={activeDropdown}
        searchTerm={searchTerm}
        onToggleDropdown={toggleDropdown}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteWithConfirmation}
        onCreateTopic={handleCreateTopic}
      />

      {/* Pagination - ALWAYS SHOW */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(1, totalPages)} // Ensure at least 1 page
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={goToPage}
        />
      </div>

      {/* Create Modal */}
      <TopicModal
        isOpen={showCreateModal}
        isEdit={false}
        topicName={topicName}
        arabicName={arabicName}
        considerations={considerations}
        subtopics={subtopics}
        selectedFile={selectedFile}
        isDragOver={isDragOver}
        onClose={handleCloseCreateModal}
        onSubmit={handleFormSubmit}
        onTopicNameChange={setTopicName}
        onArabicNameChange={setArabicName}
        onConsiderationsChange={setConsiderations}
        onFileSelect={handleFileSelect}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onRemoveFile={removeFile}
        onAddSubtopic={addSubtopic}
        onRemoveSubtopic={removeSubtopic}
        onUpdateSubtopic={updateSubtopic}
      />

      {/* Edit Modal */}
      <TopicModal
        isOpen={showEditModal}
        isEdit={true}
        topicName={topicName}
        arabicName={arabicName}
        considerations={considerations}
        subtopics={subtopics}
        selectedFile={selectedFile}
        isDragOver={isDragOver}
        editingTopic={editingTopic}
        onClose={handleCloseEditModal}
        onSubmit={handleFormSubmit}
        onTopicNameChange={setTopicName}
        onArabicNameChange={setArabicName}
        onConsiderationsChange={setConsiderations}
        onFileSelect={handleFileSelect}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onRemoveFile={removeFile}
        onAddSubtopic={addSubtopic}
        onRemoveSubtopic={removeSubtopic}
        onUpdateSubtopic={updateSubtopic}
      />

      {/* View Modal */}
      <TopicViewModal
        isOpen={showViewModal}
        topic={viewingTopic}
        onClose={handleCloseViewModal}
      />
    </div>
  );
};

export default AddTopicPage;