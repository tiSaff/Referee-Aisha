import { User, VideoData, Notification, Topic } from '../types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
};

export const validateUser = (user: Partial<User>): string[] => {
  const errors: string[] = [];

  if (!user.firstName?.trim()) {
    errors.push('First name is required');
  }

  if (!user.lastName?.trim()) {
    errors.push('Last name is required');
  }

  if (!user.email?.trim()) {
    errors.push('Email is required');
  } else if (!validateEmail(user.email)) {
    errors.push('Invalid email format');
  }

  if (!user.phone?.trim()) {
    errors.push('Phone number is required');
  } else if (!validatePhone(user.phone)) {
    errors.push('Invalid phone number format');
  }

  return errors;
};

export const validateVideoData = (video: Partial<VideoData>): string[] => {
  const errors: string[] = [];

  if (!video.title?.trim()) {
    errors.push('Title is required');
  }

  if (!video.description?.trim()) {
    errors.push('Description is required');
  }

  if (!video.location?.trim()) {
    errors.push('Location is required');
  }

  return errors;
};

export const validateNotification = (notification: Partial<Notification>): string[] => {
  const errors: string[] = [];

  if (!notification.title?.trim()) {
    errors.push('Title is required');
  }

  if (!notification.message?.trim()) {
    errors.push('Message is required');
  }

  return errors;
};

export const validateTopic = (topic: Partial<Topic>): string[] => {
  const errors: string[] = [];

  if (!topic.name?.trim()) {
    errors.push('Name is required');
  }

  return errors;
};