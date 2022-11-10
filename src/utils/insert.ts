/*
 * @FilePath: /mini-class-tool/src/utils/insert.ts
 * @author: Wibus
 * @Date: 2022-11-10 23:47:49
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-10 23:49:03
 * Coding With IU
 */

export const insert = (any: string, position: number, insert: any) => {
  // 在position位置插入insert
  return any.slice(0, position) + insert + any.slice(position);
}