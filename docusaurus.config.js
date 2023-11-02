// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "JaverVip && ZhCN",
  tagline: "产品发布页 && 废话垃圾桶",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://www.javer.vip",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "biuaxia", // Usually your GitHub org/user name.
  projectName: "www", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hands",
    locales: ["zh-Hands"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/biuaxia/www/edit/v1/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/biuaxia/www/edit/v1/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Javer && ZhCN",
        logo: {
          alt: "Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            label: "全部软件",
            position: "left",
          },
          {
            href: "https://github.com/biuaxia",
            label: "biuaxia",
            position: "right",
          },
          {
            href: "https://github.com/javerVip",
            label: "javerVip",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "友链",
            items: [
              {
                label: "零玖博客",
                to: "https://meblogs.netlify.app/weblink.html",
              },
            ],
          },
          {
            title: "导航",
            items: [
              {
                label: "首页",
                to: "/",
              },
              {
                label: "文档",
                to: "/docs",
              },
              {
                label: "博客",
                to: "/blog",
              },
            ],
          },
          {
            title: "社交",
            items: [
              {
                label: "NodeSeek",
                href: "https://www.nodeseek.com/space/8467",
              },
              {
                label: "Hostloc",
                href: "https://hostloc.com/space-uid-50235.html",
              },
              {
                label: "Yaohuo",
                href: "https://yaohuo.me/bbs/userinfo.aspx?touserid=2172",
              },
              {
                label: "虎绿林",
                href: "https://hu60.cn/q.php/user.info.20052.html",
              },
              {
                label: "52Pojie",
                href: "https://www.52pojie.cn/home.php?mod=follow&uid=594459&do=view&from=space",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}, 本站使用 <a href="https://docusaurus.io/" target="_blank">docusaurus</a> 构建.<br/><a href="http://beian.miit.gov.cn/" target="_blank">蜀ICP备2022028764号</a>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"],
      },
    ],
  ],
};

export default config;
