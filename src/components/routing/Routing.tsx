import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../../constants/paths';

// Import pages
import DashboardPage from '../../pages/DashboardPage';
import VideosPage from '../../pages/VideosPage';
import UsersPage from '../../pages/UsersPage';
import ExternalUsersPage from '../../pages/ExternalUsersPage';
import NotificationsPage from '../../pages/NotificationsPage';
import AddTopicPage from '../../pages/AddTopicPage';
import LogsPage from '../../pages/LogsPage';
import LoginSaff from '../../pages/LoginSaff';
import MainLayout from '../layout/MainLayout';

export default function Routing() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("FIT_platform");
  }, [t, i18n.language]);

  return (
    <Routes>
      {/* Login Route */}
      <Route path={PATHS.LOGINMY} element={<LoginSaff />} />
      <Route path={PATHS.LOGIN} element={<LoginSaff />} />
      
      {/* Main Application Routes with Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to={PATHS.DASHBOARD} replace />} />
        <Route path={PATHS.HOME} element={<Navigate to={PATHS.DASHBOARD} replace />} />
        <Route path={PATHS.DASHBOARD} element={<DashboardPage />} />
        <Route path={PATHS.VIDEOS} element={<VideosPage />} />
        <Route path={PATHS.USERS} element={<UsersPage />} />
        <Route path={PATHS.EXTERNAL_USERS} element={<ExternalUsersPage />} />
        <Route path={PATHS.NOTIFICATIONS} element={<NotificationsPage />} />
        <Route path={PATHS.ADD_TOPIC} element={<AddTopicPage />} />
        <Route path={PATHS.SYSTEM_LOGS} element={<LogsPage />} />
        <Route path={PATHS.USER_LOGS} element={<LogsPage />} />
        <Route path={PATHS.ERROR_LOGS} element={<LogsPage />} />
      </Route>
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to={PATHS.DASHBOARD} replace />} />
    </Routes>
  );
}