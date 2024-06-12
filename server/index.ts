import express from "express";
import initMiddlewares from './src/utils/init/middlewares'
import initDb from './src/utils/init/db'
import initRoutes from './src/utils/init/routes'
import initErrorHandler from './src/utils/init/error-handler'

const app = express();

require('dotenv').config()
const port = process.env.PORT;
const dataBaseUrl = process.env.DATABASE_URL?.replace('<PASSWORD>', process.env.DATABASE_PASSWORD as string) as string


initMiddlewares(app);
initDb(dataBaseUrl)
initRoutes(app);
initErrorHandler(app);

const server = app.listen(port, () => {
    console.log(`Todo app listening on port ${port}`)
})

process.on('unhandledRejection', (_err: Error) => {
    server.close(() => {
        process.exit(1)
    })
})

process.on('uncaughtException', (_err: Error) => {
    server.close(() => {
        process.exit(1)
    })
})