const fs = require("fs"); // 引入文件系统模块
const path = require("path"); // 引入路径模块

// 定义任务数据文件的路径
const DATA_FILE = path.join(__dirname, "tasks.json");

// 加载任务列表，如果文件不存在则创建一个空数组
function loadTasks() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf8"); // 初始化空任务列表
  }
  const raw = fs.readFileSync(DATA_FILE, "utf8"); // 读取文件内容
  return JSON.parse(raw); // 解析为对象数组
}

// 保存任务列表到文件
function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), "utf8"); // 格式化保存
}

// 打印任务列表到控制台
function printTasks(tasks) {
  if (tasks.length === 0) {
    console.log("无任务。");
    return;
  }
  tasks.forEach((t, i) => {
    console.log(
      `${i + 1}. [${t.status}] ${t.content}` // 显示编号、状态和内容
    );
  });
}

// 主函数，解析命令行参数并执行对应操作
function main() {
  const args = process.argv.slice(2); // 获取命令行参数
  const command = args[0]; // 命令类型

  let tasks = loadTasks(); // 加载任务列表

  switch (command) {
    case "add": {
      // 添加任务
      const content = args.slice(1).join(" ");
      if (!content) return console.log("请输入任务内容。");
      tasks.push({ content, status: "not-done" }); // 新任务默认未完成
      saveTasks(tasks);
      console.log("✅ 添加成功。");
      break;
    }
    case "update": {
      // 更新任务内容
      const index = parseInt(args[1]) - 1;
      const newContent = args.slice(2).join(" ");
      if (isNaN(index) || !tasks[index]) return console.log("无效任务编号。");
      tasks[index].content = newContent;
      saveTasks(tasks);
      console.log("✏️ 更新成功。");
      break;
    }
    case "delete": {
      // 删除任务
      const index = parseInt(args[1]) - 1;
      if (isNaN(index) || !tasks[index]) return console.log("无效任务编号。");
      tasks.splice(index, 1);
      saveTasks(tasks);
      console.log("🗑 删除成功。");
      break;
    }
    case "done": {
      // 标记任务为完成
      const index = parseInt(args[1]) - 1;
      if (isNaN(index) || !tasks[index]) return console.log("无效任务编号。");
      tasks[index].status = "done";
      saveTasks(tasks);
      console.log("✅ 已标记为完成。");
      break;
    }
    case "progress": {
      // 标记任务为进行中
      const index = parseInt(args[1]) - 1;
      if (isNaN(index) || !tasks[index]) return console.log("无效任务编号。");
      tasks[index].status = "in-progress";
      saveTasks(tasks);
      console.log("🔄 已标记为进行中。");
      break;
    }
    case "list": {
      // 列出任务，可按状态筛选
      const filter = args[1];
      let filteredTasks = tasks;

      if (filter === "done") {
        filteredTasks = tasks.filter((t) => t.status === "done");
      } else if (filter === "not-done") {
        filteredTasks = tasks.filter((t) => t.status === "not-done");
      } else if (filter === "progress") {
        filteredTasks = tasks.filter((t) => t.status === "in-progress");
      }

      printTasks(filteredTasks);
      break;
    }
    default:
      // 未知命令，输出帮助信息
      console.log(`用法：
  node index.js add "任务内容"
  node index.js update <编号> "新内容"
  node index.js delete <编号>
  node index.js done <编号>
  node index.js progress <编号>
  node index.js list
  node index.js list done
  node index.js list not-done
  node index.js list progress
`);
  }
}

main(); // 执行主函

