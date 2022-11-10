/*
 * @FilePath: /mini-class-tool/src/components/item.tsx
 * @author: Wibus
 * @Date: 2022-11-10 23:34:25
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-11 00:17:16
 * Coding With IU
 */

import { lessons } from "../constants/lessonsInfo";
import { insert } from "../utils/insert";
import { lessonsTime } from "../utils/lesson";

export const Item = (props: {
  index: number; // 第几节课
  name: string; // 课程名
  prefix: string; // 课程前缀
}) => {
  const name = props.name as keyof typeof lessons;
  const lesson = lessons[name];
  if (!lesson) return <div></div>;
  const dumpid = lesson.id?.replace(/-/g, "") || "0000000000";
  const startTime = insert(String(lessonsTime[props.index - 1].start), 2, ":");
  const endTime = insert(String(lessonsTime[props.index - 1].end), 2, ":");
  return (
    <div>
      <a
        href={`wemeet://page/inmeeting?meeting_code=${dumpid}`}
        onClick={() => {
          navigator.clipboard.writeText(lesson.password);
        }} className="appItem">
        <div style={{ position: "relative" }}>
          <h5>{props.prefix}课: {props.index} {name} &nbsp;&nbsp; {`${startTime} - ${endTime}`}</h5>
          <p>会议号：{lesson?.id || "null"}</p>
        </div>
      </a>
    </div>
  )
}