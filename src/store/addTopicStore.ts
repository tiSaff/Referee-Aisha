import { create } from 'zustand';

interface Topic {
  id: string;
  name: string;
  arabicName: string;
  considerations: string;
  subtopics: string[];
  image?: string;
}

interface TopicData {
  subtopics: string[];
  considerations: string;
  image: string;
}

interface AddTopicState {
  // Form fields
  topicName: string;
  arabicName: string;
  considerations: string;
  subtopics: string[];
  selectedFile: File | null;
  isDragOver: boolean;
  
  // Modal states
  showCreateModal: boolean;
  showEditModal: boolean;
  showViewModal: boolean;
  
  // Current editing/viewing topics
  editingTopic: Topic | null;
  viewingTopic: Topic | null;
  
  // Search and UI
  searchTerm: string;
  activeDropdown: string | null;
  
  // Existing topics data
  existingTopics: Topic[];
  
  // Predefined topics configuration
  predefinedTopics: Record<string, TopicData>;
  
  // Actions
  setTopicName: (name: string) => void;
  setArabicName: (name: string) => void;
  setConsiderations: (considerations: string) => void;
  setSubtopics: (subtopics: string[]) => void;
  setSelectedFile: (file: File | null) => void;
  setIsDragOver: (isDragOver: boolean) => void;
  setShowCreateModal: (show: boolean) => void;
  setShowEditModal: (show: boolean) => void;
  setShowViewModal: (show: boolean) => void;
  setEditingTopic: (topic: Topic | null) => void;
  setViewingTopic: (topic: Topic | null) => void;
  setSearchTerm: (term: string) => void;
  setActiveDropdown: (id: string | null) => void;
  
  // Complex actions
  addSubtopic: () => void;
  removeSubtopic: (index: number) => void;
  updateSubtopic: (index: number, value: string) => void;
  resetForm: () => void;
  handleEdit: (topic: Topic) => void;
  handleView: (topic: Topic) => void;
  handleDelete: (topicId: string) => void;
  handleSubmit: () => void;
  autoPopulateFromPredefined: (topicName: string) => void;
  
  // Computed values
  getFilteredTopics: () => Topic[];
}

