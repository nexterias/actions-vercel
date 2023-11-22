import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "nexterias/actions-vercel",
	description: "Vercel deploy from GitHub Actions",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [{ text: "Home", link: "/" }],
		socialLinks: [
			{ icon: "github", link: "https://github.com/nexterias/actions-vercel" },
		],
	},
});
