import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../constants/paths';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleGoHome = () => {
    navigate(PATHS.DASHBOARD);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl w-full text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="relative mx-auto w-64 h-64 mb-8">
            {/* Large 404 Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-gray-200 select-none">404</span>
            </div>
            
            {/* Floating Icons */}
            <div className="absolute top-4 left-8 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center animate-bounce">
              <FileQuestion className="w-6 h-6 text-teal-600" />
            </div>
            <div className="absolute top-12 right-12 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <div className="absolute bottom-16 left-16 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
              <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
            </div>
            <div className="absolute bottom-8 right-8 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1.5s' }}>
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              {isRTL 
                ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
                : "Sorry, the page you're looking for doesn't exist or has been moved."
              }
            </p>
            <p className="text-gray-500">
              {isRTL 
                ? 'يمكنك العودة إلى الصفحة الرئيسية أو استخدام شريط البحث للعثور على ما تبحث عنه.'
                : 'You can go back to the homepage or use the search to find what you\'re looking for.'
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleGoHome}
              className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home className="w-5 h-5" />
              <span>{isRTL ? 'الصفحة الرئيسية' : 'Go to Homepage'}</span>
            </Button>
            
            <Button
              variant="secondary"
              onClick={handleGoBack}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              <span>{isRTL ? 'العودة' : 'Go Back'}</span>
            </Button>
          </div>

          {/* Help Section */}
          <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {isRTL ? 'هل تحتاج مساعدة؟' : 'Need Help?'}
            </h3>
            <p className="text-gray-600 mb-4">
              {isRTL 
                ? 'إذا كنت تعتقد أن هذا خطأ، يرجى الاتصال بفريق الدعم.'
                : 'If you think this is an error, please contact our support team.'
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="mailto:support@referee.com" 
                className="text-teal-600 hover:text-teal-800 font-medium transition-colors"
              >
                {isRTL ? 'الدعم الفني' : 'Technical Support'}
              </a>
              <span className="text-gray-300">|</span>
              <a 
                href="/help" 
                className="text-teal-600 hover:text-teal-800 font-medium transition-colors"
              >
                {isRTL ? 'مركز المساعدة' : 'Help Center'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;