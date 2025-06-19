import { create } from 'zustand';

interface UsersPageState {
  // Change Password State
  showChangePassword: boolean;
  passwordData: {
    newPassword: string;
    confirmPassword: string;
  };
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  showChangePasswordModal: boolean;
  
  // Image upload state
  selectedImage: File | null;
  imagePreview: string | null;
  
  // Role dropdown state
  showRoleDropdown: boolean;
  roleSearchTerm: string;
  
  // Actions
  setShowChangePassword: (show: boolean) => void;
  setPasswordData: (data: { newPassword: string; confirmPassword: string }) => void;
  setShowNewPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  setShowChangePasswordModal: (show: boolean) => void;
  setSelectedImage: (image: File | null) => void;
  setImagePreview: (preview: string | null) => void;
  setShowRoleDropdown: (show: boolean) => void;
  setRoleSearchTerm: (term: string) => void;
  
  // Complex actions
  updatePasswordField: (field: 'newPassword' | 'confirmPassword', value: string) => void;
  resetPasswordForm: () => void;
  resetImageUpload: () => void;
  resetAll: () => void;
}

export const useUsersPageStore = create<UsersPageState>((set, get) => ({
  // Initial state
  showChangePassword: false,
  passwordData: {
    newPassword: '',
    confirmPassword: ''
  },
  showNewPassword: false,
  showConfirmPassword: false,
  showChangePasswordModal: false,
  selectedImage: null,
  imagePreview: null,
  showRoleDropdown: false,
  roleSearchTerm: '',
  
  // Basic setters
  setShowChangePassword: (show: boolean) => set({ showChangePassword: show }),
  setPasswordData: (data: { newPassword: string; confirmPassword: string }) => set({ passwordData: data }),
  setShowNewPassword: (show: boolean) => set({ showNewPassword: show }),
  setShowConfirmPassword: (show: boolean) => set({ showConfirmPassword: show }),
  setShowChangePasswordModal: (show: boolean) => set({ showChangePasswordModal: show }),
  setSelectedImage: (image: File | null) => set({ selectedImage: image }),
  setImagePreview: (preview: string | null) => set({ imagePreview: preview }),
  setShowRoleDropdown: (show: boolean) => set({ showRoleDropdown: show }),
  setRoleSearchTerm: (term: string) => set({ roleSearchTerm: term }),
  
  // Complex actions
  updatePasswordField: (field: 'newPassword' | 'confirmPassword', value: string) => {
    const { passwordData } = get();
    set({
      passwordData: {
        ...passwordData,
        [field]: value
      }
    });
  },
  
  resetPasswordForm: () => set({
    showChangePassword: false,
    passwordData: {
      newPassword: '',
      confirmPassword: ''
    },
    showNewPassword: false,
    showConfirmPassword: false,
    showChangePasswordModal: false
  }),
  
  resetImageUpload: () => set({
    selectedImage: null,
    imagePreview: null
  }),
  
  resetAll: () => set({
    showChangePassword: false,
    passwordData: {
      newPassword: '',
      confirmPassword: ''
    },
    showNewPassword: false,
    showConfirmPassword: false,
    showChangePasswordModal: false,
    selectedImage: null,
    imagePreview: null,
    showRoleDropdown: false,
    roleSearchTerm: ''
  }),
}));