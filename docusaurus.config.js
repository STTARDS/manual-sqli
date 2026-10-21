// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Manual: SQL Injection',
  tagline: 'Práctica guiada de Ethical Hacking — UMG Salamá',

  // La URL final del sitio en GitHub Pages.
  url: 'https://sttards.github.io',
  baseUrl: '/manual-sqli/',

  // Datos de tu cuenta de GitHub (necesarios para publicar).
  organizationName: 'STTARDS', // tu usuario de GitHub
  projectName: 'manual-sqli', // el nombre del repositorio
  deploymentBranch: 'gh-pages', // rama donde se publica el sitio
  trailingSlash: false,

  onBrokenLinks: 'warn',

  // El sitio está en español.
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // Hace que la documentación sea la página principal del sitio.
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        // Sin blog: es un manual, no un blog.
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Manual SQL Injection',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Práctica',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright:
          'Manual de SQL Injection — Bresler Avizaí Morales Gamez · UMG, Sede Salamá',
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['sql', 'php', 'bash'],
      },
    }),
};

export default config;
