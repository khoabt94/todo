import { Timeline } from "@/enums";

const paths = {
  home: () => '/',
  login: () => '/login',
  signup: () => '/signup',
  forgotPassword: () => '/forgot-password',
  resetPassword: () => '/reset-password/:resetTokenId',
  notifications: () => '/notifications',
  accountInfo: () => '/account/info',
  accountPassword: () => '/account/password',
  project: (projectId: string) => `/project/${projectId}`,
  projectTemplate: () => '/project/:projectId',
  timelineTemplate: () => '/timeline/:timelineSlug',
  timeline: (type: Timeline) => `timeline/${type}`,
  notFound: () => '/404',
};

export const siteConfig = {
  paths,
}