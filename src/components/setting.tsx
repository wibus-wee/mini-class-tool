/*
 * @FilePath: /mini-class-tool/src/components/setting.tsx
 * @author: Wibus
 * @Date: 2022-11-11 22:56:27
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-11 23:19:13
 * Coding With IU
 */

import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PropsWithRef, useImperativeHandle, useState } from "react"


export const Setting: React.FC<PropsWithRef<any>> = (props) => {

  const [className, setClassname] = useState("hide")

  useImperativeHandle(props.cRef, () => ({
    open: () => {
      console.log('open')
      setClassname("show")
    },
    // close: () => {
    //   setClassname("hide")
    // }
  }))

  return (
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
    </div>
  )
}