import { useState } from 'react'
import { Item } from './components/item'
import './main.css'
import { generateLessonsList } from './utils/lesson'

function App() {

  const [data, setData] = useState(generateLessonsList())
  console.log(data)

  return (
    <div className={"wrapper"}>
      <div className={"header"}>
        <h3 className={"title"}>
          课表小公举
          <span>每 20 分钟刷新 &nbsp;&nbsp;&nbsp; By Wibus.</span>
        </h3>
      </div>

      {
        Object.keys(data).map((key, index) => {
          const PREFIX = index === 0 ? "现在的" : index === 1 ? "下一节" : index === 2 ? "下下节" : "下下下节"
          console.log(data[key])
          return (
            <Item
              index={data[key].time.index}
              name={data[key].name}
              prefix={`${PREFIX}`}
            />
          )
        })
      }

    </div>
  )
}

export default App
