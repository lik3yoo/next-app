import db from "./index"
import { RowDataPacket } from "mysql2"

type R = Awaited<ReturnType<typeof db.query>>
export const loginSql = async <T extends RowDataPacket[]>(
  username: string,
  password: string
): Promise<[T, R[1]]> =>
  await db.query<T>(
    `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
  )
