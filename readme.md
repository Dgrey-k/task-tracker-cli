# task-tracker-cli

一个简单的命令行任务管理工具，使用 Node.js 编写。

## 功能

- 添加任务
- 更新任务内容
- 删除任务
- 标记任务为完成或进行中
- 按状态筛选任务列表

## 使用方法

在命令行中运行：

```bash
node index.js add "任务内容"           # 添加任务
node index.js update <编号> "新内容"   # 更新任务内容
node index.js delete <编号>           # 删除任务
node index.js done <编号>             # 标记任务为完成
node index.js progress <编号>         # 标记任务为进行中
node index.js list                    # 列出所有任务
node index.js list done               # 列出已完成任务
node index.js list not-done           # 列出未完成任务
node index.js list progress           # 列出进行中任务
```

## 说明

- 所有任务数据保存在 `tasks.json` 文件中。
- 需要安