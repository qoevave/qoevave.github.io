// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'QoEVAVE Project',
  tagline: 'VR Realization • Quality of Experience • Auditory Cognition',
  favicon: 'img/Q-logo_favicon.ico',

  // Set the production url of your site here
  url: 'https://qoevave.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'qoevave', // Usually your GitHub org/user name.
  projectName: 'qoevave.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/Q-logo.png',
      navbar: {
        title: 'QoEVAVE Project',
        logo: {
          alt: 'My Site Logo',
          src: 'img/Q-logo.png',
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Project',
            items: [
              {
                label: 'Audictive Priority Program',
                href: 'http://www.spp2236-audictive.de/Abstracts/Abstract-11.html',
              },
              {
                label: 'Funding',
                href: 'https://www.dfg.de/en/funded_projects/current_projects_programmes/list/projectdetails/index.jsp?id=422686707&sort=nr_asc&prg=SPP&wb=4',
              },
            ],
          },
          {
            title: 'Partners',
            items: [
              {
                label: 'International Audio Laboratories Erlangen',
                href: 'https://www.audiolabs-erlangen.de/fau',
              },
              {
                label: 'Audiovisual Technology Group TU-Ilmenau',
                href: 'https://www.tu-ilmenau.de/en/university/departments/department-of-electrical-engineering-and-information-technology/profile/institutes-and-groups/audiovisual-technology-group',
              },
            ],
          }
        ],
        logo: {
          alt: 'DFG',
          src: 'img/dfg_logo_schriftzug_weiss.png',
          href: 'https://www.dfg.de/en/funded_projects/current_projects_programmes/list/projectdetails/index.jsp?id=422686707&sort=nr_asc&prg=SPP&wb=4',
          width: 200,
          height: 30,
        },
        copyright: `Copyright © ${new Date().getFullYear()} QoEVAVE`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
