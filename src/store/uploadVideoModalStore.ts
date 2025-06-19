import { create } from 'zustand';

interface UploadVideoModalState {
  // State
  selectedFile: File | null;
  isDragOver: boolean;
  isUploading: boolean;
  uploadProgress: number;
  uploadComplete: boolean;
  
  // Actions
  setSelectedFile: (file: File | null) => void;
  setIsDragOver: (isDragOver: boolean) => void;
  setIsUploading: (isUploading: boolean) => void;
  setUploadProgress: (progress: number) => void;
  setUploadComplete: (complete: boolean) => void;
  resetUploadState: () => void;
  formatFileSize: (bytes: number) => string;
  handleUpload: () => Promise<void>;
}

export const useUploadVideoModalStore = create<UploadVideoModalState>((set, get) => ({
  // Initial state
  selectedFile: null,
  isDragOver: false,
  isUploading: false,
  uploadProgress: 0,
  uploadComplete: false,
  
  // Actions
  setSelectedFile: (file: File | null) => set({ selectedFile: file, uploadComplete: false }),
  setIsDragOver: (isDragOver: boolean) => set({ isDragOver }),
  setIsUploading: (isUploading: boolean) => set({ isUploading }),
  setUploadProgress: (progress: number) => set({ uploadProgress: progress }),
  setUploadComplete: (complete: boolean) => set({ uploadComplete: complete }),
  
  resetUploadState: () => set({
    selectedFile: null,
    isDragOver: false,
    isUploading: false,
    uploadProgress: 0,
    uploadComplete: false
  }),
  
  formatFileSize: (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  handleUpload: async () => {
    const { selectedFile, setIsUploading, setUploadProgress, setUploadComplete } = get();
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  },
}));