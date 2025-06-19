import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'ar';

interface LanguageState {
  currentLanguage: Language;
  isRTL: boolean;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

// Translation keys and values
const translations = {
  en: {
    // Header
    'header.platform': 'Referee Platform',
    
    // Sidebar
    'sidebar.backToMySAFF': 'Back to MySAFF',
    'sidebar.uploadVideo': 'Upload Video',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.videosLibrary': 'Videos Library',
    'sidebar.mysaffUsers': 'MySAFF Users',
    'sidebar.externalUsers': 'External Users',
    'sidebar.notificationsCenter': 'Notifications Center',
    'sidebar.logs': 'Logs',
    'sidebar.systemLogs': 'System Logs',
    'sidebar.userLogs': 'User Logs',
    'sidebar.errorLogs': 'Error Logs',
    'sidebar.settings': 'Settings',
    'sidebar.addTopics': 'Add topics',
    
    // Common
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.add': 'Add',
    'common.export': 'Export',
    'common.close': 'Close',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.submit': 'Submit',
    'common.create': 'Create',
    'common.update': 'Update',
    'common.actions': 'Actions',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.title': 'Title',
    'common.message': 'Message',
    'common.name': 'Name',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.location': 'Location',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.pending': 'Pending',
    'common.published': 'Published',
    'common.sent': 'Sent',
    'common.failed': 'Failed',
    'common.description': 'Description',
    
    // Videos Page
    'videos.title': 'Videos Library',
    'videos.searchPlaceholder': 'Search videos, creators, locations...',
    'videos.filterByStatus': 'Filter by Status',
    'videos.allVideos': 'All Videos',
    'videos.pendingVideos': 'Pending',
    'videos.publishedVideos': 'Published',
    'videos.noVideosFound': 'No videos found',
    'videos.tryAdjusting': 'Try adjusting your search criteria',
    'videos.noVideosAvailable': 'No videos available',
    'videos.available': 'available',
    'videos.totalVideos': 'total videos',
    'videos.results': 'results',
    'videos.allVideoContent': 'All video content',
    'videos.awaitingReview': 'Awaiting review',
    'videos.liveAndPublic': 'Live and public',
    'videos.uploadedBy': 'Uploaded by',
    'videos.duration': 'Duration',
    'videos.fileSize': 'File size',
    'videos.views': 'Views',
    'videos.videoDetails': 'Video Details',
    'videos.uploadInformation': 'Upload Information',
    'videos.technicalDetails': 'Technical Details',
    'videos.statistics': 'Statistics',
    'videos.uploadDate': 'Upload date',
    'videos.format': 'Format',
    'videos.resolution': 'Resolution',
    'videos.lastModified': 'Last modified',
    'videos.loadingMore': 'Loading more videos...',
    'videos.allVideosViewed': 'You\'ve seen all {count} videos',
    'videos.finalSave': 'Final Save',
    'videos.finalSaveConfirmation': 'Do you want to final save the video? It will be published directly.',
    'videos.yesPublish': 'Yes, Publish',
    'videos.returnToPending': 'Return to Pending',
    'videos.returnToPendingConfirmation': 'Are you sure you want to return this video to pending status?',
    'videos.yesReturnToPending': 'Yes, Return to Pending',
    
    // Users Page
    'users.title': 'MySAFF Users',
    'users.totalUsers': 'Total Users',
    'users.searchPlaceholder': 'Search users by name, email, or ID...',
    'users.noUsersFound': 'No users found',
    'users.showingUsers': 'Showing {count} of {total} users',
    'users.employeeId': 'Employee ID',
    'users.firstName': 'First Name',
    'users.lastName': 'Last Name',
    'users.phoneNumber': 'Phone Number',
    'users.uploadPersonalImage': 'Upload Personal Image',
    'users.changePassword': 'Change Password',
    'users.permissions': 'Permissions',
    'users.access': 'Access',
    'users.videoManagement': 'Video Management',
    'users.settingsConfiguration': 'Settings & Configuration',
    'users.communicationUserManagement': 'Communication & User Management',
    'users.accountStatus': 'Account Status',
    'users.videoPendingPermission': 'Video Pending Permission',
    'users.videoUnderReviewPermission': 'Video Under Review Permission',
    'users.videoAcceptedPermission': 'Video Accepted Permission',
    'users.uploadVideoPermission': 'Upload Video Permission',
    'users.addConsiderationsPermission': 'Add Considerations Permission',
    'users.addTopicPermission': 'Add Topic Permission',
    'users.addNotification': 'Add Notification',
    'users.viewExternalUsers': 'View External Users',
    'users.responsibleForAddingUsers': 'Responsible for Adding Users',
    'users.accountIsActive': 'Account is Active',
    'users.profile': 'Profile',
    'users.editUser': 'Edit User',
    'users.deleteUser': 'Delete User',
    'users.deleteConfirmation': 'Are you sure you want to delete {name}? This action cannot be undone.',
    'users.deleteWarning': 'Warning',
    'users.deleteWarningText': 'Deleting this user will permanently remove all their data, including:',
    'users.userProfileInfo': 'User profile and account information',
    'users.videoAnalysisHistory': 'Video analysis history ({count} videos)',
    'users.associatedPermissions': 'All associated permissions and settings',
    
    // External Users Page
    'externalUsers.title': 'External Users',
    'externalUsers.totalExternalUsers': 'Total External Users',
    'externalUsers.searchPlaceholder': 'Search external users by name, email, or ID...',
    'externalUsers.noExternalUsersFound': 'No external users found',
    'externalUsers.exportUsers': 'Export Users',
    'externalUsers.externalUserId': 'External User ID',
    'externalUsers.contactInformation': 'Contact Information',
    'externalUsers.activityInformation': 'Activity Information',
    'externalUsers.accessPermissions': 'Access Permissions',
    'externalUsers.videosAnalyzed': 'Videos Analyzed',
    'externalUsers.joinDate': 'Join Date',
    'externalUsers.lastActive': 'Last Active',
    'externalUsers.department': 'Department',
    'externalUsers.externalUserProfile': 'External User Profile',
    
    // Notifications Page
    'notifications.title': 'Add Notification',
    'notifications.addNotification': 'Add Notification',
    'notifications.searchPlaceholder': 'Search notifications by title or message...',
    'notifications.totalSent': 'Total Sent',
    'notifications.totalRecipients': 'Total Recipients',
    'notifications.assignedTo': 'Assigned To',
    'notifications.allUsersExternal': 'All Users External',
    'notifications.selectUsersExternal': 'Select Users External',
    'notifications.selectUsersPlaceholder': 'Enter user IDs or emails separated by commas...',
    'notifications.allUsersExternalNote': 'This field is disabled because "All Users External" is selected',
    'notifications.sendNotification': 'Send Notification',
    'notifications.noNotificationsFound': 'No notifications found',
    'notifications.tryAdjustingCriteria': 'Try adjusting your search criteria',
    'notifications.clearSearch': 'Clear Search',
    'notifications.selectExternalUsers': 'Select external users...',
    'notifications.allExternalUsersSelected': 'All external users selected',
    'notifications.searchUsers': 'Search users...',
    'notifications.noUsersFound': 'No users found',
    
    // Add Topic Page
    'addTopic.title': 'Add Topic',
    'addTopic.subtitle': 'Manage referee training topics and subtopics',
    'addTopic.addNewTopic': 'Add New Topic',
    'addTopic.createTopic': 'Create Topic',
    'addTopic.editTopic': 'Edit Topic',
    'addTopic.topicDetails': 'Topic Details',
    'addTopic.topicImage': 'Topic Image',
    'addTopic.dragAndDrop': 'Drag and drop a file here or click',
    'addTopic.browseToChoose': 'browse to choose a file',
    'addTopic.arabicName': 'الاسم',
    'addTopic.subtopics': 'Subtopics',
    'addTopic.considerations': 'Considerations',
    'addTopic.noSubtopicsAdded': 'No subtopics added',
    'addTopic.addMoreSubtopics': 'Add More',
    'addTopic.updateTopic': 'Update Topic',
    'addTopic.noTopicsFound': 'No topics found',
    'addTopic.getStartedMessage': 'Get started by creating your first topic',
    'addTopic.createFirstTopic': 'Create First Topic',
    'addTopic.searchTopics': 'Search topics...',
    'addTopic.topicsCount': '{count} of {total} topics',
    'addTopic.noImage': 'No Image',
    'addTopic.currentImage': 'Current Image',
    'addTopic.enterConsiderations': 'Enter detailed considerations for this topic...',
    
    // Upload Video Modal
    'uploadVideo.title': 'Upload Video',
    'uploadVideo.dragAndDrop': 'Drag and drop your video file here, or',
    'uploadVideo.browseToChoose': 'browse to choose a file',
    'uploadVideo.supportedFormats': 'Supported formats: MP4, AVI, MOV, WMV (Max size: 500MB)',
    'uploadVideo.uploading': 'Uploading...',
    'uploadVideo.uploadCompleted': 'Upload completed successfully!',
    'uploadVideo.uploadVideo': 'Upload video',
    'uploadVideo.uploadComplete': 'Upload Complete',
    'uploadVideo.uploadGuidelines': 'Upload Guidelines',
    'uploadVideo.guidelineQuality': 'Ensure video quality is clear for accurate analysis',
    'uploadVideo.guidelineFilename': 'Include relevant match information in the filename',
    'uploadVideo.guidelineProcessing': 'Videos will be processed automatically after upload',
    'uploadVideo.guidelineNotification': "You'll receive a notification when processing is complete",
    'uploadVideo.videoPreview': 'Video Preview',
    
    // Language Selector
    'language.english': 'English',
    'language.arabic': 'العربية',
    'language.selectLanguage': 'Select Language',
  },
  ar: {
    // Header
    'header.platform': 'منصة الحكام',
    
    // Sidebar
    'sidebar.backToMySAFF': 'العودة إلى MySAFF',
    'sidebar.uploadVideo': 'رفع فيديو',
    'sidebar.dashboard': 'لوحة التحكم',
    'sidebar.videosLibrary': 'مكتبة الفيديوهات',
    'sidebar.mysaffUsers': 'مستخدمو MySAFF',
    'sidebar.externalUsers': 'المستخدمون الخارجيون',
    'sidebar.notificationsCenter': 'مركز الإشعارات',
    'sidebar.logs': 'السجلات',
    'sidebar.systemLogs': 'سجلات النظام',
    'sidebar.userLogs': 'سجلات المستخدمين',
    'sidebar.errorLogs': 'سجلات الأخطاء',
    'sidebar.settings': 'الإعدادات',
    'sidebar.addTopics': 'إضافة مواضيع',
    
    // Common
    'common.search': 'بحث',
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.add': 'إضافة',
    'common.export': 'تصدير',
    'common.close': 'إغلاق',
    'common.yes': 'نعم',
    'common.no': 'لا',
    'common.submit': 'إرسال',
    'common.create': 'إنشاء',
    'common.update': 'تحديث',
    'common.actions': 'الإجراءات',
    'common.status': 'الحالة',
    'common.date': 'التاريخ',
    'common.title': 'العنوان',
    'common.message': 'الرسالة',
    'common.name': 'الاسم',
    'common.email': 'البريد الإلكتروني',
    'common.phone': 'الهاتف',
    'common.location': 'الموقع',
    'common.active': 'نشط',
    'common.inactive': 'غير نشط',
    'common.pending': 'قيد الانتظار',
    'common.published': 'منشور',
    'common.sent': 'مرسل',
    'common.failed': 'فشل',
    'common.description': 'الوصف',
    
    // Videos Page
    'videos.title': 'مكتبة الفيديوهات',
    'videos.searchPlaceholder': 'البحث في الفيديوهات والمنشئين والمواقع...',
    'videos.filterByStatus': 'تصفية حسب الحالة',
    'videos.allVideos': 'جميع الفيديوهات',
    'videos.pendingVideos': 'قيد الانتظار',
    'videos.publishedVideos': 'منشور',
    'videos.noVideosFound': 'لم يتم العثور على فيديوهات',
    'videos.tryAdjusting': 'حاول تعديل معايير البحث',
    'videos.noVideosAvailable': 'لا توجد فيديوهات متاحة',
    'videos.available': 'متاحة',
    'videos.totalVideos': 'إجمالي الفيديوهات',
    'videos.results': 'نتائج',
    'videos.allVideoContent': 'جميع محتويات الفيديو',
    'videos.awaitingReview': 'في انتظار المراجعة',
    'videos.liveAndPublic': 'مباشر وعام',
    'videos.uploadedBy': 'رفع بواسطة',
    'videos.duration': 'المدة',
    'videos.fileSize': 'حجم الملف',
    'videos.views': 'المشاهدات',
    'videos.videoDetails': 'تفاصيل الفيديو',
    'videos.uploadInformation': 'معلومات الرفع',
    'videos.technicalDetails': 'التفاصيل التقنية',
    'videos.statistics': 'الإحصائيات',
    'videos.uploadDate': 'تاريخ الرفع',
    'videos.format': 'التنسيق',
    'videos.resolution': 'الدقة',
    'videos.lastModified': 'آخر تعديل',
    'videos.loadingMore': 'جاري تحميل المزيد من الفيديوهات...',
    'videos.allVideosViewed': 'لقد شاهدت جميع الفيديوهات {count}',
    'videos.finalSave': 'الحفظ النهائي',
    'videos.finalSaveConfirmation': 'هل تريد الحفظ النهائي للفيديو؟ سيتم نشره مباشرة.',
    'videos.yesPublish': 'نعم، انشر',
    'videos.returnToPending': 'إرجاع إلى قيد الانتظار',
    'videos.returnToPendingConfirmation': 'هل أنت متأكد من إرجاع هذا الفيديو إلى حالة قيد الانتظار؟',
    'videos.yesReturnToPending': 'نعم، أرجع إلى قيد الانتظار',
    
    // Users Page
    'users.title': 'مستخدمو MySAFF',
    'users.totalUsers': 'إجمالي المستخدمين',
    'users.searchPlaceholder': 'البحث في المستخدمين بالاسم أو البريد الإلكتروني أو المعرف...',
    'users.noUsersFound': 'لم يتم العثور على مستخدمين',
    'users.showingUsers': 'عرض {count} من {total} مستخدم',
    'users.employeeId': 'معرف الموظف',
    'users.firstName': 'الاسم الأول',
    'users.lastName': 'اسم العائلة',
    'users.phoneNumber': 'رقم الهاتف',
    'users.uploadPersonalImage': 'رفع صورة شخصية',
    'users.changePassword': 'تغيير كلمة المرور',
    'users.permissions': 'الصلاحيات',
    'users.access': 'الوصول',
    'users.videoManagement': 'إدارة الفيديوهات',
    'users.settingsConfiguration': 'الإعدادات والتكوين',
    'users.communicationUserManagement': 'التواصل وإدارة المستخدمين',
    'users.accountStatus': 'حالة الحساب',
    'users.videoPendingPermission': 'صلاحية الفيديوهات المعلقة',
    'users.videoUnderReviewPermission': 'صلاحية الفيديوهات قيد المراجعة',
    'users.videoAcceptedPermission': 'صلاحية الفيديوهات المقبولة',
    'users.uploadVideoPermission': 'صلاحية رفع الفيديوهات',
    'users.addConsiderationsPermission': 'صلاحية إضافة الاعتبارات',
    'users.addTopicPermission': 'صلاحية إضافة المواضيع',
    'users.addNotification': 'إضافة إشعار',
    'users.viewExternalUsers': 'عرض المستخدمين الخارجيين',
    'users.responsibleForAddingUsers': 'مسؤول عن إضافة المستخدمين',
    'users.accountIsActive': 'الحساب نشط',
    'users.profile': 'الملف الشخصي',
    'users.editUser': 'تعديل المستخدم',
    'users.deleteUser': 'حذف المستخدم',
    'users.deleteConfirmation': 'هل أنت متأكد من حذف {name}؟ لا يمكن التراجع عن هذا الإجراء.',
    'users.deleteWarning': 'تحذير',
    'users.deleteWarningText': 'حذف هذا المستخدم سيؤدي إلى إزالة جميع بياناته نهائياً، بما في ذلك:',
    'users.userProfileInfo': 'معلومات الملف الشخصي والحساب',
    'users.videoAnalysisHistory': 'تاريخ تحليل الفيديوهات ({count} فيديو)',
    'users.associatedPermissions': 'جميع الصلاحيات والإعدادات المرتبطة',
    
    // External Users Page
    'externalUsers.title': 'المستخدمون الخارجيون',
    'externalUsers.totalExternalUsers': 'إجمالي المستخدمين الخارجيين',
    'externalUsers.searchPlaceholder': 'البحث في المستخدمين الخارجيين بالاسم أو البريد الإلكتروني أو المعرف...',
    'externalUsers.noExternalUsersFound': 'لم يتم العثور على مستخدمين خارجيين',
    'externalUsers.exportUsers': 'تصدير المستخدمين',
    'externalUsers.externalUserId': 'معرف المستخدم الخارجي',
    'externalUsers.contactInformation': 'معلومات الاتصال',
    'externalUsers.activityInformation': 'معلومات النشاط',
    'externalUsers.accessPermissions': 'صلاحيات الوصول',
    'externalUsers.videosAnalyzed': 'الفيديوهات المحللة',
    'externalUsers.joinDate': 'تاريخ الانضمام',
    'externalUsers.lastActive': 'آخر نشاط',
    'externalUsers.department': 'القسم',
    'externalUsers.externalUserProfile': 'ملف المستخدم الخارجي',
    
    // Notifications Page
    'notifications.title': 'إضافة إشعار',
    'notifications.addNotification': 'إضافة إشعار',
    'notifications.searchPlaceholder': 'البحث في الإشعارات بالعنوان أو الرسالة...',
    'notifications.totalSent': 'إجمالي المرسل',
    'notifications.totalRecipients': 'إجمالي المستلمين',
    'notifications.assignedTo': 'مخصص لـ',
    'notifications.allUsersExternal': 'جميع المستخدمين الخارجيين',
    'notifications.selectUsersExternal': 'اختيار المستخدمين الخارجيين',
    'notifications.selectUsersPlaceholder': 'أدخل معرفات المستخدمين أو البريد الإلكتروني مفصولة بفواصل...',
    'notifications.allUsersExternalNote': 'هذا الحقل معطل لأن "جميع المستخدمين الخارجيين" محدد',
    'notifications.sendNotification': 'إرسال الإشعار',
    'notifications.noNotificationsFound': 'لم يتم العثور على إشعارات',
    'notifications.tryAdjustingCriteria': 'حاول تعديل معايير البحث',
    'notifications.clearSearch': 'مسح البحث',
    'notifications.selectExternalUsers': 'اختيار المستخدمين الخارجيين...',
    'notifications.allExternalUsersSelected': 'تم اختيار جميع المستخدمين الخارجيين',
    'notifications.searchUsers': 'البحث في المستخدمين...',
    'notifications.noUsersFound': 'لم يتم العثور على مستخدمين',
    
    // Add Topic Page
    'addTopic.title': 'إضافة موضوع',
    'addTopic.subtitle': 'إدارة مواضيع تدريب الحكام والمواضيع الفرعية',
    'addTopic.addNewTopic': 'إضافة موضوع جديد',
    'addTopic.createTopic': 'إنشاء موضوع',
    'addTopic.editTopic': 'تعديل الموضوع',
    'addTopic.topicDetails': 'تفاصيل الموضوع',
    'addTopic.topicImage': 'صورة الموضوع',
    'addTopic.dragAndDrop': 'اسحب وأفلت ملفاً هنا أو انقر',
    'addTopic.browseToChoose': 'تصفح لاختيار ملف',
    'addTopic.arabicName': 'الاسم',
    'addTopic.subtopics': 'المواضيع الفرعية',
    'addTopic.considerations': 'الاعتبارات',
    'addTopic.noSubtopicsAdded': 'لم يتم إضافة مواضيع فرعية',
    'addTopic.addMoreSubtopics': 'إضافة المزيد',
    'addTopic.updateTopic': 'تحديث الموضوع',
    'addTopic.noTopicsFound': 'لم يتم العثور على مواضيع',
    'addTopic.getStartedMessage': 'ابدأ بإنشاء موضوعك الأول',
    'addTopic.createFirstTopic': 'إنشاء الموضوع الأول',
    'addTopic.searchTopics': 'البحث في المواضيع...',
    'addTopic.topicsCount': '{count} من {total} موضوع',
    'addTopic.noImage': 'لا توجد صورة',
    'addTopic.currentImage': 'الصورة الحالية',
    'addTopic.enterConsiderations': 'أدخل اعتبارات مفصلة لهذا الموضوع...',
    
    // Upload Video Modal
    'uploadVideo.title': 'رفع فيديو',
    'uploadVideo.dragAndDrop': 'اسحب وأفلت ملف الفيديو هنا، أو',
    'uploadVideo.browseToChoose': 'تصفح لاختيار ملف',
    'uploadVideo.supportedFormats': 'التنسيقات المدعومة: MP4, AVI, MOV, WMV (الحد الأقصى: 500 ميجابايت)',
    'uploadVideo.uploading': 'جاري الرفع...',
    'uploadVideo.uploadCompleted': 'تم الرفع بنجاح!',
    'uploadVideo.uploadVideo': 'رفع الفيديو',
    'uploadVideo.uploadComplete': 'اكتمل الرفع',
    'uploadVideo.uploadGuidelines': 'إرشادات الرفع',
    'uploadVideo.guidelineQuality': 'تأكد من وضوح جودة الفيديو للتحليل الدقيق',
    'uploadVideo.guidelineFilename': 'قم بتضمين معلومات المباراة ذات الصلة في اسم الملف',
    'uploadVideo.guidelineProcessing': 'ستتم معالجة الفيديوهات تلقائياً بعد الرفع',
    'uploadVideo.guidelineNotification': 'ستتلقى إشعاراً عند اكتمال المعالجة',
    'uploadVideo.videoPreview': 'معاينة الفيديو',
    
    // Language Selector
    'language.english': 'English',
    'language.arabic': 'العربية',
    'language.selectLanguage': 'اختيار اللغة',
  }
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en',
      isRTL: false,
      
      setLanguage: (language: Language) => {
        console.log('LanguageStore: setLanguage called with:', language);
        
        const isRTL = language === 'ar';
        
        // Update state
        set({ 
          currentLanguage: language,
          isRTL: isRTL
        });
        
        console.log('LanguageStore: State updated - currentLanguage:', language, 'isRTL:', isRTL);
        
        // Force immediate DOM update
        try {
          document.documentElement.lang = language;
          document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
          
          // Toggle RTL class on body
          if (isRTL) {
            document.body.classList.add('rtl');
          } else {
            document.body.classList.remove('rtl');
          }
          
          console.log('LanguageStore: DOM updated - html dir:', document.documentElement.dir, 'body classes:', document.body.className);
        } catch (error) {
          console.error('LanguageStore: Error updating DOM:', error);
        }
      },
      
      t: (key: string, params?: Record<string, any>) => {
        const { currentLanguage } = get();
        const translationKey = key as keyof typeof translations['en'];
        let text = translations[currentLanguage][translationKey] || key;
        
        // Replace parameters if provided
        if (params) {
          Object.entries(params).forEach(([param, value]) => {
            text = text.replace(new RegExp(`{${param}}`, 'g'), String(value));
          });
        }
        
        return text;
      },
    }),
    {
      name: 'language-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log('LanguageStore: Rehydrating language state:', state.currentLanguage);
          
          const isRTL = state.currentLanguage === 'ar';
          
          // Update the isRTL state during rehydration
          state.isRTL = isRTL;
          
          // Apply DOM changes immediately after rehydration
          setTimeout(() => {
            try {
              document.documentElement.lang = state.currentLanguage;
              document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
              
              if (isRTL) {
                document.body.classList.add('rtl');
              } else {
                document.body.classList.remove('rtl');
              }
              
              console.log('LanguageStore: DOM updated after rehydration - dir:', document.documentElement.dir);
            } catch (error) {
              console.error('LanguageStore: Error updating DOM after rehydration:', error);
            }
          }, 0);
          
          console.log('LanguageStore: Language rehydrated:', state.currentLanguage, 'RTL:', isRTL);
        }
      },
    }
  )
);