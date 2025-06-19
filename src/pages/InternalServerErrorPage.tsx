import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, RefreshCw, AlertTriangle, Mail, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../constants/paths';
import Button from '../components/common/Button';

const InternalServerErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleGoHome = () => {
    navigate(PATHS.DASHBOARD);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReportIssue = () => {
    const subject = encodeURIComponent('Internal Server Error Report');
    const body = encodeURIComponent(`
Error Details:
- URL: ${window.location.href}
- Time: ${new Date().toISOString()}
- User Agent: ${navigator.userAgent}

Please describe what you were doing when this error occurred:
[Your description here]
    `);
    window.open(`mailto:support@referee.com?subject=${subject}&body=${body}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl w-full text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="relative mx-auto w-64 h-64 mb-8">
            {/* Large 500 Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-red-200 select-none">500</span>
            </div>
            
            {/* Warning Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
            </div>
            
            {/* Floating Error Indicators */}
            <div className="absolute top-8 left-12 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
            <div className="absolute top-16 right-16 w-3 h-3 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-12 left-8 w-2 h-2 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 right-12 w-3 h-3 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {isRTL ? 'خطأ في الخادم' : 'Server Error'}
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              {isRTL 
                ? 'عذراً، حدث خطأ غير متوقع في الخادم.'
                : "Sorry, something went wrong on our end."
              }
            </p>
            <p className="text-gray-500">
              {isRTL 
                ? 'نحن نعمل على حل هذه المشكلة. يرجى المحاولة مرة أخرى لاحقاً.'
                : 'We\'re working to fix this issue. Please try again later.'
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleRefresh}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <RefreshCw className="w-5 h-5" />
              <span>{isRTL ? 'إعادة المحاولة' : 'Try Again'}</span>
            </Button>
            
            <Button
              onClick={handleGoHome}
              variant="secondary"
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home className="w-5 h-5" />
              <span>{isRTL ? 'الصفحة الرئيسية' : 'Go to Homepage'}</span>
            </Button>

            <Button
              variant="ghost"
              onClick={handleGoBack}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              <span>{isRTL ? 'العودة' : 'Go Back'}</span>
            </Button>
          </div>

          {/* Error Details & Support */}
          <div className="mt-12 space-y-6">
            {/* Error ID */}
            <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">
                {isRTL ? 'معرف الخطأ:' : 'Error ID:'}
              </p>
              <code className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                ERR-{Date.now().toString(36).toUpperCase()}
              </code>
            </div>

            {/* Support Section */}
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {isRTL ? 'تحتاج مساعدة؟' : 'Need Assistance?'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isRTL 
                  ? 'إذا استمرت هذه المشكلة، يرجى الاتصال بفريق الدعم الفني.'
                  : 'If this problem persists, please contact our technical support team.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleReportIssue}
                  variant="secondary"
                  className="flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isRTL ? 'إبلاغ عن المشكلة' : 'Report Issue'}</span>
                </Button>
                <a 
                  href="mailto:support@referee.com" 
                  className="text-red-600 hover:text-red-800 font-medium transition-colors py-2"
                >
                  support@referee.com
                </a>
              </div>
            </div>

            {/* Status Information */}
            <div className="text-sm text-gray-500">
              <p>
                {isRTL 
                  ? 'الوقت: ' + new Date().toLocaleString('ar-SA')
                  : 'Time: ' + new Date().toLocaleString('en-US')
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalServerErrorPage;