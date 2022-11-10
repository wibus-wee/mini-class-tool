/*
 * @FilePath: /mini-class-tool/src/components/item.tsx
 * @author: Wibus
 * @Date: 2022-11-10 23:34:25
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-10 23:50:05
 * Coding With IU
 */

import { insert } from "../utils/insert";
import { lessonsTime } from "../utils/lesson";

export const Item = (props: {
  index: number;
  name: string;
  id: string;
  password: string;
  prefix: string;
}) => {
  const dumpid = props.id.replace(/-/g, "");
  const startTime = insert(String(lessonsTime[props.index - 1].start), 2, ":");
  const endTime = insert(String(lessonsTime[props.index - 1].end), 2, ":");
  return (
    <div>
      <a
        href={`wemeet://page/inmeeting?meeting_code=${dumpid}`}
        onClick={() => {
          navigator.clipboard.writeText(props.password);
        }} className="appItem">
        <div style={{ position: "relative" }}>
          <h5>{props.prefix}课: {props.index} {props.name} &nbsp;&nbsp; {`${startTime} - ${endTime}`}</h5>
          <p>会议号：{props.id}</p>
        </div>
      </a>
    </div>
  )
}