import { create } from 'zustand';
import { VideoData } from '../types';

interface TopicCorrectionPair {
  id: string;
  selectedTopic: string;
  selectedSubTopic: string;
  selectedCorrection: string;
}

interface DecisionState {
  [key: string]: boolean | string;
}

interface EditVideoModalState {
  // Form data
  editData: VideoData | null;
  selectedFile: File | null;
  isDragOver: boolean;
  isUploading: boolean;
  uploadProgress: number;
  explanations: string;
  notes: string;
  
  // Main photo selection
  mainPhotoType: 'auto' | 'upload';
  mainPhotoFile: File | null;
  
  // Decision state
  decisions: DecisionState;
  
  // Topic-correction pairs
  topicPairs: TopicCorrectionPair[];
  
  // Topics system
  topicsSystem: Record<string, {
    subOptions: string[];
    considerations: string;
  }>;
  
  // Correction options
  correctionOptions: string[];
  
  // Actions
  setEditData: (data: VideoData | null) => void;
  setSelectedFile: (file: File | null) => void;
  setIsDragOver: (isDragOver: boolean) => void;
  setIsUploading: (isUploading: boolean) => void;
  setUploadProgress: (progress: number) => void;
  setExplanations: (explanations: string) => void;
  setNotes: (notes: string) => void;
  
  // Main photo actions
  setMainPhotoType: (type: 'auto' | 'upload') => void;
  setMainPhotoFile: (file: File | null) => void;
  
  // Decision actions
  setDecision: (key: string, value: boolean) => void;
  
  // Topic pair actions
  addTopicPair: () => void;
  removeTopicPair: (id: string) => void;
  updateTopicPair: (id: string, field: keyof TopicCorrectionPair, value: string) => void;
  
  // Form actions
  updateEditDataField: (field: string, value: string) => void;
  resetForm: () => void;
  initializeWithVideo: (video: VideoData) => void;
}

