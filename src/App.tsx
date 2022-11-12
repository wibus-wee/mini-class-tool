import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import message from 'react-message-popup'
import { Item } from './components/item'
import './main.css'
import { generateLessonsList } from './utils/lesson'
import { faGear, faGift } from '@fortawesome/free-solid-svg-icons'
import useStorage from './hooks/useStorage'
import { lessons as lessonsInfo } from './constants/lessonsInfo'
import { lessonsInfo as lessonsInfoProxy, lessonsList as lessonsListProxy } from './states/index'
import { FridayLessons, MondayLessons, ThursdayLessons, TuesdayLessons, WednesdayLessons } from './constants/lessonsList'
import { useSnapshot } from 'valtio'
import { Setting } from './components/setting'
import { window as tauriWindow } from "@tauri-apps/api";
import { Sponsor } from './components/sponsor'

function App() {

  useEffect(() => {
    window.addEventListener('error', (e) => {
      message.error(e.message)
    })
  }, [])

  const lessonsListSnapshot = useSnapshot(lessonsListProxy)
  const lessonsInfoSnapshot = useSnapshot(lessonsInfoProxy)

  const [lessons, setLessonsStorge] = useStorage("lessonsInfo", lessonsInfo)
  const [lessonsList, setLessonsListStorge] = useStorage("lessonsList", { 1: MondayLessons, 2: TuesdayLessons, 3: WednesdayLessons, 4: ThursdayLessons, 5: FridayLessons, })
  const [data, setData] = useState(generateLessonsList(lessonsListProxy))

  useEffect(() => {
    lessonsInfoProxy.data = lessons
    lessonsListProxy.data = lessonsList
  }, [lessons, lessonsList])

  useEffect(() => {
    setData(generateLessonsList(lessonsListProxy))
  }, [lessonsListSnapshot])

  useEffect(() => {
    const timer = setInterval(() => {
      setData(generateLessonsList(lessonsListProxy))
      message.info('Auto Update')
    }, 1000 * 60 * 1)
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
      // save the proxy data into localstorge
      setLessonsListStorge(lessonsListProxy.data)
      setLessonsStorge(lessonsInfoProxy.data)
    })
  }, [])


  const childRef = useRef<any>()
  const childSponsorRef = useRef<any>()

  return (
    <>
      <div data-tauri-drag-region className={"wrapper"}>
        <div className={"header"}>
          <h3 className={"title"}>
            课表小公举
            <span>每 1 分钟刷新 &nbsp;&nbsp;&nbsp; By Wibus.</span>
          </h3>
          <span data-label="Sponsor" className="label svg" onClick={() => {
            childSponsorRef.current?.open()
          }}>
            <FontAwesomeIcon icon={faGift} />
          </span>
          <span data-label="进入设置" className="label svg" onClick={() => {
            childRef.current?.open()
          }}>
            <FontAwesomeIcon icon={faGear} />
          </span>
        </div>

        {
          Object.keys(data).map((key, index) => {
            const PREFIX = index === 0 ? "现在的" : index === 1 ? "下一节" : index === 2 ? "下下节" : "下下下节"
            // console.log(data[key])
            return (
              <Item
                key={key}
                index={data[key].time?.index || 0}
                name={data[key].name}
                prefix={`${PREFIX}`}
              />
            )
          })
        }
      </div>

      <Setting
        cRef={childRef}
      />

      <Sponsor 
        cRef={childSponsorRef}
      />
    </>
  )
}

export default App
