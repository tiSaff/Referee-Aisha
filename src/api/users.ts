import { apiClient } from './client';
import { User, ApiResponse } from '../types';
import { validateUser } from '../utils/validation';

export const usersApi = {
  async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      // For now, return mock data since we don't have a real backend
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'Hassan Alhussain',
          firstName: 'Hassan',
          lastName: 'Alhussain',
          email: 'hassan@referee.com',
          status: 'active',
          joinDate: '2023-01-15',
          lastActive: '2 hours ago',
          location: 'Dubai, UAE',
          phone: '+971 50 123 4567',
          videosAnalyzed: 145,
          department: 'Super Admin', // NEW: Role field for MySAFF users
          permissions: {
            videoPendingPermission: true,
            videoUnderReviewPermission: true,
            videoAcceptedPermission: true,
            uploadVideoPermission: true,
            settingsAddConsiderationsPermission: true,
            settingsAddTopicPermission: true,
            addNotification: true,
            viewUsersExternal: true,
            accountResponsibleForAddingUsers: true,
            accountIsActive: true
          }
        },
        {
          id: 2,
          name: 'Farkhad Abdullaev',
          firstName: 'Farkhad',
          lastName: 'Abdullaev',
          email: 'farkhad@referee.com',
          status: 'active',
          joinDate: '2023-02-20',
          lastActive: '1 day ago',
          location: 'Tashkent, Uzbekistan',
          phone: '+998 90 123 4567',
          videosAnalyzed: 89,
          department: 'Admin', // NEW: Role field for MySAFF users
          permissions: {
            videoPendingPermission: true,
            videoUnderReviewPermission: false,
            videoAcceptedPermission: true,
            uploadVideoPermission: true,
            settingsAddConsiderationsPermission: false,
            settingsAddTopicPermission: false,
            addNotification: false,
            viewUsersExternal: false,
            accountResponsibleForAddingUsers: false,
            accountIsActive: true
          }
        },
        // NEW: Additional mock users with different roles
        {
          id: 3,
          name: 'Media SAFFIR User',
          firstName: 'Media',
          lastName: 'SAFFIR',
          email: 'media@referee.com',
          status: 'active',
          joinDate: '2023-03-10',
          lastActive: '3 hours ago',
          location: 'Riyadh, Saudi Arabia',
          phone: '+966 50 123 4567',
          videosAnalyzed: 67,
          department: 'Media SAFFIR',
          permissions: {
            videoPendingPermission: true,
            videoUnderReviewPermission: true,
            videoAcceptedPermission: true,
            uploadVideoPermission: true,
            settingsAddConsiderationsPermission: false,
            settingsAddTopicPermission: false,
            addNotification: false,
            viewUsersExternal: false,
            accountResponsibleForAddingUsers: false,
            accountIsActive: true
          }
        },
        {
          id: 4,
          name: 'Event SAFFIR User',
          firstName: 'Event',
          lastName: 'SAFFIR',
          email: 'event@referee.com',
          status: 'active',
          joinDate: '2023-04-05',
          lastActive: '1 hour ago',
          location: 'Doha, Qatar',
          phone: '+974 50 123 4567',
          videosAnalyzed: 34,
          department: 'Event SAFFIR',
          permissions: {
            videoPendingPermission: true,
            videoUnderReviewPermission: false,
            videoAcceptedPermission: true,
            uploadVideoPermission: false,
            settingsAddConsiderationsPermission: false,
            settingsAddTopicPermission: false,
            addNotification: false,
            viewUsersExternal: false,
            accountResponsibleForAddingUsers: false,
            accountIsActive: true
          }
        }
      ];

      return {
        data: mockUsers,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },

  async getUserById(id: number): Promise<ApiResponse<User>> {
    try {
      // Mock implementation
      const users = await this.getUsers();
      const user = users.data.find(u => u.id === id);
      
      if (!user) {
        throw new Error('User not found');
      }

      return {
        data: user,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },

  async createUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const validationErrors = validateUser(userData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      // Mock implementation - in real app, this would call the API
      const newUser: User = {
        id: Date.now(), // Mock ID generation
        name: `${userData.firstName} ${userData.lastName}`,
        firstName: userData.firstName!,
        lastName: userData.lastName!,
        email: userData.email!,
        status: 'pending',
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: 'Never',
        location: userData.location || '',
        phone: userData.phone!,
        videosAnalyzed: 0,
        department: userData.department || '', // NEW: Role field
        permissions: userData.permissions || {
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

      return {
        data: newUser,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },

  async updateUser(id: number, userData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const validationErrors = validateUser(userData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      // Mock implementation
      const existingUser = await this.getUserById(id);
      const updatedUser: User = {
        ...existingUser.data,
        ...userData,
        name: `${userData.firstName || existingUser.data.firstName} ${userData.lastName || existingUser.data.lastName}`,
      };

      return {
        data: updatedUser,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id: number): Promise<ApiResponse<void>> {
    try {
      // Mock implementation - in real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

      return {
        data: undefined,
        success: true,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  },
};