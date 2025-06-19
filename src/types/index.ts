export interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
  location: string;
  phone: string;
  avatar?: string;
  videosAnalyzed: number;
  department: string;
  permissions: UserPermissions;
}

export interface UserPermissions {
  videoPendingPermission: boolean;
  videoUnderReviewPermission: boolean;
  videoAcceptedPermission: boolean;
  uploadVideoPermission: boolean;
  settingsAddConsiderationsPermission: boolean;
  settingsAddTopicPermission: boolean;
  addNotification: boolean;
  viewUsersExternal: boolean;
  accountResponsibleForAddingUsers: boolean;
  accountIsActive: boolean;
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  uploadDate: string;
  duration: string;
  size: string;
  format: string;
  resolution: string;
  uploadedBy: string;
  location: string;
  tags: string[];
  status: 'pending' | 'published'; // Updated to only include pending and published
  views: number;
  lastModified: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  assignedTo: 'All Users' | 'Specific Users';
  date: string;
  status: 'sent' | 'pending' | 'failed';
  recipients: number;
}

export interface Topic {
  id: string;
  name: string;
  arabicName: string;
  considerations: string;
  file?: File;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}