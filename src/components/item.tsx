/*
 * @FilePath: /mini-class-tool/src/components/item.tsx
 * @author: Wibus
 * @Date: 2022-11-10 23:34:25
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-14 15:17:52
 * Coding With IU
 */

import message from "react-message-popup";
import { lessons } from "../constants/lessonsInfo";
import { isApp } from "../utils/env";
import { insert } from "../utils/insert";
import { lessonsTime } from "../utils/lesson";
import { readText, writeText } from '@tauri-apps/api/clipboard';
import { useSnapshot } from "valtio";
import { lessonsInfo } from "../states";

export const Item = (props: {
  index: number; // 第几节课
  name: string; // 课程名
  prefix: string; // 课程前缀
}) => {
  const lessonsInfoSnapshot = useSnapshot(lessonsInfo)
  const name = props.name as keyof typeof lessons;
  const lesson = lessonsInfoSnapshot.data[name];
  if (!lesson) return <div></div>;
  const dumpid = lesson.id?.replace(/-/g, "") || "0000000000";
  const startTime = insert(String(lessonsTime[props.index - 1].start), 2, ":");
  const endTime = insert(String(lessonsTime[props.index - 1].end), 2, ":");
  return (
    <div>
      <a
        href={`wemeet://page/inmeeting?meeting_code=${dumpid}`}
        onClick={async () => {
          message.info(lesson.password);
          isApp ? await writeText(lesson.password) : navigator.clipboard.writeText(lesson.password);
          message.info(`已复制「${name}」课堂密码`);
          message.info(await readText() || "复制失败");
        }} className="appItem" style={{
          cursor: "pointer",
        }}>
        <div style={{ position: "relative" }}>
          <h5>{props.prefix}课: {props.index} {name} &nbsp;&nbsp; {`${startTime} - ${endTime}`}</h5>
          <p>会议号：{lesson?.id || "null"}</p>
        </div>
      </a>
    </div>
  )
}