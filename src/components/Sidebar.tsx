import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  
  const { 
    settingsExpanded, 
    logsExpanded,
    setSettingsExpanded, 
    setLogsExpanded 
  } = useSidebarStore();

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: PATHS.DASHBOARD },
    { icon: Video, label: 'Videos Library', path: PATHS.VIDEOS },
    { icon: Users, label: 'MySAFF Users', path: PATHS.USERS },
    { icon: ExternalLink, label: 'External Users', path: PATHS.EXTERNAL_USERS },
    { icon: Bell, label: 'Notifications Center', path: PATHS.NOTIFICATIONS },
    {
      icon: FileText,
      label: 'Logs',
      path: PATHS.SYSTEM_LOGS,
      hasSubmenu: true,
      submenu: [
        { label: 'System Logs', path: PATHS.SYSTEM_LOGS },
        { label: 'User Logs', path: PATHS.USER_LOGS },
        { label: 'Error Logs', path: PATHS.ERROR_LOGS },
      ],
    },
    {
      icon: Settings,
      label: 'Settings',
      path: PATHS.ADD_TOPIC,
      hasSubmenu: true,
      submenu: [
        { label: 'Add Topics', path: PATHS.ADD_TOPIC },
      ],
    },
  ];

  const handleLogsClick = () => setLogsExpanded(!logsExpanded);
  const handleSettingsClick = () => setSettingsExpanded(!settingsExpanded);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSubmenuClick = (path: string, parentPath: string) => {
    navigate(path);
    // Expand the parent menu when navigating to a submenu item
    if (parentPath === PATHS.SYSTEM_LOGS) {
      setLogsExpanded(true);
    } else if (parentPath === PATHS.ADD_TOPIC) {
      setSettingsExpanded(true);
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
          bg-white border-gray-200 z-50 flex flex-col shadow-lg w-64 sm:w-72 max-w-full h-screen
          border-r
          ${isOpen ? (
            'fixed top-0 left-0 transition-transform duration-300 ease-in-out translate-x-0 lg:relative'
          ) : (
            'fixed top-0 left-0 transition-transform duration-300 ease-in-out -translate-x-full lg:relative lg:translate-x-0'
          )}
          lg:block
        `}
      >
        {/* Back to MySAFF Button */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <button
            className="flex items-center space-x-2 sm:space-x-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-white rounded-md transition-colors duration-200 font-medium hover:opacity-90 text-sm sm:text-base"
            style={{ backgroundColor: '#2a835f' }}
          >
            <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>Back to MySAFF</span>
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
            <span>Upload Video</span>
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
                      onClick={getSubmenuClickHandler(item.path)}
                      className={`
                        w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200 rounded-lg group text-sm sm:text-base
                        ${isParentActive(item)
                          ? 'bg-gray-100 text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                        }
                      `}
                      style={isParentActive(item) ? { borderLeft: '4px solid #2a835f' } : {}}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <item.icon 
                          className={`w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 transition-colors duration-200 ${
                            isParentActive(item) ? 'text-gray-700' : 'text-gray-500 group-hover:text-gray-700'
                          }`}
                          style={isParentActive(item) ? { color: '#2a835f' } : {}}
                        />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {getSubmenuExpanded(item.path) ? (
                        <ChevronDown className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {getSubmenuExpanded(item.path) && item.submenu && (
                      <ul className="mt-1 sm:mt-2 ml-4 sm:ml-6 space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <button
                              onClick={() => handleSubmenuClick(subItem.path, item.path)}
                              className={`
                                w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 rounded-lg text-xs sm:text-sm
                                ${isActive(subItem.path)
                                  ? 'bg-gray-100 text-gray-900 shadow-sm' 
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                              `}
                              style={isActive(subItem.path) ? { borderLeft: '3px solid #2a835f' } : {}}
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
                      w-full flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200 rounded-lg group text-sm sm:text-base
                      ${isActive(item.path)
                        ? 'bg-gray-100 text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                      }
                    `}
                    style={isActive(item.path) ? { borderLeft: '4px solid #2a835f' } : {}}
                  >
                    <item.icon 
                      className={`w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 transition-colors duration-200 ${
                        isActive(item.path) ? 'text-gray-700' : 'text-gray-500 group-hover:text-gray-700'
                      }`}
                      style={isActive(item.path) ? { color: '#2a835f' } : {}}
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
          className="lg:hidden absolute top-4 sm:top-6 right-4 sm:right-6 p-2 text-gray-400 hover:text-gray-600 rounded transition-colors"
        >
          <Menu className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;