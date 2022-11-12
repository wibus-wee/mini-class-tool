/*
 * @FilePath: /mini-class-tool/src/components/sponsor.tsx
 * @author: Wibus
 * @Date: 2022-11-12 22:56:50
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-12 23:00:30
 * Coding With IU
 */

import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useImperativeHandle, useState } from "react"

export const Sponsor = (props: any) => {

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

  return (
    <div className={`settingsWrapper ${className}`}>
      <div className={`wrapper settings ${className}`}>
        <div className={"header"}>
          <h3 className={"title"}>
            Sponsor | 赞助者

          </h3>
          <span className="svg" onClick={() => {
            setClassname("hide")
          }}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>

        <span className="tips">
            1. 非常感谢 「LEO💫 {"<maxleotse>"}」 的赞助，这是我第一次在实际应用层项目中接触到赞助 😭
        </span>
        <br />

      </div>
    </div>
  )
}