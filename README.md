# Mini Class Tool 

上课助手 | 快速获取上课信息并生成课程表 | Quick get course information and generate course table


> [!NOTE]
> 事实上，三年之期过后，再也没有这种情况了，不过现在与之而来的是大学的课程，所以这个项目也就不再是一个中学生在网课阶段的上课助手了，而是一个大学生的上课助手了。
>
> 目前精力还不是很充沛来维护这个项目，所以这个项目的维护可能会比较慢，不过我会尽量保证这个项目的可用性。

<pre align="center">
✅ 此项目已重启维护状态
</pre>

## Features

- [x] 从 Ubesicht 迁移至 Web 端
- [x] 每日课程表读取
- [x] 自动更新预测列表
- [x] ~~自动获取对应的课堂会议号并自动打开会议~~
- [x] ~~自动获取课堂密码并自动复制进入剪贴板（✨新功能）~~
- [x] 自定义配置（✨新功能）
- [x] 原生夜间模式
- [x] 电脑端 Tauri App（✨新功能）
- [x] 自动读取课程列表生成各个课程配置项（✨新功能）

## Usage

- ~~前往在线版本：[https://mini-class-tool.iucky.cn/](https://mini-class-tool.iucky.cn/)~~
- 前往 Release 获取本地App 


## System Requirements

- macOS 10.15+ / Windows 7+（为了保证 7 能正常启动，Windows 的安装包将会增加 1～2MB 的大小以为 Windows 7 WebView2 提供支持）
- 10MB+ 硬盘空间
- 1GB+ 内存

> **Warning**
>
> ~~由于考虑到防止课堂爆破，会议号与密码都将需要自行填入，课程表目前填入的是我自己的课程表，可以自行修改~~ 此设计已被废弃，现在会自动读取课程列表生成各个课程配置项，请自行填入
> 
> 使用前，请先阅读设置页面的底部信息，防止乱填出现严重错误

若遇到任何报错提示，请务必联系我

## Workflow

<img width="994" alt="截屏2022-11-13 11 47 03" src="https://user-images.githubusercontent.com/62133302/201504642-9e18a845-b1ed-4da7-8253-ff603908b503.png">

创建 App 的时候，将会自动运行 `scripts/build-app.sh` 这个脚本文件将会删除 App 无需用到的两张图片，以及去除CSS相关变量，添加专属于 app 微调的样式。

在开发的时候，将会自动调取 周一 08:05 的列表，防止出现暂时的空数据问题


## Principle (Old)

实际上并不复杂，我们最需要考虑的就只是**课程的各种信息储存**，在 v1 版本中，我是直接硬编码的，非常滴粗暴：

```ts
const Monday = {
  1: ['数学','000-0000-000'],
  2: ['生物','000-0000-000'],
  3: ['语文','000-0000-000'],
  4: ['物理','000-0000-000'],
  5: ['英语','000-0000-000'],
  6: ['休息时间','000-0000-000'],
  7: ['信息技术','腾讯课堂'],
  8: ['体育','000-0000-000'],
  9: ['班会','000-0000-000'],
  10: ['团队','000-0000-000'],
  11: ['下课！','000-0000-000']
}
```



这样的问题非常多，就比如说：

- 要中间插入某个课程非常滴麻烦，要先把 key 全改了，再插入
- 这次的网课进入会议室带上了密码，要在这个每个数组再加一个，而且不止一个诶，至少要加5个 ~~（还有有些要改会议号码的）~~

那其实课程都是重复的，那为什么不能另外起一个对象保存课堂信息，之后再起一个变量存课程列表呢？

于是，就变成了这样：

```ts
/**
 * 课堂的ID和密码
 */
export const lessons = {
  '语文': {
    id: 'xxx-xxxx-xxx',
    password: 'xxxx',
  },
  // ...
}

export const MondayLessons = ['语文', '数学', '政治', '物理', '体育', '午休时间', '化学', '英语', '班会', '团队']
```

如果要调取某个课程的信息，我只需要 `lessons[keyof typeof lessons]` 即可拿到所有有关的信息了。

调取今日份的课程列表是挺简单的，用上 `getDay()` 再用 switch-case 之类的就可以拿到了

另外，还需要搞一个 课程的时间列表，只需要记录时间即可

```ts
/**
 * 课程开始时间列表
 */
export const lessonsTime = [{
  index: 1,
  start: "0800",
  end: "0840"
}, {
  // ...
},]
```

至于你问我为什么有个`index`...这个嘛...设计失误咯 ~~（纯粹是想在某个地方懒一下）~~

现在还有地方需要改进的是，这个预测列表的事情，我目前**查找当前时间对应的课程时间范围**是前后扩大了20分钟

```ts
const NowLessonIndex = lessonsTime.find(item => { // 查找当前时间对应的课程时间范围
  return Time >= Number(transformTime(Number(item.start), "subtract", 20)) && Time <= Number(transformTime(Number(item.end), "add", 20))
})?.index
```

但是这样的设计有点笨蛋，而且我也不确定是不是真的可以及时更新对应的课程节，这个地方未来还是需要继续改进

## Author

Mini Class Tool © Wibus, Released under AGPLv3. Created on Nov 11, 2022

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)
