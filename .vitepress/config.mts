import { defineConfig } from 'vitepress';
import { getLatestVersion, getVersionsSidebars, getVersionEntrypoint, getVersionSwitchMenu } from './version-switcher/index.mts';
import { fileURLToPath, URL } from 'node:url';
import markdownItReplaceLink from 'markdown-it-replace-link';

const latestVersion = getLatestVersion();
const latestVersionEntrypoint = getVersionEntrypoint(latestVersion);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Polski Identyfikator Reklamowy (PIR)',
  rewrites: {
    'docs/:page+': ':page+',
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: latestVersionEntrypoint },
      { text: 'API', link: 'https://pir.wp.pl/playground/swagger/index.html#/' },
    ],

    versionSwitcher: {
      currentVersion: latestVersion,
      versions: getVersionSwitchMenu(),
    },

    sidebar: getVersionsSidebars(),

    search: {
      provider: 'local',
    },

    lastUpdated: true,

    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pirwppl' },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(markdownItReplaceLink);
    },
    replaceLink: (link) => {
      if (link.match(/^\/?current\/?$/)) return latestVersionEntrypoint;
      if (link.match(/^\/?current\//)) return link.replace('/latest/', `/${latestVersion}/`);
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
      ],
    },
  },
});
