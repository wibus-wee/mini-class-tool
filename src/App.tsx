import { useState } from 'react'
import { Item } from './components/item'
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
      <Item 
        index={1}
        name={"计算机网络"}
        id={"123456789"}
        password={"123456"}
        prefix={"可能的"}
      />
    </div>
  )
}

export default App
