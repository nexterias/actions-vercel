import { defineConfig } from "@rspress/core";

export default defineConfig({
  llms: true,
  root: "content",
  title: "actions-vercel",
  lang: "en",
  locales: [
    {
      lang: "en",
      label: "English",
      description:
        "Deploy Vercel projects from GitHub Actions with configurable builds, environment variables, and deployment cleanup.",
    },
    {
      lang: "ja",
      label: "日本語",
      description:
        "GitHub ActionsからVercelプロジェクトをデプロイする方法と、ビルド、環境変数、Deploymentの削除設定を説明します。",
    },
  ],
  route: {
    localeRedirect: "auto",
  },
  languageParity: {
    enabled: true,
  },
  markdown: {
    link: {
      checkDeadLinks: true,
      checkAnchors: true,
    },
  },
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/nexterias/actions-vercel",
      },
    ],
    editLink: {
      docRepoBaseUrl: "https://github.com/nexterias/actions-vercel/tree/main/docs/content",
    },
    lastUpdated: true,
  },
});
