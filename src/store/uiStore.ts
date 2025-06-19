import { create } from 'zustand';

interface UIState {
  // Modal states
  showUploadModal: boolean;
  showAddNotificationModal: boolean;
  showAddTopicModal: boolean;
  showEditTopicModal: boolean;
  showViewTopicModal: boolean;
  showUserProfileModal: boolean;
  showEditUserModal: boolean;
  showDeleteUserModal: boolean;
  showDeleteNotificationModal: boolean;
  showVideoDetailsModal: boolean;
  showEditVideoModal: boolean;
  showFinalSaveModal: boolean;
  showReturnToPendingModal: boolean;
  showAddExternalUserModal: boolean;
  showExternalUserProfileModal: boolean;
  showEditExternalUserModal: boolean;
  showDeleteExternalUserModal: boolean;

  // General UI states
  sidebarOpen: boolean;
  currentPage: string;
  isUserMenuOpen: boolean;
  
  // Actions
  setModalState: (modal: string, isOpen: boolean) => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setCurrentPage: (page: string) => void;
  setIsUserMenuOpen: (isOpen: boolean) => void;
  closeAllModals: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial states
  showUploadModal: false,
  showAddNotificationModal: false,
  showAddTopicModal: false,
  showEditTopicModal: false,
  showViewTopicModal: false,
  showUserProfileModal: false,
  showEditUserModal: false,
  showDeleteUserModal: false,
  showDeleteNotificationModal: false,
  showVideoDetailsModal: false,
  showEditVideoModal: false,
  showFinalSaveModal: false,
  showReturnToPendingModal: false,
  showAddExternalUserModal: false,
  showExternalUserProfileModal: false,
  showEditExternalUserModal: false,
  showDeleteExternalUserModal: false,
  sidebarOpen: false,
  currentPage: 'videos',
  isUserMenuOpen: false,

  // Actions
  setModalState: (modal: string, isOpen: boolean) => {
    set((state) => ({
      ...state,
      [modal]: isOpen
    }));
  },

  setSidebarOpen: (isOpen: boolean) => {
    set({ sidebarOpen: isOpen });
  },

  setCurrentPage: (page: string) => {
    set({ currentPage: page, sidebarOpen: false });
  },
  
  setIsUserMenuOpen: (isOpen: boolean) => {
    set({ isUserMenuOpen: isOpen });
  },

  closeAllModals: () => {
    set({
      showUploadModal: false,
      showAddNotificationModal: false,
      showAddTopicModal: false,
      showEditTopicModal: false,
      showViewTopicModal: false,
      showUserProfileModal: false,
      showEditUserModal: false,
      showDeleteUserModal: false,
      showDeleteNotificationModal: false,
      showVideoDetailsModal: false,
      showEditVideoModal: false,
      showFinalSaveModal: false,
      showReturnToPendingModal: false,
      showAddExternalUserModal: false,
      showExternalUserProfileModal: false,
      showEditExternalUserModal: false,
      showDeleteExternalUserModal: false,
    });
  },
}));