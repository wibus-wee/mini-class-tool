# Mini Class Tool
网课助手 | 快速获取网课信息并生成课程表 | Quick get course information and generate course table

## Features

- [x] 每日课程表读取
- [x] 自动更新预测列表
- [x] 自动获取对应的课堂会议号并自动打开会议
- [x] 自动获取课堂密码并自动复制进入剪贴板（✨新功能）
- [x] 自定义配置
- [x] 原生夜间模式
- [ ] 电脑端 Tauri App

## Usage

- 前往在线版本：[https://miniclass.vercel.app/](https://miniclass.vercel.app/)
- 前往 Release 获取本地App

## Principle

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

## Author

Mini Class Tool © Wibus, Released under AGPLv3. Created on Nov 11, 2022

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)
