import { message } from "antd"
interface Props {
  url: string
  data?: any
  method?: "GET" | "POST"
}
const ajax = ({ url, data, method = "GET" }: Props) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        const { code, msg = "" } = data
        if (code !== 200) {
          message.error(msg ? msg : "发生错误")
        } else {
          resolve(data)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default ajax
