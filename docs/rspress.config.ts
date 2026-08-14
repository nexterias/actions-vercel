import { defineConfig } from "@rspress/core";

export default defineConfig({
  root: "content",
  title: "actions-vercel",
  description: "Deploy to Vercel with GitHub Actions",
  lang: "ja",
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
