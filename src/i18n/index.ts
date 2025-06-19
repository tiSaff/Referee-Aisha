import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      FIT_platform: "Sports Referee Video Analysis Platform",
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
    }
  },
  ar: {
    translation: {
      FIT_platform: "منصة تحليل فيديو حكام الرياضة",
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
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;