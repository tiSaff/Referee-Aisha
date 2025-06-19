import React from 'react';
import {
  Upload,
  Users,
  Video,
  Settings,
  Bell,
  ExternalLink,
  Menu,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Plus,
  BarChart3,
  FileText,
} from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { useSidebarStore } from '../store/sidebarStore';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onShowUploadModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  currentPage,
  onNavigate,
  onShowUploadModal,
}) => {
  const { 
    settingsExpanded, 
    logsExpanded,
    setSettingsExpanded, 
    setLogsExpanded 
  } = useSidebarStore();
  
  // Use selector syntax for better performance
  const currentLanguage = useLanguageStore(state => state.currentLanguage);
  const t = useLanguageStore(state => state.t);
  const isRTL = currentLanguage === 'ar';

  const menuItems = [
    { icon: BarChart3, label: t('sidebar.dashboard'), page: 'dashboard', active: currentPage === 'dashboard' },
    { icon: Video, label: t('sidebar.videosLibrary'), page: 'videos', active: currentPage === 'videos' },
    { icon: Users, label: t('sidebar.mysaffUsers'), page: 'users', active: currentPage === 'users' },
    { icon: ExternalLink, label: t('sidebar.externalUsers'), page: 'external', active: currentPage === 'external' },
    { icon: Bell, label: t('sidebar.notificationsCenter'), page: 'notifications', active: currentPage === 'notifications' },
    {
      icon: FileText,
      label: t('sidebar.logs'),
      page: 'logs',
      active: currentPage === 'logs' || currentPage === 'system-logs' || currentPage === 'user-logs' || currentPage === 'error-logs',
      hasSubmenu: true,
      submenu: [
        { label: t('sidebar.systemLogs'), page: 'system-logs', active: currentPage === 'system-logs' },
        { label: t('sidebar.userLogs'), page: 'user-logs', active: currentPage === 'user-logs' },
        { label: t('sidebar.errorLogs'), page: 'error-logs', active: currentPage === 'error-logs' },
      ],
    },
    {
      icon: Settings,
      label: t('sidebar.settings'),
      page: 'settings',
      active: currentPage === 'settings' || currentPage === 'add-topic',
      hasSubmenu: true,
      submenu: [
        { label: t('sidebar.addTopics'), page: 'add-topic', active: currentPage === 'add-topic' },
      ],
    },
  ];

  const handleLogsClick = () => setLogsExpanded(!logsExpanded);
  const handleSettingsClick = () => setSettingsExpanded(!settingsExpanded);

  const handleSubmenuClick = (page: string, parentPage: string) => {
    onNavigate(page);
    // Expand the parent menu when navigating to a submenu item
    if (parentPage === 'logs') {
      setLogsExpanded(true);
    } else if (parentPage === 'settings') {
      setSettingsExpanded(true);
    }
  };

  const getSubmenuExpanded = (page: string) => {
    switch (page) {
      case 'logs':
        return logsExpanded;
      case 'settings':
        return settingsExpanded;
      default:
        return false;
    }
  };

  const getSubmenuClickHandler = (page: string) => {
    switch (page) {
      case 'logs':
        return handleLogsClick;
      case 'settings':
        return handleSettingsClick;
      default:
        return () => {};
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          bg-white border-gray-200 z-50 flex flex-col shadow-lg w-64 sm:w-72 max-w-full
          ${isRTL ? 'border-l' : 'border-r'}
          ${isOpen ? (
            isRTL ? 
            'fixed top-0 right-0 h-screen transition-transform duration-300 ease-in-out translate-x-0 lg:relative lg:h-auto' :
            'fixed top-0 left-0 h-screen transition-transform duration-300 ease-in-out translate-x-0 lg:relative lg:h-auto'
          ) : (
            isRTL ? 
            'fixed top-0 right-0 h-screen transition-transform duration-300 ease-in-out translate-x-full lg:relative lg:h-auto lg:translate-x-0' :
            'fixed top-0 left-0 h-screen transition-transform duration-300 ease-in-out -translate-x-full lg:relative lg:h-auto lg:translate-x-0'
          )}
          lg:block lg:h-screen
        `}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Back to MySAFF Button */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <button
            className="flex items-center space-x-2 sm:space-x-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-white rounded-md transition-colors duration-200 font-medium hover:opacity-90 text-sm sm:text-base"
            style={{ backgroundColor: '#2a835f' }}
          >
            <ArrowLeft className={`w-4 sm:w-5 h-4 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} />
            <span>{t('sidebar.backToMySAFF')}</span>
          </button>
        </div>

        {/* Upload Video Button */}
        <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-2">
          <button
            onClick={onShowUploadModal}
            className="flex items-center justify-center space-x-2 sm:space-x-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-white rounded-md transition-all duration-200 font-medium hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
            style={{ backgroundColor: '#2a835f' }}
          >
            <Upload className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>{t('sidebar.uploadVideo')}</span>
            <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 sm:py-6 overflow-y-auto">
          <ul className="space-y-1 sm:space-y-2 px-3 sm:px-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.hasSubmenu ? (
                  <>
                    <button
                      onClick={getSubmenuClickHandler(item.page)}
                      className={`
                        w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200 rounded-lg group text-sm sm:text-base
                        ${item.active 
                          ? 'bg-gray-100 text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                        }
                      `}
                      style={item.active ? { [`border${isRTL ? 'Right' : 'Left'}`]: '4px solid #2a835f' } : {}}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <item.icon 
                          className={`w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 transition-colors duration-200 ${
                            item.active ? 'text-gray-700' : 'text-gray-500 group-hover:text-gray-700'
                          }`}
                          style={item.active ? { color: '#2a835f' } : {}}
                        />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {getSubmenuExpanded(item.page) ? (
                        <ChevronDown className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className={`w-3 sm:w-4 h-3 sm:h-4 text-gray-400 ${isRTL ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {getSubmenuExpanded(item.page) && item.submenu && (
                      <ul className={`mt-1 sm:mt-2 ${isRTL ? 'mr-4 sm:mr-6' : 'ml-4 sm:ml-6'} space-y-1`}>
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <button
                              onClick={() => handleSubmenuClick(subItem.page, item.page)}
                              className={`
                                w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 rounded-lg text-xs sm:text-sm
                                ${subItem.active 
                                  ? 'bg-gray-100 text-gray-900 shadow-sm' 
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                              `}
                              style={subItem.active ? { [`border${isRTL ? 'Right' : 'Left'}`]: '3px solid #2a835f' } : {}}
                            >
                              <span>- {subItem.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => onNavigate(item.page)}
                    className={`
                      w-full flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200 rounded-lg group text-sm sm:text-base
                      ${item.active 
                        ? 'bg-gray-100 text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                      }
                    `}
                    style={item.active ? { [`border${isRTL ? 'Right' : 'Left'}`]: '4px solid #2a835f' } : {}}
                  >
                    <item.icon 
                      className={`w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 transition-colors duration-200 ${
                        item.active ? 'text-gray-700' : 'text-gray-500 group-hover:text-gray-700'
                      }`}
                      style={item.active ? { color: '#2a835f' } : {}}
                    />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile close button */}
        <button
          onClick={onToggle}
          className={`lg:hidden absolute top-4 sm:top-6 ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} p-2 text-gray-400 hover:text-gray-600 rounded transition-colors`}
        >
          <Menu className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;