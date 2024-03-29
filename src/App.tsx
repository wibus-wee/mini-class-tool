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
import { Sponsor } from './components/sponsor'
import AppStorage from './utils/fs'
import { isApp } from './utils/env'
import { Install } from './components/install'

function App() {

  useEffect(() => {
    window.addEventListener('error', (e) => {
      message.error(e.message)
    })
  }, [])

  const lessonsListSnapshot = useSnapshot(lessonsListProxy)
  const lessonsInfoSnapshot = useSnapshot(lessonsInfoProxy)

  if (!isApp) {
    const [lessons, setLessonsStorge] = useStorage("lessonsInfo", lessonsInfo)
    const [lessonsList, setLessonsListStorge] = useStorage("lessonsList", { 1: MondayLessons, 2: TuesdayLessons, 3: WednesdayLessons, 4: ThursdayLessons, 5: FridayLessons, })

    useEffect(() => {
      async () => {
        lessonsInfoProxy.data = lessons
        lessonsListProxy.data = lessonsList
      }
    }, [lessons, lessonsList])

    useEffect(() => {
      window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        e.returnValue = '';
        // save the proxy data into localstorge
        setLessonsStorge(lessonsInfoProxy.data)
        setLessonsListStorge(lessonsListProxy.data)
      })
    }, [])
  } else {
    useEffect(() => {
      AppStorage.init()
    }, [])
    useEffect(() => {
      const sync = async () => {
        lessonsInfoProxy.data = await AppStorage.getItem("lessonsInfo", lessonsInfo)
        lessonsListProxy.data = await AppStorage.getItem("lessonsList", { 1: MondayLessons, 2: TuesdayLessons, 3: WednesdayLessons, 4: ThursdayLessons, 5: FridayLessons, })
      }
      sync()
        .catch(e => {
          console.error(e)
        })
    }, [])
  }

  const [data, setData] = useState(generateLessonsList(lessonsListProxy))

  useEffect(() => {
    setData(generateLessonsList(lessonsListProxy))
  }, [lessonsListSnapshot])

  useEffect(() => {
    const timer = setInterval(() => {
      setData(generateLessonsList(lessonsListProxy))
      // message.info('Auto Update')
    }, 1000 * 60 * 1)
    return () => {
      clearInterval(timer)
    }
  }, [])


  const childRef = useRef<any>()
  const childSponsorRef = useRef<any>()

  return (
    <>
      <style>
        {`
          body {
            ${process.env.NODE_ENV === 'development' ? '' : 'background: var(--root-background);'}
          }
          ${isApp ? `
            .wrapper {
              margin-left: 0;
              margin-right: 0;
              margin-top: 0;
            }
            .header {
              margin-top: 25px;
            }
            ` : ''
          }
        `}
      </style>
      <div data-tauri-drag-region className={`wrapper ${process.env.NODE_ENV === 'development' ? 'dev' : ''
        }`}>
        <div className={"header"}>
          <h3 className={"title"}>
            <a
              className='label'
              data-label="前往本班"
              href={`wemeet://page/inmeeting?meeting_code=${lessonsInfoSnapshot.data["班主任"]?.id?.replace(/-/g, "") || "0000000000"
                }`}
              onClick={() => {
                navigator.clipboard.writeText(lessonsInfoSnapshot.data["班主任"]?.password);
                // message.info(`已复制「本班」课堂密码`);
              }}
            >课表小公举</a>
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

      {
        isApp && <Install />
      }
    </>
  )
}

export default App
