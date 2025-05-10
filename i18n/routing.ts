import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'vi'],
  localePrefix: "as-needed",
  // Used when no locale matches
  defaultLocale: 'vi',
  pathnames: {
    "/dashboard": {
      en: "/dashboard",
      vi: "/bang-dieu-khien",
    },
    "/settings": {
      en: "/settings",
      vi: "/cai-dat",
    },
    "/projects/[projectId]": {
      en: "/projects/[projectId]",
      vi: "/du-an/[projectId]",
    },
    "/teams/[teamId]": {
      en: "/teams/[teamId]",
      vi: "/nhom/[teamId]",
    },
    "/inbox": {
      en: "/inbox",
      vi: "/hop-thu-den",
    },
    "/documents/[documentId]": {
      en: "/documents/[documentId]",
      vi: "/tai-lieu/[documentId]",
    },
    "/login": {
      en: "/login",
      vi: "/dang-nhap",
    }
  }
});