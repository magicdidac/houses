import { Connection, createConnection } from "mysql2/promise";

const setConnection = async (): Promise<Connection> => {
  console.log(
    process.env.DB_IP,
    process.env.DB,
    process.env.DB_PASSWORD
  )
  return await createConnection({
    host: process.env.DB_IP,
    user: process.env.DB,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: 3306
  })
}

export const callDB = async (query: string): Promise<any> => {
  const connection = await setConnection()
  const [data] = await connection.query(query)

  return !data ? [] : data
}