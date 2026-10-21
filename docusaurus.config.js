// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SQL Injection',
  tagline: 'Práctica guiada de seguridad web · Ethical Hacking',
  favicon: 'img/docusaurus.svg',

  // La URL final del sitio en GitHub Pages.
  url: 'https://sttards.github.io',
  baseUrl: '/manual-sqli/',

  // Datos de tu cuenta de GitHub (necesarios para publicar).
  organizationName: 'STTARDS', // tu usuario de GitHub
  projectName: 'manual-sqli', // el nombre del repositorio
  deploymentBranch: 'gh-pages',
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
          // Ahora la documentación vive en /docs y la portada es una página con diseño.
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
        },
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
        title: 'SQL Injection',
        logo: {
          alt: 'Logo de Docusaurus',
          src: 'img/docusaurus.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Práctica',
          },
          {
            href: 'https://github.com/STTARDS/manual-sqli',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Contenido',
            items: [
              {label: 'Introducción', to: '/docs/intro'},
              {label: 'El payload explicado', to: '/docs/payload-explicado'},
              {label: 'Práctica manual', to: '/docs/practica-manual'},
            ],
          },
          {
            title: 'Herramientas',
            items: [
              {label: 'Kali Linux', href: 'https://www.kali.org/'},
              {label: 'DVWA', href: 'https://github.com/digininja/DVWA'},
              {label: 'OWASP', href: 'https://owasp.org/'},
            ],
          },
          {
            title: 'Más',
            items: [
              {label: 'GitHub', href: 'https://github.com/STTARDS/manual-sqli'},
              {label: 'Docusaurus', href: 'https://docusaurus.io/'},
            ],
          },
        ],
        copyright:
          'Manual de SQL Injection · UMG, Sede Salamá · Built with Docusaurus 🦕',
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['sql', 'php', 'bash'],
      },
    }),
};

export default config;
