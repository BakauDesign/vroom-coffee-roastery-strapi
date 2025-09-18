import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { Message } from '@strapi/icons';
import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  register(app: StrapiApp) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });

    // app.widgets.register({
    //   icon: Message,
    //   title: {
    //     id: `${PLUGIN_ID}.widget.title`,
    //     defaultMessage: 'Kirim Pesan Whatsapp',
    //   },
    //   component: async () => {
    //     const component = await import('./pages/App');
    //     return component.App;
    //   },
    //   /**
    //    * Use this instead if you used a named export for your component
    //    */
    //   // component: async () => {
    //   //   const { Component } = await import('./components/MyWidget');
    //   //   return Component;
    //   // },
    //   id: 'kirim-pesan-whatsapp',
    //   pluginId: PLUGIN_ID,
    // });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
