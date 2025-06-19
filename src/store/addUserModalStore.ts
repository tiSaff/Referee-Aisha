import { create } from 'zustand';
import { User } from '../types';

interface AddUserModalState {
  // User data
  newUser: Partial<User>;
  
  // Image upload state
  selectedImage: File | null;
  imagePreview: string | null;
  
  // Password state
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  
  // Actions
  setSelectedImage: (image: File | null) => void;
  setImagePreview: (preview: string | null) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
  updateUserField: (field: string, value: string | boolean) => void;
  resetForm: () => void;
  resetImageUpload: () => void;
  
  // Computed values
  passwordsMatch: boolean;
  canSubmit: boolean;
}

const initialUser: Partial<User> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  department: '',
  status: 'active',
  permissions: {
    videoPendingPermission: false,
    videoUnderReviewPermission: false,
    videoAcceptedPermission: false,
    uploadVideoPermission: false,
    settingsAddConsiderationsPermission: false,
    settingsAddTopicPermission: false,
    addNotification: false,
    viewUsersExternal: false,
    accountResponsibleForAddingUsers: false,
    accountIsActive: true
  }
};

export const useAddUserModalStore = create<AddUserModalState>((set, get) => ({
  // Initial state
  newUser: { ...initialUser },
  selectedImage: null,
  imagePreview: null,
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,
  
  // Basic setters
  setSelectedImage: (image: File | null) => set({ selectedImage: image }),
  setImagePreview: (preview: string | null) => set({ imagePreview: preview }),
  setPassword: (password: string) => set({ password }),
  setConfirmPassword: (password: string) => set({ confirmPassword }),
  setShowPassword: (show: boolean) => set({ showPassword: show }),
  setShowConfirmPassword: (show: boolean) => set({ showConfirmPassword: show }),
  
  toggleShowPassword: () => {
    const { showPassword } = get();
    set({ showPassword: !showPassword });
  },
  
  toggleShowConfirmPassword: () => {
    const { showConfirmPassword } = get();
    set({ showConfirmPassword: !showConfirmPassword });
  },
  
  updateUserField: (field: string, value: string | boolean) => {
    const { newUser } = get();
    
    if (field.startsWith('permissions.')) {
      const permissionField = field.replace('permissions.', '');
      set({
        newUser: {
          ...newUser,
          permissions: {
            ...newUser.permissions,
            [permissionField]: value
          }
        }
      });
    } else {
      set({
        newUser: {
          ...newUser,
          [field]: value
        }
      });
    }
  },
  
  resetForm: () => set({
    newUser: { ...initialUser },
    selectedImage: null,
    imagePreview: null,
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  }),
  
  resetImageUpload: () => set({
    selectedImage: null,
    imagePreview: null
  }),
  
  // Computed values
  get passwordsMatch() {
    const { password, confirmPassword } = get();
    return password === confirmPassword;
  },
  
  get canSubmit() {
    const { newUser, password, confirmPassword } = get();
    const { passwordsMatch } = get();
    
    return !!(
      newUser.firstName?.trim() &&
      newUser.lastName?.trim() &&
      newUser.email?.trim() &&
      newUser.phone?.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      passwordsMatch
    );
  },
}));