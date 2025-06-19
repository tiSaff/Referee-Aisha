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
  ClipboardList,
  Trophy,
  Lock,
  Shield,
  History,
  LayoutDashboard,
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
    accessControlExpanded,
    setSettingsExpanded, 
    setLogsExpanded,
    setAccessControlExpanded
  } = useSidebarStore();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Today Board', path: PATHS.DASHBOARD },
    { icon: ClipboardList, label: 'Stadium Data', path: PATHS.VIDEOS },
    { icon: Trophy, label: 'Match Assignments', path: PATHS.USERS },
    {
      icon: Settings,
      label: 'Settings',
      path: PATHS.ADD_TOPIC,
      hasSubmenu: true,
      submenu: [
        { label: 'VAR Installation Type', path: PATHS.SETTINGS_VAR },
        { label: 'Items Types', path: PATHS.SETTINGS_ITEMS },
        { label: 'Tracking Cameras Platforms', path: PATHS.SETTINGS_TRACKING_CAMERAS },
      ],
    },
    {
      icon: Lock,
      label: 'Access Control',
      path: PATHS.ACCESS_CONTROL,
      hasSubmenu: true,
      submenu: [
        { label: 'Users', path: PATHS.SETTINGS_USERS },
        { label: 'SAFF Users', path: PATHS.SETTINGS_SAFFUSERS },
        { label: 'Roles', path: PATHS.SETTINGS_ROLES },
      ],
    },
    {
      icon: History,
      label: 'Logs',
      path: PATHS.SYSTEM_LOGS,
      hasSubmenu: true,
      submenu: [
        { label: 'VAR Logs', path: PATHS.LOGS_VAR },
        { label: 'Item Logs', path: PATHS.LOGS_ITEMS },
        { label: 'Camera Logs', path: PATHS.LOGS_TRACKING_CAMERAS },
        { label: 'Note Logs', path: PATHS.LOGS_NOTE },
        { label: 'Assign Logs', path: PATHS.Stadium_LOGS_ASSIGN },
        { label: 'Match Logs', path: PATHS.LOGS_MATCH },
        { label: 'Match Assign Logs', path: PATHS.MATCH_LOGS_ASSIGN },
        { label: 'Match Form Logs', path: PATHS.LOGS_MATCH_FORM },
        { label: 'Users Logs', path: PATHS.LOGS_USERS },
        { label: 'Roles Logs', path: PATHS.LOGS_ROLES },
        { label: 'Login Logs', path: PATHS.LOGS_LOGIN },
      ],
    },
  ];

  const handleLogsClick = () => setLogsExpanded(!logsExpanded);
  const handleSettingsClick = () => setSettingsExpanded(!settingsExpanded);
  const handleAccessControlClick = () => setAccessControlExpanded(!accessControlExpanded);

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
    } else if (parentPath === PATHS.ACCESS_CONTROL) {
      setAccessControlExpanded(true);
    }
  };

  const getSubmenuExpanded = (path: string) => {
    switch (path) {
      case PATHS.SYSTEM_LOGS:
        return logsExpanded;
      case PATHS.ADD_TOPIC:
        return settingsExpanded;
      case PATHS.ACCESS_CONTROL:
        return accessControlExpanded;
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
      case PATHS.ACCESS_CONTROL:
        return handleAccessControlClick;
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
                        w-full flex items-center px-6 py-3 text-gray-700 hover:bg-[#F0F6F6]
                        ${isParentActive(item) ? 'bg-[#E4EEEE] font-bold' : ''}
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="mx-4">{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 ml-auto transition-transform ${
                          getSubmenuExpanded(item.path) ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {/* Submenu */}
                    {getSubmenuExpanded(item.path) && item.submenu && (
                      <div className="bg-gray-50">
                        {item.submenu.map((subItem, subIndex) => (
                          <button
                            key={subIndex}
                            onClick={() => handleSubmenuClick(subItem.path, item.path)}
                            className={`
                              w-full flex items-center px-6 py-3 text-gray-700 hover:bg-[#F0F6F6]
                              ${isActive(subItem.path) ? 'bg-[#E4EEEE]' : ''}
                            `}
                          >
                            <span className="mx-4">{subItem.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center px-6 py-3 text-gray-700 hover:bg-[#F0F6F6]
                      ${isActive(item.path) ? 'bg-[#E4EEEE] font-bold' : ''}
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="mx-4">{item.label}</span>
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