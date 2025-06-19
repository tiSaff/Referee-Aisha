import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import TopicImageUpload from './TopicImageUpload';
import TopicForm from './TopicForm';
import SubtopicsManager from './SubtopicsManager';
import ConsiderationsEditor from './ConsiderationsEditor';

interface TopicModalProps {
  isOpen: boolean;
  isEdit?: boolean;
  topicName: string;
  arabicName: string;
  considerations: string;
  subtopics: string[];
  selectedFile: File | null;
  isDragOver: boolean;
  editingTopic?: any;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onTopicNameChange: (name: string) => void;
  onArabicNameChange: (name: string) => void;
  onConsiderationsChange: (value: string) => void;
  onFileSelect: (file: File) => void;
  onDragOver: (event: React.DragEvent) => void;
  onDragLeave: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
  onRemoveFile: () => void;
  onAddSubtopic: () => void;
  onRemoveSubtopic: (index: number) => void;
  onUpdateSubtopic: (index: number, value: string) => void;
}

const TopicModal: React.FC<TopicModalProps> = ({
  isOpen,
  isEdit = false,
  topicName,
  arabicName,
  considerations,
  subtopics,
  selectedFile,
  isDragOver,
  editingTopic,
  onClose,
  onSubmit,
  onTopicNameChange,
  onArabicNameChange,
  onConsiderationsChange,
  onFileSelect,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemoveFile,
  onAddSubtopic,
  onRemoveSubtopic,
  onUpdateSubtopic
}) => {
  if (!isOpen) return null;

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
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {isEdit ? 'Edit Topic' : 'Create Topic'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <form onSubmit={onSubmit} className="p-4 sm:p-6 space-y-6">
            {/* File Upload Area */}
            <TopicImageUpload
              selectedFile={selectedFile}
              isDragOver={isDragOver}
              editingTopic={editingTopic}
              onFileSelect={onFileSelect}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onRemoveFile={onRemoveFile}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <TopicForm
                  topicName={topicName}
                  arabicName={arabicName}
                  onTopicNameChange={onTopicNameChange}
                  onArabicNameChange={onArabicNameChange}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <SubtopicsManager
                  subtopics={subtopics}
                  onAddSubtopic={onAddSubtopic}
                  onRemoveSubtopic={onRemoveSubtopic}
                  onUpdateSubtopic={onUpdateSubtopic}
                />
              </div>
            </div>

            {/* Considerations Field - Full Width */}
            <ConsiderationsEditor
              considerations={considerations}
              onConsiderationsChange={onConsiderationsChange}
            />

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="px-8 sm:px-12 py-3 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:opacity-90"
                style={{ backgroundColor: '#2a835f' }}
              >
                {isEdit ? 'Update Topic' : 'Create Topic'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default TopicModal;