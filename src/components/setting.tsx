/*
 * @FilePath: /mini-class-tool/src/components/setting.tsx
 * @author: Wibus
 * @Date: 2022-11-11 22:56:27
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-12 17:45:57
 * Coding With IU
 */

import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PropsWithRef, useEffect, useImperativeHandle, useState } from "react"
import { useSnapshot } from "valtio"
import { lessonsInfo, lessonsList } from "../states"

const InfoSettingItem = (props: any) => {
  return (
    <div className="setting">
      <span>{props.name}</span>
      <input name={props.subject} id={props.subject} defaultValue={
        props.lessonsInfo[props.subject] ? props.lessonsInfo[props.subject][props.type] : ""
      } onChange={
        (e) => {
          const value = e.target.value
          const subject = props.subject
          lessonsInfo.data[subject] ? lessonsInfo.data[subject][props.type] = value : lessonsInfo.data[subject] = { [props.type]: value }
        }
      }></input>
    </div>
  )
}

const ListSettingItem = (props: any) => {

  return (
    <div className="setting">
      <span>{props.name}</span>
      <input name={props.id} id={props.id} defaultValue={
        props.lessonsList[props.index].map((item: any) => { return item }).join('，')
      } onChange={
        (e) => {
          const value = e.target.value
          const index = props.index
          lessonsList.data[index] = value.split('，')
        }
      }></input>
    </div>
  )
}

export const Setting: React.FC<PropsWithRef<any>> = (props) => {

  const lessonsListSnapshot = useSnapshot(lessonsList)
  const lessonsInfoSnapshot = useSnapshot(lessonsInfo)

  const [className, setClassname] = useState("hide")

  useImperativeHandle(props.cRef, () => ({
    open: () => {
      console.log('open')
      setClassname("show")
    },
  }))

  useEffect(() => {
    const handleKeyDown = (e: any) => { if (e.keyCode === 27) setClassname("hide") }
    window.addEventListener('keydown', handleKeyDown)
    return () => { window.removeEventListener('keydown', handleKeyDown) }
  }, [])

  const [lessons, setLessons] = useState<any>(lessonsInfoSnapshot.data)
  const [_lessonsList, _setLessonsList] = useState<any>(lessonsListSnapshot.data)

  useEffect(() => {
    setLessons(lessonsInfoSnapshot.data)
    _setLessonsList(lessonsListSnapshot.data)
  }, [lessonsListSnapshot, lessonsInfoSnapshot])

  const saveData = () => {

  }

  const lessonsNameList = ['语文', '数学', '英语', '物理', '化学', '政治', '历史', '地理', '生物', '班主任']

  return (
    <div className={`settingsWrapper ${className}`}>
      <div className={`wrapper settings ${className}`}>
        <div className={"header"}>
          <h3 className={"title"}>
            数据设置
            <span>Tips: 点击关闭自动保存</span>
          </h3>
          <span className="svg" onClick={() => {
            setClassname("hide")
          }}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        <div className="setting">
          <span>课程列表 JSON</span>
          <textarea disabled name="lessonsList" id="lessonsList" value={JSON.stringify(lessonsListSnapshot.data, null, 2)}>
          </textarea>
        </div>
        <div className="setting">
          <span>课程信息 JSON</span>
          <textarea disabled name="lessonsList" id="lessonsList" value={JSON.stringify(lessonsInfoSnapshot.data, null, 2)}>
          </textarea>
        </div>

        <div className="setList" style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <ListSettingItem
            name="周一的课程"
            id="monday"
            index={1}
            lessonsList={_lessonsList}
          />
          <ListSettingItem
            name="周二的课程"
            id="tuesday"
            index={2}
            lessonsList={_lessonsList}
          />
          <ListSettingItem
            name="周三的课程"
            id="wednesday"
            index={3}
            lessonsList={_lessonsList}
          />
          <ListSettingItem
            name="周四的课程"
            id="thursday"
            index={4}
            lessonsList={_lessonsList}
          />
          <ListSettingItem
            name="周五的课程"
            id="friday"
            index={5}
            lessonsList={_lessonsList}
          />
        </div>

        <div className="settingsList">
          <div className="setListId">
            {
              lessonsNameList.map((item, index) => {
                return (
                  <InfoSettingItem
                    key={index}
                    name={`${item} ID`}
                    subject={item}
                    type="id"
                    lessonsInfo={lessons}
                  />
                )
              })
            }
          </div>
          <div className="setListPassword">
            {
              lessonsNameList.map((item, index) => {
                return (
                  <InfoSettingItem
                    key={index}
                    name={`${item} 密码`}
                    subject={item}
                    type="password"
                    lessonsInfo={lessons}
                  />
                )
              })
            }
          </div>
        </div>

        <br />
        {/* <hr /> */}
        <br />
        <span className="tips" style={{
          paddingTop: "10px",
        }}>1. 根据具体情况，将对应信息填入上方，请一定要注意保证全部输入，否则一旦出错只能重置「小公举」</span>
        <br />
        <span className="tips">2. 所有的课程信息请使用中文逗号“，”进行分割，请勿使用其他任何字符，程序没有做防错处理</span>
        <br />
        <span className="tips">
          3. 暂时还无法修改上课与下课时间，等以后有时间再加
        </span>
        <br />
        <span className="tips">
          4. 最上方的 JSON 是不可改的，如果你想修改其中的信息，请在下方的 选项 中修改
        </span>
        <br />
        <span className="tips">
          5. 由于一些比较奇怪的原因，请把「午休时间」也加入到课程列表中，名字无所谓，有这个占位符就好了
        </span>
      </div>
    </div>
  )
}