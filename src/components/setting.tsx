/*
 * @FilePath: /mini-class-tool/src/components/setting.tsx
 * @author: Wibus
 * @Date: 2022-11-11 22:56:27
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-22 08:48:33
 * Coding With IU
 */

import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PropsWithRef, useEffect, useImperativeHandle, useState } from "react"
import { useSnapshot } from "valtio"
import { lessonsInfo, lessonsList } from "../states"
import { appDataDir } from '@tauri-apps/api/path';
import { isApp, isDev } from "../utils/env"
import AppStorage from "../utils/fs"
import message from "react-message-popup"

const appDataDirPath = isDev && isApp ? await appDataDir() : ''

const InfoSettingItem = (props: any) => {
  useEffect(() => {
    // 如果是没有的课程，就直接创建一个空对象
    if (!props.lessonsInfo[props.subject]) {
      lessonsInfo.data[props.subject] = {}
    }
  }, [props.lessonsInfo])
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

  const saveAction = async () => {
    await AppStorage.setItem('lessonsInfo', lessonsInfo.data)
    await AppStorage.setItem('lessonsList', lessonsList.data)
    message.success('保存成功')
  }

  // 从 lessonsList.data 里面，拿到全部的课程名字，然后去重形成一个数组
  const lessonsNameList = Array.from(new Set(Object.values(lessonsList.data).flat
    ())).filter(item => item !== '午休时间').filter(item => item !== '无')

  return (
    <div className={`settingsWrapper ${className}`}>
      <div className={`wrapper settings ${className}`}>
        <div className={"header"}>
          <h3 className={"title"}>
            数据设置
            <span>Tips: 点击关闭自动保存</span>
          </h3>
          <span className="svg" onClick={() => {
            isApp && saveAction()
            setClassname("hide")
          }}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        {
          isDev && isApp && (
            <>
              <div className="setting">
                <span>应用数据文件夹</span>
                <input name="appDataDir" id="appDataDir" value={appDataDirPath} disabled></input>
              </div>
            </>
          )
        }
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
            lessonsList={lessonsListSnapshot.data}
          />
          <ListSettingItem
            name="周二的课程"
            id="tuesday"
            index={2}
            lessonsList={lessonsListSnapshot.data}
          />
          <ListSettingItem
            name="周三的课程"
            id="wednesday"
            index={3}
            lessonsList={lessonsListSnapshot.data}
          />
          <ListSettingItem
            name="周四的课程"
            id="thursday"
            index={4}
            lessonsList={lessonsListSnapshot.data}
          />
          <ListSettingItem
            name="周五的课程"
            id="friday"
            index={5}
            lessonsList={lessonsListSnapshot.data}
          />
        </div>

        <div className="settingsList">
          <div className="setListId">
            {
              lessonsNameList.map((item, index) => {
                if (!item) return
                return (
                  <InfoSettingItem
                    key={index}
                    name={`${item} 教室`}
                    subject={item}
                    type="location"
                    lessonsInfo={lessonsInfoSnapshot.data}
                  />
                )
              })
            }
          </div>
          {/* <div className="setListPassword">
            {
              lessonsNameList.map((item, index) => {
                return (
                  <InfoSettingItem
                    key={index}
                    name={`${item} 密码`}
                    subject={item}
                    type="password"
                    lessonsInfo={lessonsInfoSnapshot.data}
                  />
                )
              })
            }
          </div> */}
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
          5. 🆕 目前课程是动态配置的，程序会读取你的每日课程配置来生成课程设置，所以请保证你的课程配置是正确的
        </span>
        <br />
        <span className="tips">
          6. 🆕 遇到无课的时间段，请填写午休时间或无，否则排序会出现错误
        </span>
      </div>
    </div>
  )
}