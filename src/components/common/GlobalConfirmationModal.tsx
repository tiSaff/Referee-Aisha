import React from 'react';
import { useConfirmationModalStore } from '../../store/confirmationModalStore';
import ConfirmationModal from './ConfirmationModal';

const GlobalConfirmationModal: React.FC = () => {
  const {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    type,
    loading,
    hideConfirmation,
    handleConfirm
  } = useConfirmationModalStore();

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={hideConfirmation}
      onConfirm={handleConfirm}
      title={title}
      message={message}
      confirmText={confirmText}
      cancelText={cancelText}
      type={type}
      loading={loading}
    />
  );
};

export default GlobalConfirmationModal;