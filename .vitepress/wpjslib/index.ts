export function WPJSLibScripts() {
  if (process.env.NODE_ENV !== 'production') return [];
  return [
    [
      'script',
      {
        async: true,
        crossorigin: true,
        defer: true,
        id: 'wpjslib6',
        src: 'https://std.wpcdn.pl/wpjslib6/wpjslib-stat.js',
      },
    ],
    [
      'script',
      {},
      `
        const platform = window.innerWidth < 768 && 'ontouchstart' in window ? 'mobile' : 'desktop';
        var WP = [];
        var wp_onepager = true;
        var wp_cookie_info = false;
        var wp_leap = false;
        var wp_spa_config = {
            platform: platform,
            payload: {
              dot: {        
                ctype: 'documentation',
              },
           },
           [platform]: {
              dot: {
                base: "ceeid",
                type: "click",
              }
           }
        };
      `,
    ],
  ];
}

export function WPJSLibSPAHandlers() {
  return {
    startView: () => {
      if (typeof window === 'undefined') return;
      window.WP?.spa?.viewPage({
        dot: {
          ctype: 'documentation',
        }
      });
    },
    endView: () => {
      if (typeof window === 'undefined') return;
      window.WP?.spa?.closePage();
    },
  };
}