export const useAddTopicStore = create<AddTopicState>((set, get) => ({
  // Initial state
  topicName: '',
  arabicName: '',
  considerations: '',
  subtopics: [],
  selectedFile: null,
  isDragOver: false,
  showCreateModal: false,
  showEditModal: false,
  showViewModal: false,
  editingTopic: null,
  viewingTopic: null,
  searchTerm: '',
  activeDropdown: null,
  
  // Predefined topics configuration
  predefinedTopics: {
    'tactical fouls': {
      subtopics: ['SPA', 'DOGSO', 'No foul'],
      considerations: `Football understanding
Team tactics - Fast transitions
Reading and anticipation
DOGSO
-Number and location of players
-Direction / Distance / Speed
-Control of the ball
-PAI -Attempt to play the ball
SPA
-Different scenarios
-Speed
-Open space
-Options of play
VAR line of intervention`,
      image: '/images/tactical.png'
    },
    'challenges': {
      subtopics: ['No foul', 'Careless', 'Reckless', 'Excessive Force'],
      considerations: `Football understanding
Match control
-Protect the game - Protect players
-Normal football contact
-Careless - Reckless - Excessive force
Use clear considerations
-Who plays the ball
-Who initiates contact
-Intensity - Speed - Force
Illegal use of arms
-Clear movement or 2nd action
-Point of contact
Teamwork
Communicate important details`,
      image: '/images/challenges.png'
    },
    'handball': {
      subtopics: [],
      considerations: `-Football understanding
-Deliberate (additional movement)
-Justifiable position or movements (natural)
-Taking a risk - Making body unnaturally bigger (extended arm/away from the body)
-Potential exceptions (ball from teammate - him/herself)
-Attacker handball concept (scores directly/immediately)
-VAR line of intervention`,
      image: '/images/handball.png'
    },
    'penalty area incidents': {
      subtopics: [],
      considerations: `-Football understanding
-Big priority
-Positioning and reading
-Proximity and angle of view
-See important details
-Clear considerations and criteria
-Set pieces - Match preparation
-Use of the arms (holding - pushing)
-Teamwork - Communication
-Uniformity and consistency
-VAR line of intervention`,
      image: '/images/penalty.png'
    },
    'game management': {
      subtopics: [],
      considerations: `Match control
-Football understanding (Competition - Team Tactics - Atmosphere)
-Clear priorities
-Restart procedures
-Use your personality (Be yourself)
-Correct use of tools (Signals - Verbal warning - Whistle - Cards - Flag Technique - Spray)
Players Management
-RespectoBody language
-Communication
-Prevention
-Dissent / Confrontation
-Unsporting behaviour
-Fair play
VAR
-Protect the game
-Follow procedures
-Be proactive
-Communication`,
      image: '/images/gamemana.png'
    },
    'assistant referee': {
      subtopics: [],
      considerations: `Football understanding
Responsibility of the full team
Interfering with an opponent
-Clear impact
-Challenging - preventing - obstructing
Gaining an advantage
-Control of the ball
-Deliberate play vs deliberate action
-Deflection - rebound
-Deliberate save
VAR
-Procedures and communication
-Line of intervention`,
      image: '/images/assistant.png'
    }
  },
  
  // Initialize existing topics
  existingTopics: [
    {
      id: '1',
      name: 'Tactical Fouls',
      arabicName: 'المخالفات التكتيكية',
      considerations: `Football understanding
Team tactics - Fast transitions
Reading and anticipation
DOGSO
-Number and location of players
-Direction / Distance / Speed
-Control of the ball
-PAI -Attempt to play the ball
SPA
-Different scenarios
-Speed
-Open space
-Options of play
VAR line of intervention`,
      subtopics: ['SPA', 'DOGSO', 'No foul'],
      image: '/images/tactical.png'
    },
    {
      id: '2',
      name: 'Challenges',
      arabicName: 'التحديات',
      considerations: `Football understanding
Match control
-Protect the game - Protect players
-Normal football contact
-Careless - Reckless - Excessive force
Use clear considerations
-Who plays the ball
-Who initiates contact
-Intensity - Speed - Force
Illegal use of arms
-Clear movement or 2nd action
-Point of contact
Teamwork
Communicate important details`,
      subtopics: ['No foul', 'Careless', 'Reckless', 'Excessive Force'],
      image: '/images/challenges.png'
    },
    {
      id: '3',
      name: 'Handball',
      arabicName: 'لمس اليد',
      considerations: `-Football understanding
-Deliberate (additional movement)
-Justifiable position or movements (natural)
-Taking a risk - Making body unnaturally bigger (extended arm/away from the body)
-Potential exceptions (ball from teammate - him/herself)
-Attacker handball concept (scores directly/immediately)
-VAR line of intervention`,
      subtopics: [],
      image: '/images/handball.png'
    },
    {
      id: '4',
      name: 'Penalty Area Incidents',
      arabicName: 'حوادث منطقة الجزاء',
      considerations: `-Football understanding
-Big priority
-Positioning and reading
-Proximity and angle of view
-See important details
-Clear considerations and criteria
-Set pieces - Match preparation
-Use of the arms (holding - pushing)
-Teamwork - Communication
-Uniformity and consistency
-VAR line of intervention`,
      subtopics: [],
      image: '/images/penalty.png'
    },
    {
      id: '5',
      name: 'Game Management',
      arabicName: 'إدارة المباراة',
      considerations: `Match control
-Football understanding (Competition - Team Tactics - Atmosphere)
-Clear priorities
-Restart procedures
-Use your personality (Be yourself)
-Correct use of tools (Signals - Verbal warning - Whistle - Cards - Flag Technique - Spray)
Players Management
-RespectoBody language
-Communication
-Prevention
-Dissent / Confrontation
-Unsporting behaviour
-Fair play
VAR
-Protect the game
-Follow procedures
-Be proactive
-Communication`,
      subtopics: [],
      image: '/images/gamemana.png'
    },
    {
      id: '6',
      name: 'Assistant Referee',
      arabicName: 'مساعد الحكم',
      considerations: `Football understanding
Responsibility of the full team
Interfering with an opponent
-Clear impact
-Challenging - preventing - obstructing
Gaining an advantage
-Control of the ball
-Deliberate play vs deliberate action
-Deflection - rebound
-Deliberate save
VAR
-Procedures and communication
-Line of intervention`,
      subtopics: [],
      image: '/images/assistant.png'
    }
  ],
  
  // Basic setters
  setTopicName: (name: string) => {
    set({ topicName: name });
    // Auto-populate when topic name changes
    get().autoPopulateFromPredefined(name);
  },
  
  setArabicName: (name: string) => set({ arabicName: name }),
  setConsiderations: (considerations: string) => set({ considerations }),
  setSubtopics: (subtopics: string[]) => set({ subtopics }),
  setSelectedFile: (file: File | null) => set({ selectedFile: file }),
  setIsDragOver: (isDragOver: boolean) => set({ isDragOver }),
  setShowCreateModal: (show: boolean) => set({ showCreateModal: show }),
  setShowEditModal: (show: boolean) => set({ showEditModal: show }),
  setShowViewModal: (show: boolean) => set({ showViewModal: show }),
  setEditingTopic: (topic: Topic | null) => set({ editingTopic: topic }),
  setViewingTopic: (topic: Topic | null) => set({ viewingTopic: topic }),
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  setActiveDropdown: (id: string | null) => set({ activeDropdown: id }),
  
  // Complex actions
  addSubtopic: () => {
    const { subtopics } = get();
    set({ subtopics: [...subtopics, ''] });
  },
  
  removeSubtopic: (index: number) => {
    const { subtopics } = get();
    set({ subtopics: subtopics.filter((_, i) => i !== index) });
  },
  
  updateSubtopic: (index: number, value: string) => {
    const { subtopics } = get();
    const newSubtopics = [...subtopics];
    newSubtopics[index] = value;
    set({ subtopics: newSubtopics });
  },
  
  resetForm: () => {
    set({
      topicName: '',
      arabicName: '',
      considerations: '',
      subtopics: [],
      selectedFile: null,
      editingTopic: null
    });
  },
  
  handleEdit: (topic: Topic) => {
    set({
      editingTopic: topic,
      topicName: topic.name,
      arabicName: topic.arabicName,
      considerations: topic.considerations,
      subtopics: topic.subtopics,
      showEditModal: true,
      activeDropdown: null
    });
  },
  
  handleView: (topic: Topic) => {
    set({
      viewingTopic: topic,
      showViewModal: true,
      activeDropdown: null
    });
  },
  
  handleDelete: (topicId: string) => {
    const { existingTopics } = get();
    set({
      existingTopics: existingTopics.filter(topic => topic.id !== topicId),
      activeDropdown: null
    });
  },
  
  handleSubmit: () => {
    const { 
      topicName, 
      arabicName, 
      considerations, 
      subtopics, 
      selectedFile, 
      editingTopic, 
      existingTopics 
    } = get();
    
    const filteredSubtopics = subtopics.filter(subtopic => subtopic.trim() !== '');
    
    const newTopic: Topic = {
      id: editingTopic ? editingTopic.id : Date.now().toString(),
      name: topicName,
      arabicName,
      considerations,
      subtopics: filteredSubtopics,
      image: selectedFile ? URL.createObjectURL(selectedFile) : editingTopic?.image
    };

    if (editingTopic) {
      set({
        existingTopics: existingTopics.map(topic => 
          topic.id === editingTopic.id ? newTopic : topic
        ),
        showEditModal: false
      });
    } else {
      set({
        existingTopics: [...existingTopics, newTopic],
        showCreateModal: false
      });
    }
    
    get().resetForm();
  },
  
  autoPopulateFromPredefined: (topicName: string) => {
    const { predefinedTopics } = get();
    const lowerTopicName = topicName.toLowerCase();
    const predefinedTopic = predefinedTopics[lowerTopicName];
    
    if (predefinedTopic) {
      set({
        subtopics: predefinedTopic.subtopics,
        considerations: predefinedTopic.considerations
      });
    }
  },
  
  getFilteredTopics: () => {
    const { existingTopics, searchTerm } = get();
    return existingTopics.filter(topic =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.arabicName.includes(searchTerm)
    );
  }
}));