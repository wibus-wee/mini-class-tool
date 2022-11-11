/*
 * @FilePath: /mini-class-tool/src/utils/time.ts
 * @author: Wibus
 * @Date: 2022-11-10 07:39:42
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-11 09:37:28
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

/**
 * 转换时间，将 0899 的情况转换为符合60min的 0859 或 0933
 * @param time 时间数字
 * @param direction 处理方向
 * @param changeValue 要加入或减少的时间
 */
export function transformTime(time: number, direction: "add" | "subtract" = "add", changeValue: number) {
  let hour = String(Math.floor(time / 100))
  let min = String(time % 100)
  if (direction === "add") {
    min = String(Number(min) + changeValue) // 加上 10min
    if (Number(min) >= 60) {
      hour = String(Number(hour) + 1)
      min = String(Number(min) - 60)
    }
  } else {
    min = String(Number(min) - changeValue) // 减去 10min
    if (Number(min) < 0) {
      hour = String(Number(hour) - 1)
      min = String(Number(min) + 60)
    }
  }
  if (Number(hour) < 10) {
    hour = '0' + hour
  }
  if (Number(min) < 10) {
    min = '0' + min
  }
  return hour + '' + min
}