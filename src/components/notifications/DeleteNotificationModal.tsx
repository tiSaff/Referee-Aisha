import React from 'react';
import { Trash2 } from 'lucide-react';
import { useNotificationManager } from '../../hooks/useNotificationManager';
import { useUIStore } from '../../store/uiStore';
import Modal from '../common/Modal';
import Button from '../common/Button';

const DeleteNotificationModal: React.FC = () => {
  const { 
    notificationToDelete, 
    showDeleteNotificationModal, 
    loading, 
    confirmDeleteNotification 
  } = useNotificationManager();
  
  const { setModalState } = useUIStore();

  const handleClose = () => {
    setModalState('showDeleteNotificationModal', false);
  };

  if (!notificationToDelete) return null;

  return (
    <Modal
      isOpen={showDeleteNotificationModal}
      onClose={handleClose}
      title="Delete Notification"
      size="md"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the notification "{notificationToDelete.title}"? This action cannot be undone.
        </p>
        <div className="flex justify-center space-x-3">
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteNotification} loading={loading}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteNotificationModal;