import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  arabicName: string;
  considerations: string;
  subtopics: string[];
  image?: string;
}

interface TopicViewModalProps {
  isOpen: boolean;
  topic: Topic | null;
  onClose: () => void;
}

const TopicViewModal: React.FC<TopicViewModalProps> = ({
  isOpen,
  topic,
  onClose
}) => {
  if (!isOpen || !topic) return null;

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
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Topic Details</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Topic Image */}
            {topic.image && (
              <div className="text-center">
                <img 
                  src={topic.image} 
                  alt={topic.name}
                  className="w-full max-w-md h-48 sm:h-64 object-cover rounded-lg mx-auto shadow-lg"
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Names */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {topic.name}
                  </h3>
                  {topic.arabicName && (
                    <p className="text-base sm:text-lg text-gray-600" dir="rtl">
                      {topic.arabicName}
                    </p>
                  )}
                </div>

                {/* Subtopics */}
                {topic.subtopics.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Subtopics</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {topic.subtopics.map((subtopic, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700"
                        >
                          {subtopic}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div>
                {/* Considerations */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Considerations</h4>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                      {topic.considerations}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default TopicViewModal;