import { useState } from 'react'
import './main.css'

function App() {

  return (
    <div className={"wrapper"}>
      <div className={"header"}>
        <h3 className={"title"}>
          课表小公举
          <span>每 20 分钟刷新 &nbsp;&nbsp;&nbsp; By Wibus.</span>
        </h3>
      </div>
      <div>
        <a onClick={() => { }} className="appItem">
          <div style={{ position: "relative" }}>
            <h5>现在的课：4 语文 10:50-11:30</h5>
            <p>会议号：767-3951-1565</p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default App
