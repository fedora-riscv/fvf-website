## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 如何更改信息

在 `src/lib/data.ts` 中修改网站列表、团队介绍、成员信息、合作伙伴（按行分层级）。

头像放在 `public/avatars`，合作伙伴 logo 放在 `public/partner-logo`。

首页动画的配色比例来自 `src/lib/stats.json`（页面不显示具体数字），运行 `npm run update-stats` 更新后提交即可。