export const useEditVideoModalStore = create<EditVideoModalState>((set, get) => ({
  // Initial state
  editData: null,
  selectedFile: null,
  isDragOver: false,
  isUploading: false,
  uploadProgress: 0,
  explanations: '',
  notes: '',
  
  // Main photo selection
  mainPhotoType: 'auto',
  mainPhotoFile: null,
  
  // Initial decisions state
  decisions: {
    // Basic decisions
    noFoul: false,
    indirectFreeKick: false,
    directFreeKick: false,
    penaltyKick: false,
    goal: false,
    
    // Offside decisions
    offside: false,
    offsideInterferingPlay: false,
    offsideInterferingOpponent: false,
    offsideGainingAdvantage: false,
    noOffside: false,
    
    // Card decisions
    noCard: false,
    noCard1: false,
    noCard2: false,
    yellowCard: false,
    yellowCard3: false,
    yellowCard4: false,
    yellowCard5: false,
    redCard: false,
    redCard6: false,
    redCard7: false,
    redCard8: false,
    
    // VAR decisions
    varYes: false,
    varYesOFR: false,
    varYesVAROnly: false,
    varNo: false
  },
  
  // Initial topic pairs
  topicPairs: [
    {
      id: '1',
      selectedTopic: '',
      selectedSubTopic: '',
      selectedCorrection: ''
    }
  ],
  
  // Topics system configuration
  topicsSystem: {
    'Tactical Fouls': {
      subOptions: ['SPA', 'DOGSO', 'No foul'],
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
VAR line of intervention`
    },
    'Challenges': {
      subOptions: ['No foul', 'Careless', 'Reckless', 'Excessive Force'],
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
Communicate important details`
    },
    'Handball': {
      subOptions: [],
      considerations: `-Football understanding
-Deliberate (additional movement)
-Justifiable position or movements (natural)
-Taking a risk - Making body unnaturally bigger (extended arm/away from the body)
-Potential exceptions (ball from teammate - him/herself)
-Attacker handball concept (scores directly/immediately)
-VAR line of intervention`
    },
    'Penalty Area Incidents': {
      subOptions: [],
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
-VAR line of intervention`
    },
    'Game Management': {
      subOptions: [],
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
-Communication`
    },
    'Assistant Referee': {
      subOptions: [],
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
-Line of intervention`
    }
  },
  
  correctionOptions: ['Correct', 'Incorrect'],
  
  // Basic setters
  setEditData: (data: VideoData | null) => set({ editData: data }),
  setSelectedFile: (file: File | null) => set({ selectedFile: file }),
  setIsDragOver: (isDragOver: boolean) => set({ isDragOver }),
  setIsUploading: (isUploading: boolean) => set({ isUploading }),
  setUploadProgress: (progress: number) => set({ uploadProgress: progress }),
  setExplanations: (explanations: string) => set({ explanations }),
  setNotes: (notes: string) => set({ notes }),
  
  // Main photo setters
  setMainPhotoType: (type: 'auto' | 'upload') => set({ mainPhotoType: type }),
  setMainPhotoFile: (file: File | null) => set({ mainPhotoFile: file }),
  
  // Decision actions with sub-option logic
  setDecision: (decisionKey: string, checked: boolean) => {
    const { decisions } = get();
    const newDecisions = { ...decisions };
    
    // Handle main decision
    newDecisions[decisionKey] = checked;
    
    // Handle sub-option logic
    if (decisionKey === 'offside') {
      if (!checked) {
        // If offside is unchecked, uncheck all sub-options
        newDecisions.offsideInterferingPlay = false;
        newDecisions.offsideInterferingOpponent = false;
        newDecisions.offsideGainingAdvantage = false;
      }
    }
    
    if (decisionKey === 'noCard') {
      if (!checked) {
        // If no card is unchecked, uncheck sub-options
        newDecisions.noCard1 = false;
        newDecisions.noCard2 = false;
      }
    }
    
    if (decisionKey === 'yellowCard') {
      if (!checked) {
        // If yellow card is unchecked, uncheck sub-options
        newDecisions.yellowCard3 = false;
        newDecisions.yellowCard4 = false;
        newDecisions.yellowCard5 = false;
      }
    }
    
    if (decisionKey === 'redCard') {
      if (!checked) {
        // If red card is unchecked, uncheck sub-options
        newDecisions.redCard6 = false;
        newDecisions.redCard7 = false;
        newDecisions.redCard8 = false;
      }
    }
    
    if (decisionKey === 'varYes') {
      if (!checked) {
        // If VAR Yes is unchecked, uncheck sub-options
        newDecisions.varYesOFR = false;
        newDecisions.varYesVAROnly = false;
      }
    }
    
    // Auto-check parent when sub-option is checked
    if (['offsideInterferingPlay', 'offsideInterferingOpponent', 'offsideGainingAdvantage'].includes(decisionKey) && checked) {
      newDecisions.offside = true;
    }
    
    if (['noCard1', 'noCard2'].includes(decisionKey) && checked) {
      newDecisions.noCard = true;
    }
    
    if (['yellowCard3', 'yellowCard4', 'yellowCard5'].includes(decisionKey) && checked) {
      newDecisions.yellowCard = true;
    }
    
    if (['redCard6', 'redCard7', 'redCard8'].includes(decisionKey) && checked) {
      newDecisions.redCard = true;
    }
    
    if (['varYesOFR', 'varYesVAROnly'].includes(decisionKey) && checked) {
      newDecisions.varYes = true;
    }
    
    set({ decisions: newDecisions });
  },
  
  // Topic pair actions
  addTopicPair: () => {
    const { topicPairs } = get();
    const newPair: TopicCorrectionPair = {
      id: Date.now().toString(),
      selectedTopic: '',
      selectedSubTopic: '',
      selectedCorrection: ''
    };
    set({ topicPairs: [...topicPairs, newPair] });
  },
  
  removeTopicPair: (id: string) => {
    const { topicPairs } = get();
    if (topicPairs.length > 1) {
      set({ topicPairs: topicPairs.filter(pair => pair.id !== id) });
    }
  },
  
  updateTopicPair: (id: string, field: keyof TopicCorrectionPair, value: string) => {
    const { topicPairs } = get();
    const updatedPairs = topicPairs.map(pair => {
      if (pair.id === id) {
        const updatedPair = { ...pair, [field]: value };
        
        // If topic changes, reset sub-topic
        if (field === 'selectedTopic') {
          updatedPair.selectedSubTopic = '';
        }
        
        return updatedPair;
      }
      return pair;
    });
    set({ topicPairs: updatedPairs });
  },
  
  // Form actions
  updateEditDataField: (field: string, value: string) => {
    const { editData } = get();
    if (!editData) return;
    
    set({
      editData: {
        ...editData,
        [field]: value
      }
    });
  },
  
  resetForm: () => {
    set({
      editData: null,
      selectedFile: null,
      isDragOver: false,
      isUploading: false,
      uploadProgress: 0,
      explanations: '',
      notes: '',
      mainPhotoType: 'auto',
      mainPhotoFile: null,
      decisions: {
        // Reset all decisions to false
        noFoul: false,
        indirectFreeKick: false,
        directFreeKick: false,
        penaltyKick: false,
        goal: false,
        offside: false,
        offsideInterferingPlay: false,
        offsideInterferingOpponent: false,
        offsideGainingAdvantage: false,
        noOffside: false,
        noCard: false,
        noCard1: false,
        noCard2: false,
        yellowCard: false,
        yellowCard3: false,
        yellowCard4: false,
        yellowCard5: false,
        redCard: false,
        redCard6: false,
        redCard7: false,
        redCard8: false,
        varYes: false,
        varYesOFR: false,
        varYesVAROnly: false,
        varNo: false
      },
      topicPairs: [
        {
          id: '1',
          selectedTopic: '',
          selectedSubTopic: '',
          selectedCorrection: ''
        }
      ]
    });
  },
  
  initializeWithVideo: (video: VideoData) => {
    set({
      editData: { ...video },
      selectedFile: null,
      isDragOver: false,
      isUploading: false,
      uploadProgress: 0,
      explanations: '',
      notes: '',
      mainPhotoType: 'auto',
      mainPhotoFile: null,
      // Keep current decisions and topic pairs when initializing
    });
  }
}));