import { create } from 'zustand';
import { ApiError } from '../types';

interface DashboardStats {
  totalUsers: number;
  totalVideos: number;
  pendingVideos: number;
  totalViews: number;
}

interface UsersByLocation {
  location: string;
  count: number;
}

interface VideoStatistics {
  month: string;
  videos: number;
}

interface DecisionStats {
  correct: number;
  incorrect: number;
}

interface MostViewedVideo {
  title: string;
  views: number;
  uploadedBy: string;
}

interface RecentActivity {
  id: number;
  user: string;
  action: string;
  description: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'view';
}

interface DashboardData {
  stats: DashboardStats;
  usersByLocation: UsersByLocation[];
  videoStatistics: VideoStatistics[];
  decisionStats: DecisionStats;
  mostViewedVideos: MostViewedVideo[];
  recentActivities: RecentActivity[];
}

interface DashboardState {
  dashboardData: DashboardData | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchDashboardData: () => Promise<void>;
  clearError: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardData: null,
  loading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      // Mock dashboard data
      const mockDashboardData: DashboardData = {
        stats: {
          totalUsers: 340,
          totalVideos: 294,
          pendingVideos: 2,
          totalViews: 294
        },
        usersByLocation: [
          { location: 'Al Ahli Club Stadium', count: 45 },
          { location: 'Al Nasr Club Stadium', count: 38 },
          { location: 'Reserve Of Prince Faisal Bin Fahad Stadium', count: 35 },
          { location: 'Al Hilal Club Stadium', count: 32 },
          { location: 'Al Shabab Club Stadium', count: 28 },
          { location: 'Assistant Club Stadium', count: 25 },
          { location: 'Jeddah Club Stadium', count: 22 },
          { location: 'Prince Abdullah bin Jalawi Sports City Stadium', count: 20 },
          { location: 'King Khalid Sport City Stadium', count: 18 },
          { location: 'Al Ettifaq Club Stadium', count: 15 }
        ],
        videoStatistics: [
          { month: 'Jan 2025', videos: 45 },
          { month: 'Feb 2025', videos: 52 },
          { month: 'Mar 2025', videos: 38 },
          { month: 'Apr 2025', videos: 61 },
          { month: 'May 2025', videos: 48 },
          { month: 'Jun 2025', videos: 50 }
        ],
        decisionStats: {
          correct: 234,
          incorrect: 60
        },
        mostViewedVideos: [
          { title: 'R-22-KHALEEJ SHABAB-23-GM-PM - Tamara', views: 3421, uploadedBy: 'Hassan Alhussain' },
          { title: 'Premier League - VAR Decision Analysis', views: 2156, uploadedBy: 'Roberto Diaz' },
          { title: 'La Liga - Offside Training Session', views: 1876, uploadedBy: 'Tamara Garcia Lorenzo' },
          { title: 'Champions League - Red Card Analysis', views: 1567, uploadedBy: 'Aleksandr Petrosyan' },
          { title: 'World Cup Qualifier - Handball Decision', views: 1345, uploadedBy: 'Ali Al Traifi' },
          { title: 'Serie A - Communication Excellence', views: 1234, uploadedBy: 'Mohamed Mansor' },
          { title: 'Bundesliga - Tactical Foul Analysis', views: 1089, uploadedBy: 'Roberto Diaz' },
          { title: 'MLS - Player Management Techniques', views: 892, uploadedBy: 'Ali Al Traifi' }
        ],
        recentActivities: [
          {
            id: 1,
            user: 'Hassan Alhussain',
            action: 'Video Upload',
            description: 'Uploaded new training video "VAR Decision Making"',
            timestamp: '2025-06-19 14:30:00',
            type: 'create'
          },
          {
            id: 2,
            user: 'Sarah Alansari',
            action: 'User Login',
            description: 'Logged into the system',
            timestamp: '2025-06-19 14:15:00',
            type: 'view'
          },
          {
            id: 3,
            user: 'Roberto Diaz',
            action: 'Video Analysis',
            description: 'Completed analysis for video ID: VID-2025-015',
            timestamp: '2025-06-19 13:45:00',
            type: 'update'
          },
          {
            id: 4,
            user: 'Tamara Garcia Lorenzo',
            action: 'Topic Creation',
            description: 'Created new topic "Advanced Positioning"',
            timestamp: '2025-06-19 13:20:00',
            type: 'create'
          },
          {
            id: 5,
            user: 'Ali Al Traifi',
            action: 'Notification Sent',
            description: 'Sent notification to 45 external users',
            timestamp: '2025-06-19 12:55:00',
            type: 'create'
          },
          {
            id: 6,
            user: 'Mohamed Mansor',
            action: 'Video Review',
            description: 'Reviewed and approved video "Penalty Area Incidents"',
            timestamp: '2025-06-19 12:30:00',
            type: 'update'
          },
          {
            id: 7,
            user: 'Aleksandr Petrosyan',
            action: 'User Profile Update',
            description: 'Updated profile information and permissions',
            timestamp: '2025-06-19 11:45:00',
            type: 'update'
          },
          {
            id: 8,
            user: 'Hassan Alhussain',
            action: 'System Backup',
            description: 'Initiated system backup process',
            timestamp: '2025-06-19 11:00:00',
            type: 'create'
          }
        ]
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ dashboardData: mockDashboardData, loading: false });
    } catch (error) {
      const apiError = error as ApiError;
      set({ error: apiError.message, loading: false });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));