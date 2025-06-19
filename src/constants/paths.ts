export const PATHS = {
  HOME: "/home",
  DASHBOARD: "/dashboard",
  VIDEOS: "/videos",
  USERS: "/users",
  EXTERNAL_USERS: "/external-users",
  NOTIFICATIONS: "/notifications",
  ADD_TOPIC: "/add-topic",
  SYSTEM_LOGS: "/system-logs",
  USER_LOGS: "/user-logs",
  ERROR_LOGS: "/error-logs",
  LOGIN: "/login",
  LOGINMY: "/loginmy",
  
  // New paths for the sidebar
  SETTINGS: "/settings",
  SETTINGS_VAR: "/settings/var",
  SETTINGS_ITEMS: "/settings/items",
  SETTINGS_TRACKING_CAMERAS: "/settings/tracking-cameras",
  ACCESS_CONTROL: "/access-control",
  SETTINGS_USERS: "/access-control/users",
  SETTINGS_SAFFUSERS: "/access-control/saff-users",
  SETTINGS_ROLES: "/access-control/roles",
  LOGS: "/logs",
  LOGS_VAR: "/logs/var",
  LOGS_ITEMS: "/logs/items",
  LOGS_TRACKING_CAMERAS: "/logs/tracking-cameras",
  LOGS_NOTE: "/logs/note",
  Stadium_LOGS_ASSIGN: "/logs/stadium-assign",
  LOGS_MATCH: "/logs/match",
  MATCH_LOGS_ASSIGN: "/logs/match-assign",
  LOGS_MATCH_FORM: "/logs/match-form",
  LOGS_USERS: "/logs/users",
  LOGS_ROLES: "/logs/roles",
  LOGS_LOGIN: "/logs/login",
} as const;

export type PathKeys = keyof typeof PATHS;
export type PathValues = typeof PATHS[PathKeys];