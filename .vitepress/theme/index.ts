// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    Object.defineProperties(app.config.globalProperties, {
      $config: {
        get() {
          return siteData.value.themeConfig;
        },
      },
      $currentVersion: {
        get() {
          const config = siteData.value.themeConfig;
          return config.versionSwitcher.currentVersion;
        },
      },
    });
  },
} satisfies Theme
