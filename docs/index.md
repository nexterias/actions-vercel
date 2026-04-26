---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: ホーム

hero:
  name: "Vercel Actions"
  text: "Deploy to Vercel with GitHub Actions"
  tagline: VercelのプロセスをGitHub Actionsに組み込み、高度なワークフローを構築しよう！
  actions:
    - theme: brand
      text: 概要
      link: /guide/what-is-actions-vercel
    - theme: alt
      text: 始める
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/nexterias/actions-vercel

features:
  - icon: 🛠️
    title: 高度なワークフローを構築
    details: デプロイ前のテスト実行はもちろん、デプロイ後にLighthouse CIによるスコア測定やSlack通知など、高度なワークフローをGitHub Actionsを用いて構築できます。
  - icon: 🌐
    title: Self-hosted Runnerでも利用可能
    details: Vercelが提供するGitHub Appは、Self-hosted Runnerでは利用できません。ですが、actions-vercelを利用すればSelf-hosted RunnerでもVercelへ簡単にデプロイできます！
  - icon: 🏗️
    title: VercelのGitHub連携機能をできるだけ再現
    details: コミットステータスの更新、プルリクエストへデプロイ状況を書き込むなど便利な部分をGitHub Actionsを用いても利用できるようにしてみました！
---
