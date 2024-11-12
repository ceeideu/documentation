import { defineConfig } from 'vitepress';
import { getLatestVersion, getVersionsSidebars, getVersionEntrypoint, getVersionSwitchMenu } from './version-switcher/index.mts';
import { fileURLToPath, URL } from 'node:url';
import markdownItReplaceLink from 'markdown-it-replace-link';
import { WPJSLibScripts } from './wpjslib';

const latestVersion = getLatestVersion();
const latestVersionEntrypoint = getVersionEntrypoint(latestVersion);

const homePageUrl = 'https://ceeid.eu';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'CEEId',
  base: '/documentation/',
  rewrites: {
    'docs/:page+': ':page+',
  },
  head: [
    ...WPJSLibScripts(),
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    homePageUrl: homePageUrl,
    nav: [
      // { text: 'Home', link: latestVersionEntrypoint },
      { text: 'Docs', link: latestVersionEntrypoint },
      { text: 'API', link: `${homePageUrl}/swagger` },
    ],

    versionSwitcher: {
      latestVersion: latestVersion,
      versions: getVersionSwitchMenu(),
    },

    sidebar: getVersionsSidebars(),

    search: {
      provider: 'local',
    },

    lastUpdated: true,

    logo: '/logo.svg',
    logoLink: homePageUrl,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ceeideu' },
    ],
  },
  ignoreDeadLinks: [
    'http://localhost:5173',
  ],
  markdown: {
    config: (md) => {
      md.use(markdownItReplaceLink);
    },
    replaceLink: (link) => {
      if (link.match(/^\/?latest\/?$/)) return latestVersionEntrypoint;
      if (link.match(/^\/?latest\//)) return link.replace('/latest/', `/${latestVersion}/`);
      return link;
    },
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBarMenu\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/overridden/OverriddenVPNavBarMenu.vue', import.meta.url)
          ),
        },
        {
          find: /^.*\/VPNavBarTitle\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/overridden/OverriddenVPNavBarTitle.vue', import.meta.url)
          ),
        },
      ],
    },
  },
});
