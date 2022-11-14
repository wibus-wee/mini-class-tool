/*
 * @FilePath: /mini-class-tool/src/components/install.tsx
 * @author: Wibus
 * @Date: 2022-11-14 15:55:04
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-14 17:51:52
 * Coding With IU
 */

import { useState, useImperativeHandle, useEffect } from "react";
import { checkUpdate, installUpdate, UpdateManifest } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import message from "react-message-popup";

export const Install = (props: any) => {

  const [manifest, setManifest] = useState<UpdateManifest | null | undefined>(null)

  const [className, setClassname] = useState("hide")
  useImperativeHandle(props.cRef, () => ({
    open: () => {
      console.log('open')
      setClassname("show")
    },
  }))

  useEffect(() => {
    checkUpdate().then(({ shouldUpdate, manifest }) => {
      if (shouldUpdate) {
        setClassname("show")
        setManifest(manifest)
      }
    }).catch((err) => {
      console.warn(err, "检查更新错误")
    })
  }, [])




  useEffect(() => {
    const handleKeyDown = (e: any) => { if (e.keyCode === 27) setClassname("hide") }
    window.addEventListener('keydown', handleKeyDown)
    return () => { window.removeEventListener('keydown', handleKeyDown) }
  }, [])

  return (
    <div className={`settingsWrapper ${className}`}>
      <div className={`wrapper settings ${className}`}>
        <div className="install container">
          <div className="install__icon">
            <img src={"/mct.svg"} alt="" />
          </div>
          <div className="install__title">
            <h3>MCT v{manifest?.version} is Available</h3>
          </div>
          <div className="install__description">
            <span>There is a new version of Mini Class Tool available. Please click the button below to update.</span>
          </div>
          <div className="install__action">
            <button className="install__action__button" onClick={() => {
              setClassname("hide")
            }}>
              Cancel
            </button>
            <button className="install__action__button active" onClick={async () => {
              await installUpdate()
              await relaunch()
            }}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};