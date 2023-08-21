import { Connection, createConnection } from "mysql2/promise";

const setConnection = async (): Promise<Connection> => {
  return await createConnection({
    host: process.env.DB_IP,
    user: process.env.DB,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: 3306
  })
}

export default async (query: string): Promise<any> => {
  const connection = await setConnection()
  const [data] = await connection.query(query)

  return !data ? [] : data
}