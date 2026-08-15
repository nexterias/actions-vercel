import { defineConfig, type LlmsTxtRenderer } from "@rspress/core";

import i18n from "./i18n.json";

const i18nText: Record<string, Record<string, string>> = i18n;

const renderLlmsTxt: LlmsTxtRenderer = ({ title, description, lang, sections }) => {
  const summary = title ? `# ${title}${description ? `\n\n> ${description}` : ""}` : "";
  const lines = sections.flatMap((section) => {
    const translations =
      i18nText[section.title] ??
      Object.values(i18nText).find((text) => Object.values(text).includes(section.title));
    const sectionTitle = translations?.[lang] ?? section.title;

    return [
      `\n## ${sectionTitle}\n`,
      ...section.pages.map(
        (page) =>
          `- [${page.title}](${page.link})${page.description ? `: ${page.description}` : ""}`,
      ),
    ];
  });

  if (summary) {
    return lines.length > 0 ? `${summary}\n${lines.join("\n")}` : summary;
  }
  return lines.join("\n").trimStart();
};

export default defineConfig({
  llms: {
    llmsTxt: renderLlmsTxt,
  },
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
