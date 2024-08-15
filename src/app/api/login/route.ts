import { loginSql } from "@/db/user"
import { RowDataPacket } from "mysql2"

interface User extends RowDataPacket {
  id: number
  username: string
  password: string
}

export async function POST(req: Request) {
  const bodyText = await req.text()
  const body = JSON.parse(bodyText)
  const { password = "", username = "" } = body
  if (!password || !username) {
    return new Response(
      JSON.stringify({
        code: 400,
        msg: "参数错误",
      })
    )
  }
  try {
    const [rows] = await loginSql<User[]>(username, password)

    if (rows?.length) {
      return new Response(
        JSON.stringify({
          code: 200,
          msg: "登录成功",
        })
      )
    } else {
      return new Response(
        JSON.stringify({
          code: 400,
          msg: "用户名或密码错误",
        })
      )
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        code: 500,
        msg: "服务器错误",
        error: error,
      })
    )
  }
}
