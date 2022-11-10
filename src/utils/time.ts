/*
 * @FilePath: /mini-class-tool/src/utils/time.ts
 * @author: Wibus
 * @Date: 2022-11-10 07:39:42
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-10 10:31:01
 * Coding With IU
 */

/**
 * 返回当前时间 如 1030
 * @returns xxxx
 */
export function getTime() {
  let date = new Date()
  let hour = String(date.getHours())
  let min = String(date.getMinutes())
  let sec = String(date.getSeconds())
  if (Number(hour) < 10) {
    hour = '0' + hour
  }
  if (Number(min) < 10) {
    min = '0' + min
  }
  if (Number(sec) < 10) {
    sec = '0' + sec
  }
  return hour + '' + min
}