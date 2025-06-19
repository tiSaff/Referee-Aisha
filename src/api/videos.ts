import { apiClient } from './client';
import { VideoData, ApiResponse } from '../types';
import { validateVideoData } from '../utils/validation';

export const videosApi = {
  async getVideos(): Promise<ApiResponse<VideoData[]>> {
    try {
      // Mock data for now - updated to include 25 total videos with pending and published statuses
      const mockVideos: VideoData[] = [
        {
          id: 'VID-2025-001',
          title: 'R-22-KHALEEJ SHABAB-23-GM-PM - Tamara',
          description: 'Professional league match analysis focusing on referee positioning and decision-making during critical game moments.',
          uploadDate: '2025-01-15 14:30:22',
          duration: '12:45',
          size: '245.8 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Hassan Alhussain',
          location: 'Dubai Sports Stadium, UAE',
          tags: ['Game Management', 'Positioning', 'Professional League', 'Training'],
          status: 'published',
          views: 1247,
          lastModified: '2025-01-16 09:15:33'
        },
        {
          id: 'VID-2025-002',
          title: 'Premier League - VAR Decision Analysis',
          description: 'Detailed analysis of VAR decision-making process during controversial penalty call.',
          uploadDate: '2025-01-14 16:20:15',
          duration: '8:32',
          size: '156.3 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Roberto Diaz',
          location: 'Wembley Stadium, London',
          tags: ['VAR', 'Penalty', 'Decision Making', 'Premier League'],
          status: 'pending',
          views: 0,
          lastModified: '2025-01-14 16:20:15'
        },
        {
          id: 'VID-2025-003',
          title: 'La Liga - Offside Training Session',
          description: 'Training session focusing on offside decisions in fast-paced attacking scenarios.',
          uploadDate: '2025-01-13 11:45:30',
          duration: '15:20',
          size: '298.7 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Tamara Garcia Lorenzo',
          location: 'Camp Nou, Barcelona',
          tags: ['Offside', 'Training', 'La Liga', 'Assistant Referee'],
          status: 'published',
          views: 2156,
          lastModified: '2025-01-13 18:30:45'
        },
        {
          id: 'VID-2025-004',
          title: 'Champions League - Red Card Analysis',
          description: 'Analysis of red card decision for violent conduct during Champions League match.',
          uploadDate: '2025-01-12 20:15:45',
          duration: '6:18',
          size: '124.5 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Aleksandr Petrosyan',
          location: 'Santiago Bernabéu, Madrid',
          tags: ['Red Card', 'Violent Conduct', 'Champions League', 'Disciplinary'],
          status: 'published',
          views: 1834,
          lastModified: '2025-01-12 22:45:12'
        },
        {
          id: 'VID-2025-005',
          title: 'World Cup Qualifier - Handball Decision',
          description: 'Controversial handball decision analysis from World Cup qualifying match.',
          uploadDate: '2025-01-11 14:30:20',
          duration: '9:45',
          size: '187.2 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Ali Al Traifi',
          location: 'King Fahd Stadium, Riyadh',
          tags: ['Handball', 'World Cup', 'Penalty', 'Controversy'],
          status: 'pending',
          views: 0,
          lastModified: '2025-01-11 14:30:20'
        },
        {
          id: 'VID-2025-006',
          title: 'Serie A - Communication Excellence',
          description: 'Excellent example of referee-player communication during heated Serie A match.',
          uploadDate: '2025-01-10 19:20:10',
          duration: '11:30',
          size: '221.8 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Mohamed Mansor',
          location: 'San Siro, Milan',
          tags: ['Communication', 'Serie A', 'Player Management', 'Excellence'],
          status: 'published',
          views: 3421,
          lastModified: '2025-01-10 21:15:33'
        },
        {
          id: 'VID-2025-007',
          title: 'New analysis tools are now available',
          description: 'New analysis tools are now available for referee training.',
          uploadDate: '2025-01-09 18:14:16',
          duration: '14:22',
          size: '267.3 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Hassan Alhussain',
          location: 'Training Center, Dubai',
          tags: ['Analysis', 'Tools', 'Training', 'Technology'],
          status: 'pending',
          views: 0,
          lastModified: '2025-01-09 18:14:16'
        },
        {
          id: 'VID-2025-008',
          title: 'Bundesliga - Tactical Foul Analysis',
          description: 'Comprehensive analysis of tactical fouls and their impact on game flow.',
          uploadDate: '2025-01-08 15:30:45',
          duration: '10:15',
          size: '198.7 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Roberto Diaz',
          location: 'Allianz Arena, Munich',
          tags: ['Tactical Fouls', 'Bundesliga', 'Game Flow', 'Analysis'],
          status: 'published',
          views: 1567,
          lastModified: '2025-01-08 15:30:45'
        },
        {
          id: 'VID-2025-009',
          title: 'Ligue 1 - Corner Kick Situations',
          description: 'Analysis of corner kick situations and referee positioning.',
          uploadDate: '2025-01-07 12:45:30',
          duration: '7:38',
          size: '142.1 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Tamara Garcia Lorenzo',
          location: 'Parc des Princes, Paris',
          tags: ['Corner Kicks', 'Positioning', 'Ligue 1', 'Set Pieces'],
          status: 'pending',
          views: 0,
          lastModified: '2025-01-07 12:45:30'
        },
        {
          id: 'VID-2025-010',
          title: 'MLS - Player Management Techniques',
          description: 'Effective player management techniques during high-pressure situations.',
          uploadDate: '2025-01-06 16:20:15',
          duration: '13:52',
          size: '256.4 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Ali Al Traifi',
          location: 'Mercedes-Benz Stadium, Atlanta',
          tags: ['Player Management', 'MLS', 'Communication', 'Pressure'],
          status: 'published',
          views: 892,
          lastModified: '2025-01-06 16:20:15'
        },
        {
          id: 'VID-2025-011',
          title: 'Copa America - Free Kick Decisions',
          description: 'Analysis of free kick decisions and wall positioning in Copa America.',
          uploadDate: '2025-01-05 14:10:30',
          duration: '9:27',
          size: '178.9 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Aleksandr Petrosyan',
          location: 'Maracanã Stadium, Rio de Janeiro',
          tags: ['Free Kicks', 'Copa America', 'Wall Positioning', 'Decisions'],
          status: 'pending',
          views: 0,
          lastModified: '2025-01-05 14:10:30'
        },
        {
          id: 'VID-2025-012',
          title: 'Asian Cup - Advantage Play Analysis',
          description: 'Understanding when to play advantage and when to stop play.',
          uploadDate: '2025-01-04 11:35:20',
          duration: '11:43',
          size: '223.6 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Mohamed Mansor',
          location: 'Stadium Australia, Sydney',
          tags: ['Advantage', 'Asian Cup', 'Play Analysis', 'Decision Making'],
          status: 'published',
          views: 1345,
          lastModified: '2025-01-04 11:35:20'
        },
        {
          id: 'VID-2025-013',
          title: 'Europa League - VAR Communication',
          description: 'Effective communication between referee and VAR during match incidents.',
          uploadDate: '2025-01-03 17:25:45',
          duration: '8:14',
          size: '159.2 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Hassan Alhussain',
          location: 'Old Trafford, Manchester',
          tags: ['VAR', 'Communication', 'Europa League', 'Technology'],
          status: 'pending',
          views: 0,
          lastModified: '2025-01-03 17:25:45'
        },
        {
          id: 'VID-2025-014',
          title: 'Premier League - Penalty Area Incidents',
          description: 'Complex penalty area incidents and decision-making process.',
          uploadDate: '2025-01-02 13:40:10',
          duration: '12:18',
          size: '234.7 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Roberto Diaz',
          location: 'Anfield, Liverpool',
          tags: ['Penalty Area', 'Premier League', 'Incidents', 'Decision Making'],
          status: 'published',
          views: 2089,
          lastModified: '2025-01-02 13:40:10'
        },
        {
          id: 'VID-2025-015',
          title: 'La Liga - Assistant Referee Techniques',
          description: 'Advanced techniques for assistant referees in offside situations.',
          uploadDate: '2025-01-01 10:15:30',
          duration: '16:05',
          size: '298.1 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Tamara Garcia Lorenzo',
          location: 'Santiago Bernabéu, Madrid',
          tags: ['Assistant Referee', 'La Liga', 'Offside', 'Techniques'],
          status: 'pending',
          views: 0,
          lastModified: '2025-01-01 10:15:30'
        },
        // NEW VIDEOS ADDED BELOW
        {
          id: 'VID-2025-016',
          title: 'AFC Champions League - Simulation Analysis',
          description: 'Comprehensive analysis of simulation incidents and how to identify diving versus genuine fouls.',
          uploadDate: '2024-12-31 16:45:20',
          duration: '13:28',
          size: '267.9 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Omar said almanthari',
          location: 'Al Janoub Stadium, Qatar',
          tags: ['Simulation', 'Diving', 'AFC Champions League', 'Fair Play'],
          status: 'pending',
          views: 0,
          lastModified: '2024-12-31 16:45:20'
        },
        {
          id: 'VID-2025-017',
          title: 'FIFA World Cup - Goal Line Technology',
          description: 'Understanding goal line technology decisions and referee coordination with technology.',
          uploadDate: '2024-12-30 14:22:15',
          duration: '9:56',
          size: '189.4 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Carlos Miguel Lopez',
          location: 'Lusail Stadium, Qatar',
          tags: ['Goal Line Technology', 'FIFA World Cup', 'Technology', 'Goals'],
          status: 'published',
          views: 3245,
          lastModified: '2024-12-30 18:30:22'
        },
        {
          id: 'VID-2025-018',
          title: 'CONCACAF Gold Cup - Mass Confrontation Management',
          description: 'Effective strategies for managing mass confrontations and maintaining control.',
          uploadDate: '2024-12-29 11:15:40',
          duration: '14:33',
          size: '289.7 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Nur Amali Ihsanuddin',
          location: 'Soldier Field, Chicago',
          tags: ['Mass Confrontation', 'CONCACAF', 'Player Management', 'Control'],
          status: 'pending',
          views: 0,
          lastModified: '2024-12-29 11:15:40'
        },
        {
          id: 'VID-2025-019',
          title: 'UEFA Nations League - Injury Time Management',
          description: 'Proper calculation and management of additional time in crucial matches.',
          uploadDate: '2024-12-28 19:30:25',
          duration: '8:47',
          size: '167.2 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Islom',
          location: 'Wembley Stadium, London',
          tags: ['Injury Time', 'UEFA Nations League', 'Time Management', 'Additional Time'],
          status: 'published',
          views: 1876,
          lastModified: '2024-12-28 21:45:10'
        },
        {
          id: 'VID-2025-020',
          title: 'CAF Africa Cup - Weather Conditions Impact',
          description: 'How weather conditions affect referee decisions and match management.',
          uploadDate: '2024-12-27 15:20:35',
          duration: '11:12',
          size: '218.5 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Hassan Alhussain',
          location: 'Cairo International Stadium, Egypt',
          tags: ['Weather Conditions', 'CAF', 'Match Management', 'Environmental Factors'],
          status: 'pending',
          views: 0,
          lastModified: '2024-12-27 15:20:35'
        },
        {
          id: 'VID-2025-021',
          title: 'J-League - Substitution Procedures',
          description: 'Proper substitution procedures and common mistakes to avoid.',
          uploadDate: '2024-12-26 13:45:50',
          duration: '7:23',
          size: '145.8 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Aleksandr Petrosyan',
          location: 'Tokyo Stadium, Japan',
          tags: ['Substitutions', 'J-League', 'Procedures', 'Protocol'],
          status: 'published',
          views: 1234,
          lastModified: '2024-12-26 16:20:15'
        },
        {
          id: 'VID-2025-022',
          title: 'K-League - Advantage vs Foul Decision Making',
          description: 'Critical decision points between playing advantage and stopping play for fouls.',
          uploadDate: '2024-12-25 10:30:15',
          duration: '12:56',
          size: '251.3 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Mohamed Mansor',
          location: 'Seoul World Cup Stadium, South Korea',
          tags: ['Advantage', 'K-League', 'Decision Making', 'Fouls'],
          status: 'pending',
          views: 0,
          lastModified: '2024-12-25 10:30:15'
        },
        {
          id: 'VID-2025-023',
          title: 'A-League - Dissent and Yellow Card Consistency',
          description: 'Maintaining consistency in yellow card decisions for dissent and unsporting behavior.',
          uploadDate: '2024-12-24 17:15:30',
          duration: '10:41',
          size: '203.7 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Roberto Diaz',
          location: 'ANZ Stadium, Sydney',
          tags: ['Dissent', 'A-League', 'Yellow Cards', 'Consistency'],
          status: 'published',
          views: 1567,
          lastModified: '2024-12-24 19:30:45'
        },
        {
          id: 'VID-2025-024',
          title: 'Saudi Pro League - Derby Match Intensity',
          description: 'Managing high-intensity derby matches with passionate crowds and heated players.',
          uploadDate: '2024-12-23 20:45:10',
          duration: '15:17',
          size: '304.2 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Ali Al Traifi',
          location: 'King Fahd Stadium, Riyadh',
          tags: ['Derby', 'Saudi Pro League', 'Intensity', 'Crowd Management'],
          status: 'pending',
          views: 0,
          lastModified: '2024-12-23 20:45:10'
        },
        {
          id: 'VID-2025-025',
          title: 'UAE Pro League - Multi-Language Communication',
          description: 'Effective communication strategies in multi-cultural and multi-language environments.',
          uploadDate: '2024-12-22 14:20:25',
          duration: '9:34',
          size: '182.6 MB',
          format: 'MP4',
          resolution: '1920x1080',
          uploadedBy: 'Tamara Garcia Lorenzo',
          location: 'Mohammed bin Zayed Stadium, Abu Dhabi',
          tags: ['Communication', 'UAE Pro League', 'Multi-Language', 'Cultural Awareness'],
          status: 'published',
          views: 2134,
          lastModified: '2024-12-22 16:45:30'
        }
      ];

      return {
        data: mockVideos,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },

  async getVideoById(id: string): Promise<ApiResponse<VideoData>> {
    try {
      const videos = await this.getVideos();
      const video = videos.data.find(v => v.id === id);
      
      if (!video) {
        throw new Error('Video not found');
      }

      return {
        data: video,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },

  async updateVideo(id: string, videoData: Partial<VideoData>): Promise<ApiResponse<VideoData>> {
    try {
      const validationErrors = validateVideoData(videoData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      const existingVideo = await this.getVideoById(id);
      const updatedVideo: VideoData = {
        ...existingVideo.data,
        ...videoData,
        lastModified: new Date().toISOString(),
      };

      return {
        data: updatedVideo,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },

  async uploadVideo(file: File, metadata: Partial<VideoData>): Promise<ApiResponse<VideoData>> {
    try {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('metadata', JSON.stringify(metadata));

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload

      const newVideo: VideoData = {
        id: `VID-${Date.now()}`,
        title: metadata.title || file.name,
        description: metadata.description || '',
        uploadDate: new Date().toISOString(),
        duration: '00:00', // Would be calculated from actual video
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        format: file.type.split('/')[1].toUpperCase(),
        resolution: '1920x1080', // Would be extracted from actual video
        uploadedBy: 'Current User',
        location: metadata.location || '',
        tags: metadata.tags || [],
        status: 'pending',
        views: 0,
        lastModified: new Date().toISOString()
      };

      return {
        data: newVideo,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },
};