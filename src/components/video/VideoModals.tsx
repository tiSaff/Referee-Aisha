import React from 'react';
import { Globe, RotateCcw } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface VideoModalsProps {
  showFinalSaveModal: boolean;
  showReturnToPendingModal: boolean;
  onCloseFinalSave: () => void;
  onCloseReturnToPending: () => void;
  onConfirmFinalSave: () => void;
  onConfirmReturnToPending: () => void;
  t: (key: string) => string;
}

const VideoModals: React.FC<VideoModalsProps> = ({
  showFinalSaveModal,
  showReturnToPendingModal,
  onCloseFinalSave,
  onCloseReturnToPending,
  onConfirmFinalSave,
  onConfirmReturnToPending,
  t
}) => {
  return (
    <>
      {/* Final Save Modal */}
      <Modal
        isOpen={showFinalSaveModal}
        onClose={onCloseFinalSave}
        title={t('videos.finalSave')}
        size="md"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-gray-700 mb-6">
            {t('videos.finalSaveConfirmation')}
          </p>
          <div className="flex justify-center space-x-3">
            <Button variant="secondary" onClick={onCloseFinalSave}>
              {t('common.no')}
            </Button>
            <Button onClick={onConfirmFinalSave}>
              {t('videos.yesPublish')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Return to Pending Modal */}
      <Modal
        isOpen={showReturnToPendingModal}
        onClose={onCloseReturnToPending}
        title={t('videos.returnToPending')}
        size="md"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RotateCcw className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-gray-700 mb-6">
            {t('videos.returnToPendingConfirmation')}
          </p>
          <div className="flex justify-center space-x-3">
            <Button variant="secondary" onClick={onCloseReturnToPending}>
              {t('common.cancel')}
            </Button>
            <Button variant="danger" onClick={onConfirmReturnToPending}>
              {t('videos.yesReturnToPending')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VideoModals;