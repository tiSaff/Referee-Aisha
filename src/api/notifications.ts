import { apiClient } from './client';
import { Notification, ApiResponse } from '../types';
import { validateNotification } from '../utils/validation';

export const notificationsApi = {
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    try {
      // Mock data
      const mockNotifications: Notification[] = [
        {
          id: 368,
          title: 'Video Approved',
          message: 'Your video analysis has been approved and is now available for review.',
          assignedTo: 'Specific Users',
          date: '2025-06-18 09:57:16',
          status: 'sent',
          recipients: 15
        },
        {
          id: 367,
          title: 'Video Approved',
          message: 'New training video has been uploaded to the platform.',
          assignedTo: 'Specific Users',
          date: '2025-06-18 09:51:46',
          status: 'sent',
          recipients: 8
        },
        // Add more mock notifications as needed
      ];

      return {
        data: mockNotifications,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },

  async createNotification(notificationData: Partial<Notification>): Promise<ApiResponse<Notification>> {
    try {
      const validationErrors = validateNotification(notificationData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      const newNotification: Notification = {
        id: Date.now(),
        title: notificationData.title!,
        message: notificationData.message!,
        assignedTo: notificationData.assignedTo || 'All Users',
        date: new Date().toISOString(),
        status: 'pending',
        recipients: notificationData.recipients || 0
      };

      return {
        data: newNotification,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },

  async deleteNotification(id: number): Promise<ApiResponse<void>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        data: undefined,
        success: true,
        message: 'Notification deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  },
};