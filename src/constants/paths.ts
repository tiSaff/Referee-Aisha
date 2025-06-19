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
  ROLES: "/roles",
} as const;

export type PathKeys = keyof typeof PATHS;
export type PathValues = typeof PATHS[PathKeys];