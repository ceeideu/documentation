import { defineConfig } from 'vitepress';
import { getCurrentVersion, getVersionsSidebars, getVersionEntrypoint, getVersionSwitchMenu } from './version-switcher/index.mts';
import { fileURLToPath, URL } from 'node:url';
import markdownItReplaceLink from 'markdown-it-replace-link';

const currentVersion = getCurrentVersion();
const currentVersionEntrypoint = getVersionEntrypoint(currentVersion);

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
      { text: 'Docs', link: currentVersionEntrypoint },
    ],

    versionSwitcher: {
      currentVersion: currentVersion,
      versions: getVersionSwitchMenu(),
    },

    sidebar: getVersionsSidebars(),

    search: {
      provider: 'local',
    },

    lastUpdated: true,

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  },
  markdown: {
    config: (md) => {
      md.use(markdownItReplaceLink);
    },
    replaceLink: (link) => {
      if (link.match(/^\/?current\/?$/)) return currentVersionEntrypoint;
      if (link.match(/^\/?current\//)) return link.replace('/current/', `/${currentVersion}/`);
      return link;
    },
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBarMenu\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/overridden-components/OverriddenVPNavBarMenu.vue', import.meta.url)
          ),
        },
      ],
    },
  },
});
