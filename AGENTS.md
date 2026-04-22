# AGENTS.md for `nexterias/actions-vercel`

## Commands

```sh
# 型チェック
pnpm type-check

# lint & format
pnpm check
```

## 開発ルール

- ソースコードを変更した場合、`pnpm type-check && pnpm check`が必ず通過することを確認する
- `src/`配下のソースコードを変更した場合、`docs/`配下のドキュメントを更新する必要があるか確認し、ユーザーの指示を仰ぐこと

## コミットメッセージ

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)の規約に従う
- コミットメッセージは英語で記述すること

### テンプレート

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

使用できる`type`については、`./cliff.toml`を参照すること
