// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './styles/style.scss';
import Footer from './components/Footer.vue';
import { WPJSLibSPAHandlers } from '../wpjslib';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-bottom': () => h(Footer),
    })
  },
  enhanceApp({ app, router, siteData }) {
    // These properties will be available only in templates???
    Object.defineProperties(app.config.globalProperties, {
      $config: {
        get() {
          return siteData.value.themeConfig;
        },
      },
      $latestVersion: {
        get() {
          const config = siteData.value.themeConfig;
          return config.versionSwitcher.latestVersion;
        },
      },
    });

    const { startView, endView } = WPJSLibSPAHandlers();
    router.onBeforePageLoad = () => {
      startView();
    };
    router.onBeforeRouteChange = () => {
      endView();
    };
  },
} satisfies Theme
