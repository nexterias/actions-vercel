export default {
  root: "docs",
  title: "actions-vercel",
  description: "Deploy to Vercel with GitHub Actions",
  lang: "ja",
  themeConfig: {
    search: true,
    nav: [
      { text: "ホーム", link: "/" },
      {
        text: "ガイド",
        link: "/guide/what-is-actions-vercel",
        activeMatch: "/guide/",
      },
      {
        text: "リファレンス",
        link: "/references/inputs/required/token",
        activeMatch: "/references/",
      },
    ],
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/nexterias/actions-vercel",
      },
    ],
    editLink: {
      docRepoBaseUrl: "https://github.com/nexterias/actions-vercel/tree/main/docs",
    },
    lastUpdated: true,
    sidebar: {
      "/guide/": [
        {
          text: "導入",
          items: [
            {
              text: "概要",
              link: "/guide/what-is-actions-vercel",
            },
            { text: "始める", link: "/guide/getting-started" },
            { text: "Monorepoを使用する", link: "/guide/monorepo" },
          ],
        },
      ],
      "/references/": [
        {
          text: "リファレンス",
          items: [
            {
              text: "Inputs",
              collapsible: true,
              collapsed: false,
              items: [
                {
                  text: "Required",
                  collapsible: true,
                  collapsed: false,
                  items: [
                    { text: "token", link: "/references/inputs/required/token" },
                    {
                      text: "project-id",
                      link: "/references/inputs/required/project-id",
                    },
                    { text: "org-id", link: "/references/inputs/required/org-id" },
                  ],
                },
                {
                  text: "Optional",
                  collapsible: true,
                  collapsed: false,
                  items: [
                    { text: "build-env", link: "/references/inputs/optional/build-env" },
                    { text: "cwd", link: "/references/inputs/optional/cwd" },
                    {
                      text: "domain-alias",
                      link: "/references/inputs/optional/domain-alias",
                    },
                    { text: "env", link: "/references/inputs/optional/env" },
                    {
                      text: "github-deployment-environment",
                      link: "/references/inputs/optional/github-deployment-environment",
                    },
                    {
                      text: "github-token",
                      link: "/references/inputs/optional/github-token",
                    },
                    { text: "prebuilt", link: "/references/inputs/optional/prebuilt" },
                    { text: "production", link: "/references/inputs/optional/production" },
                    { text: "public", link: "/references/inputs/optional/public" },
                  ],
                },
              ],
            },
            {
              text: "Outputs",
              collapsible: true,
              collapsed: false,
              items: [
                {
                  text: "deployment-url",
                  link: "/references/outputs/deployment-url",
                },
                {
                  text: "deployment-status",
                  link: "/references/outputs/deployment-status",
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
