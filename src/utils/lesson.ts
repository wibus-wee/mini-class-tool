import { useSnapshot } from "valtio";
import { FridayLessons, MondayLessons, ThursdayLessons, TuesdayLessons, WednesdayLessons } from "../constants/lessonsList";
import { getTime, transformTime } from "./time";
import { lessonsInfo as lessonsInfoProxy, lessonsList as lessonsListProxy } from '../states/index'

/**
 * 课程开始时间列表
 */
export const lessonsTime = [{
  index: 1,
  start: "0800",
  end: "0840"
}, {
  index: 2,
  start: "0850",
  end: "0930",
}, {
  index: 3,
  start: 1000,
  end: 1040,
}, {
  index: 4,
  start: 1050,
  end: 1130,
}, {
  index: 5,
  start: 1140,
  end: 1220,
}, {
  index: 6,
  start: 1220,
  end: 1425,
}, {
  index: 7,
  start: 1425,
  end: 1505,
}, {
  index: 8,
  start: 1515,
  end: 1555,
}, {
  index: 9,
  start: 1610,
  end: 1650,
}, {
  index: 10,
  start: 1700,
  end: 1740,
}]

/**
 * 当前时间对应的课程索引
 * @returns 当前时间对应的课程索引
 */
function getTodayLessonList(list: any) {
  
  const date = new Date();
  const day = date.getDay() as 1 | 2 | 3 | 4 | 5;
  const res = list.data[day];
  if (!res) return [];
  return res
}

/**
 * 如果当前没有课程，将会返回 null
 * @returns 当前时间对应的课程，以及预估接下来的课程
 */
export function generateLessons(list: any, number: number = 1) {
  const date = new Date();
  const day = date.getDay(); // 今天是周几
  // const Time = Number(getTime()) // 获取当前时间
  // console.log(Time, "当前时间")
  const Time = 805;
  const Today = getTodayLessonList(list) // 获取今天的课程列表
  console.log(Today, "今天的课程列表")
  const NowLessonIndex = lessonsTime.find(item => { // 查找当前时间对应的课程时间范围
    return Time >= Number(transformTime(Number(item.start), "subtract", 20)) && Time <= Number(transformTime(Number(item.end), "add", 20))
  })?.index

  if (!NowLessonIndex) return null // 如果当前没有课程，将会返回 null

  const Lessons = Object();
  for (let i = 0; i < number; i++) {
    Lessons[i] = Today[NowLessonIndex + i - 1]
  }

  const NowLesson = {
    name: Today[NowLessonIndex - 1],
    index: NowLessonIndex - 1,
  } // 获取当前课程
  const NextLesson = {
    name: Today[NowLessonIndex],
    index: NowLessonIndex,
  } // 获取下一节课
  const Next2Lesson = {
    name: Today[NowLessonIndex + 1],
    index: NowLessonIndex + 1,
  } // 获取下下节课
  const Next3Lesson = {
    name: Today[NowLessonIndex + 2],
    index: NowLessonIndex + 2,

  } // 获取下下下节课

  return {
    NowLesson,
    NextLesson,
    Next2Lesson,
    Next3Lesson
  }

} // 选择课程

export const generateLessonsList: (list: any, number?: number) => {
  [key: string]: {
    name: string,
    time?: {
      index: number;
      start: string | number;
      end: string | number;
    },
  }
} = (list:any, number: number = 1) => {
  const Lessons = generateLessons(list, number)
  if (!Lessons) return {}
  let res = Object();
  res.now = {
    name: Lessons?.NowLesson.name,
    time: lessonsTime[Lessons.NowLesson.index]
  }
  res.next = {
    name: Lessons?.NextLesson.name,
    time: lessonsTime[Lessons.NextLesson.index]
  }
  res.next2 = {
    name: Lessons?.Next2Lesson.name,
    time: lessonsTime[Lessons.Next2Lesson.index]
  }
  res.next3 = {
    name: Lessons?.Next3Lesson.name,
    time: lessonsTime[Lessons.Next3Lesson.index]
  }
  return res
}