# 開発ワークフロー

スクラム開発（バックログ管理）と TDD を組み合わせた開発プロセス。本プロジェクト自体もこのワークフローに従って開発する。

## ロール

| ロール | 責任 |
|---|---|
| **PO**（Product Owner） | バックログの優先順位付け・受け入れ確認 |
| **Dev**（Developer） | 実装・テスト |

---

## スプリントの流れ

```mermaid
sequenceDiagram
  actor PO
  actor Dev
  participant GitHub

  rect rgb(235, 245, 255)
    note over PO,GitHub: Sprint Planning
    PO->>GitHub: Epic Issue を起票（ラベル: epic）
    PO->>GitHub: Story Issue を起票（ラベル: user-story）
    PO->>GitHub: Milestone（Sprint N）に紐付け
  end

  rect rgb(235, 255, 235)
    note over Dev,GitHub: Story 開発（1 Story ごとに繰り返す）
    Dev->>GitHub: Issue を確認
    Dev->>Dev: feature/issue-N-xxx ブランチを切る
    Dev->>Dev: test [RED] コミット
    Dev->>Dev: feat [GREEN] コミット
    Dev->>Dev: refactor コミット
    Dev->>GitHub: PR 作成（Closes #N を記載）
    GitHub->>GitHub: CI（npm test）自動実行
    PO->>GitHub: CI 通過を確認・PR レビュー・承認
    Dev->>GitHub: main へ Merge commit → Issue 自動クローズ
  end
```

---

## ブランチとコミットの流れ

```mermaid
gitGraph
  commit id: "chore: scaffold"
  branch feature/issue-N-xxx
  commit id: "test: [RED] Story名"
  commit id: "feat: [GREEN] Story名"
  commit id: "refactor: 内容"
  checkout main
  merge feature/issue-N-xxx
```

---

## コミットプレフィックス

| プレフィックス | 意味 |
|---|---|
| `test: [RED] <説明>` | 失敗するテストを追加 |
| `feat: [GREEN] <説明>` | テストを通す最小実装 |
| `refactor: <説明>` | 振る舞いを変えずに整理 |
| `chore: <説明>` | ビルド・設定など非機能的な変更 |
| `docs: <説明>` | ドキュメント |

## ブランチ名規則

```
feature/issue-{Issue番号}-{短い説明}
例: feature/issue-2-draw-grid
```

## バックログ構造

```
Epic（ラベル: epic）
  └── User Story（ラベル: user-story, Milestone: Sprint N）
        └── タスク（Story Issue 内のチェックリスト）
```
