import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  LayoutDashboard,
  Users,
  Video,
  Settings,
  Bell,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Plus,
  BarChart3,
  FileText,
  UserCog,
  Upload,
} from 'lucide-react';
import { PATHS } from '../constants/paths';
import { useSidebarStore } from '../store/sidebarStore';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onShowUploadModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  onShowUploadModal,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const { 
    settingsExpanded, 
    logsExpanded,
    setSettingsExpanded, 
    setLogsExpanded 
  } = useSidebarStore();

  const menuItems = [
    { icon: LayoutDashboard, label: t('sidebar.dashboard'), path: PATHS.DASHBOARD },
    { icon: Video, label: t('sidebar.videosLibrary'), path: PATHS.VIDEOS },
    { icon: Users, label: t('sidebar.mysaffUsers'), path: PATHS.USERS },
    { icon: ExternalLink, label: t('sidebar.externalUsers'), path: PATHS.EXTERNAL_USERS },
    { icon: Bell, label: t('sidebar.notificationsCenter'), path: PATHS.NOTIFICATIONS },
    {
      icon: FileText,
      label: t('sidebar.logs'),
      path: PATHS.SYSTEM_LOGS,
      hasSubmenu: true,
      submenu: [
        { label: t('sidebar.systemLogs'), path: PATHS.SYSTEM_LOGS },
        { label: t('sidebar.userLogs'), path: PATHS.USER_LOGS },
        { label: t('sidebar.errorLogs'), path: PATHS.ERROR_LOGS },
      ],
    },
    {
      icon: Settings,
      label: t('sidebar.settings'),
      path: PATHS.ADD_TOPIC,
      hasSubmenu: true,
      submenu: [
        { label: t('sidebar.addTopics'), path: PATHS.ADD_TOPIC },
        { label: 'Roles', path: PATHS.ROLES },
      ],
    },
  ];

  const handleLogsClick = () => setLogsExpanded(!logsExpanded);
  const handleSettingsClick = () => setSettingsExpanded(!settingsExpanded);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  const handleSubmenuClick = (path: string, parentPath: string) => {
    navigate(path);
    // Expand the parent menu when navigating to a submenu item
    if (parentPath === PATHS.SYSTEM_LOGS) {
      setLogsExpanded(true);
    } else if (parentPath === PATHS.ADD_TOPIC) {
      setSettingsExpanded(true);
    }
    
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  const getSubmenuExpanded = (path: string) => {
    switch (path) {
      case PATHS.SYSTEM_LOGS:
        return logsExpanded;
      case PATHS.ADD_TOPIC:
        return settingsExpanded;
      default:
        return false;
    }
  };

  const getSubmenuClickHandler = (path: string) => {
    switch (path) {
      case PATHS.SYSTEM_LOGS:
        return handleLogsClick;
      case PATHS.ADD_TOPIC:
        return handleSettingsClick;
      default:
        return () => {};
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (item: any) => {
    if (item.hasSubmenu && item.submenu) {
      return item.submenu.some((subItem: any) => location.pathname === subItem.path);
    }
    return location.pathname === item.path;
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
          z-50 flex flex-col w-64 sm:w-72 max-w-full h-full
          ${isRTL ? 'border-l' : 'border-r'} border-gray-200
          ${isOpen ? (
            isRTL ? 
            'fixed top-0 right-0 transition-transform duration-300 ease-in-out translate-x-0 lg:relative' :
            'fixed top-0 left-0 transition-transform duration-300 ease-in-out translate-x-0 lg:relative'
          ) : (
            isRTL ? 
            'fixed top-0 right-0 transition-transform duration-300 ease-in-out translate-x-full lg:relative lg:translate-x-0' :
            'fixed top-0 left-0 transition-transform duration-300 ease-in-out -translate-x-full lg:relative lg:translate-x-0'
          )}
          lg:block bg-white
        `}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Upload Video Button */}
        <div className="p-3 sm:p-4">
          <button
            onClick={onShowUploadModal}
            className="flex items-center space-x-2 sm:space-x-3 w-full px-3 sm:px-4 py-2 text-white rounded-xl transition-colors duration-200 font-medium hover:opacity-90 text-sm"
            style={{ backgroundColor: '#2a835f' }}
          >
            <Upload className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            <span>{t('sidebar.uploadVideo')}</span>
          </button>
        </div>

        {/* Back to MySAFF Button */}
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          <button
            className="flex items-center space-x-2 sm:space-x-3 w-full px-3 sm:px-4 py-2 text-white rounded-xl transition-colors duration-200 font-medium hover:opacity-90 text-sm"
            style={{ backgroundColor: '#2a835f' }}
          >
            <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            <span>{t('sidebar.backToMySAFF')}</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-2 sm:py-3 overflow-y-auto">
          <ul className="space-y-0.5 px-3 sm:px-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.hasSubmenu ? (
                  <>
                    <button
                      onClick={getSubmenuClickHandler(item.path)}
                      className={`
                        w-full flex items-center justify-between px-3 sm:px-4 py-2 transition-all duration-200 rounded-xl group text-sm sm:text-base
                        ${isParentActive(item)
                          ? 'bg-gray-100 text-gray-900' 
                          : 'text-gray-600 hover:bg-green-100 hover:text-green-700'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <item.icon 
                          className={`w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 transition-colors duration-200 ${
                            isParentActive(item) ? 'text-gray-700' : 'text-gray-500 group-hover:text-green-700'
                          }`}
                        />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {getSubmenuExpanded(item.path) ? (
                        <ChevronDown className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className={`w-3 sm:w-4 h-3 sm:h-4 text-gray-400 ${isRTL ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {getSubmenuExpanded(item.path) && item.submenu && (
                      <ul className={`mt-0.5 ${isRTL ? 'mr-4 sm:mr-6' : 'ml-4 sm:ml-6'} space-y-0.5`}>
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <button
                              onClick={() => handleSubmenuClick(subItem.path, item.path)}
                              className={`
                                w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-1.5 transition-all duration-200 rounded-xl text-xs sm:text-sm
                                ${isActive(subItem.path)
                                  ? 'bg-gray-100 text-gray-900' 
                                  : 'text-gray-600 hover:bg-green-100 hover:text-green-700'
                                }
                              `}
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
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2 transition-all duration-200 rounded-xl group text-sm sm:text-base
                      ${isActive(item.path)
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-green-100 hover:text-green-700'
                      }
                    `}
                  >
                    <item.icon 
                      className={`w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 transition-colors duration-200 ${
                        isActive(item.path) ? 'text-gray-700' : 'text-gray-500 group-hover:text-green-700'
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;