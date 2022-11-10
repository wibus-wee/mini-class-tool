import { getTime } from "./time";

/**
 * 课程开始时间列表
 */
export const lessonsTime = [{
  start: 800,
  end: 840
}, {
  start: 850,
  end: 930,
}, {
  start: 1000,
  end: 1040,
}, {
  start: 1050,
  end: 1130,
}, {
  start: 1140,
  end: 1220,
}, {
  start: 1220,
  end: 1425,
}, {
  start: 1425,
  end: 1505,
}, {
  start: 1515,
  end: 1555,
}, {
  start: 1610,
  end: 1650,
}, {
  start: 1700,
  end: 1740,
}]

export function chooseLesson(a) {
  const Time = getTime()

} // 选择课程