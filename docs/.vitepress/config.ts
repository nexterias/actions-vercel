import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "actions-vercel",
	titleTemplate: ":title | actions-vercel",
	description: "Deploy to Vercel with GitHub Actions",
	lang: "ja_JP",
	sitemap: { hostname: "actions-vercel.nexterias.dev" },
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		search: {
			provider: "local",
		},
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
			{ icon: "github", link: "https://github.com/nexterias/actions-vercel" },
		],
		editLink: {
			pattern:
				"https://github.com/nexterias/actions-vercel/edit/main/docs/:path",
			text: "このページをGitHubで編集",
		},
		lastUpdated: {
			text: "最終更新日",
		},
		sidebar: {
			"/guide": [
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
			"/references": [
				{
					text: "リファレンス",
					items: [
						{
							text: "Inputs",
							collapsed: false,
							items: [
								{
									text: "Required",
									collapsed: false,
									base: "/references/inputs/required/",
									items: [
										{ text: "token", link: "token" },
										{ text: "project-id", link: "project-id" },
										{ text: "org-id", link: "org-id" },
									],
								},
								{
									text: "Optional",
									collapsed: false,
									base: "/references/inputs/optional/",
									items: [
										{ text: "build-env", link: "build-env" },
										{ text: "cwd", link: "cwd" },
										{ text: "domain-alias", link: "domain-alias" },
										{ text: "env", link: "env" },
										{
											text: "github-deployment-environment",
											link: "github-deployment-environment",
										},
										{ text: "github-token", link: "github-token" },
										{ text: "prebuilt", link: "prebuilt" },
										{ text: "production", link: "production" },
										{ text: "public", link: "public" },
									],
								},
							],
						},
						{
							text: "Outputs",
							base: "/references/outputs/",
							collapsed: false,
							items: [
								{ text: "deployment-url", link: "deployment-url" },
								{ text: "deployment-status", link: "deployment-status" },
							],
						},
					],
				},
			],
		},
	},
});
