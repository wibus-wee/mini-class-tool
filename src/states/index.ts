/*
 * @FilePath: /mini-class-tool/src/states/index.ts
 * @author: Wibus
 * @Date: 2022-11-11 16:13:05
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-12 16:57:18
 * Coding With IU
 */

import { proxy } from "valtio";

export const lessonsList = proxy({
  data: { 1: [], 2: [], 3: [], 4: [], 5: [] } as any
});
export const lessonsInfo = proxy({
  data: {} as any
})